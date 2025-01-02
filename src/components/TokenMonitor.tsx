import React, { useState, useEffect } from 'react';
import { 
  FaTwitter, 
  FaTelegram, 
  FaGlobe, 
  FaCopy, 
  FaCheck, 
  FaRobot, 
  FaShieldAlt,
  FaBolt 
} from 'react-icons/fa';

interface TokenMetadata {
  description?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  image?: string;
}

interface TokenData {
  name: string;
  symbol: string;
  mint: string;
  uri?: string;
  initialBuy?: string;
  traderPublicKey?: string;
  metadata?: TokenMetadata;
  timestamp: number;
}

const TokenCard: React.FC<{ token: TokenData }> = ({ token }) => {
  const [copied, setCopied] = useState(false);
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (token.uri) {
        try {
          let url = token.uri;
          if (url.startsWith('ipfs://')) {
            url = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
          }
          
          const response = await fetch(url);
          const data = await response.json();
          setMetadata(data);
        } catch (error) {
          console.error('Error fetching metadata:', error);
        }
      }
    };

    fetchMetadata();
  }, [token]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        {metadata?.image ? (
          <img
            src={metadata.image.startsWith('ipfs://') 
              ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
              : metadata.image}
            alt={token.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-100"
            onError={() => {
              setMetadata(prev => prev ? { ...prev, image: undefined } : null);
            }}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500">
            {token.symbol.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{token.name}</h2>
          <p className="text-gray-500">{token.symbol}</p>
        </div>
      </div>

      {metadata?.description && (
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{metadata.description}</p>
      )}

      <div className="flex gap-4 mb-4">
        {metadata?.twitter && (
          <a 
            href={metadata.twitter} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-600"
          >
            <FaTwitter size={20} />
          </a>
        )}
        {metadata?.telegram && (
          <a 
            href={metadata.telegram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-600"
          >
            <FaTelegram size={20} />
          </a>
        )}
        {metadata?.website && (
          <a 
            href={metadata.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-600"
          >
            <FaGlobe size={20} />
          </a>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <div className="flex items-center gap-2 mb-2">
          <span className="truncate flex-1">Mint: {token.mint}</span>
          <button
            onClick={() => copyToClipboard(token.mint)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Copy contract address"
          >
            {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
          </button>
        </div>
        <p>Created: {new Date(token.timestamp).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

const TokenMonitor: React.FC = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [queuedTokens, setQueuedTokens] = useState<TokenData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && queuedTokens.length > 0) {
      setTokens(prev => [...queuedTokens, ...prev].slice(0, 50));
      setQueuedTokens([]);
    }
  }, [isPaused, queuedTokens]);

  useEffect(() => {
    const ws = new WebSocket('wss://pumpportal.fun/api/data');

    const handleWebSocketMessage = async (event: WebSocketEventMap['message']) => {
      try {
        const data = JSON.parse(event.data as string);
        if (data.signature) {
          const newToken: TokenData = {
            name: data.name || 'Unknown',
            symbol: data.symbol || 'N/A',
            mint: data.mint,
            uri: data.uri,
            initialBuy: data.initialBuy,
            traderPublicKey: data.traderPublicKey,
            timestamp: Date.now()
          };

          if (isPaused) {
            setQueuedTokens(prev => [newToken, ...prev]);
          } else {
            setTokens(prev => [newToken, ...prev].slice(0, 50));
          }
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({ method: 'subscribeNewToken' }));
    };

    ws.onmessage = handleWebSocketMessage;

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setTimeout(() => {
        console.log('Attempting to reconnect...');
      }, 5000);
    };

    return () => {
      ws.close();
    };
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaBolt size={24} className="text-black" />
            <h1 className="text-3xl font-bold text-black">Bolt Token Monitor</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            {isPaused && <div className="text-blue-600 text-sm font-medium">Paused</div>}
          </div>
        </div>
  
        {/* Main content with grid layout */}
        <div className="flex gap-8">
          {/* Tokens grid - takes 70% of the space */}
          <div className="w-8/12">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {tokens.map((token, index) => (
                <TokenCard key={`${token.mint}-${index}`} token={token} />
              ))}
            </div>
  
            {tokens.length === 0 && (
              <div className="text-center text-gray-400 mt-12">
                Waiting for new tokens...
              </div>
            )}
          </div>
  
          {/* Upcoming Features - fixed on right side taking 30% of the space */}
          <div className="w-4/12">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-black mb-2">Upcoming Features</h2>
                <p className="text-gray-600 text-sm">Powerful tools coming to Bolt</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <FaRobot className="text-black w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Trading Bot</h3>
                      <p className="text-gray-600 text-sm">
                        State of the art trading bot for Solana blockchain.
                      </p>
                    </div>
                  </div>
                </div>
  
                <div className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <FaShieldAlt className="text-black w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Social Verification</h3>
                      <p className="text-gray-600 text-sm">
                        Advanced social media verification system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenMonitor;