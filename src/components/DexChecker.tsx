import React, { useState } from 'react';
import { FaSearch, FaSpinner, FaCube, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface DexOrder {
  status: string;
  paymentTimestamp: number;
}

const DexChecker: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dexLoading, setDexLoading] = useState(false);

  const checkTokenInfo = async () => {
    const chainId = 'solana';
    if (!tokenAddress) {
      setError('Please enter a valid Solana token address.');
      setResult(null);
      return;
    }
    try {
      setError(null);
      setDexLoading(true);
      setResult(null);
      const response = await fetch(
        `https://api.dexscreener.com/orders/v1/${chainId}/${tokenAddress}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || 'Something went wrong'}`);
        setResult(null);
        return;
      }
      const data = await response.json() as DexOrder[];
      const isPaid = data.some(
        (order: DexOrder) => order.status === 'approved' && order.paymentTimestamp > 0
      );
      setResult(isPaid ? 'Paid' : 'Not Paid');
    } catch (err) {
      setError('Failed to fetch token information. Please try again later.');
      setResult(null);
    } finally {
      setDexLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="max-w-xl w-full p-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-500 bg-opacity-20 rounded-lg">
              <FaCube size={48} className="text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Token Analysis
          </h1>
          <p className="text-gray-400">
            Check enhanced DEX information availability for any Solana token
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label htmlFor="tokenAddress" className="block text-sm font-medium text-gray-300 mb-2">
                Token Address
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  id="tokenAddress"
                  className="flex-1 rounded-lg bg-gray-700 bg-opacity-50 border border-gray-600 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter Solana token address"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
                <button
                  onClick={checkTokenInfo}
                  disabled={dexLoading}
                  className="px-6 py-2 bg-purple-500 bg-opacity-20 text-purple-400 rounded-lg hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 flex items-center gap-2 transition-all duration-300 border border-purple-500 border-opacity-20"
                >
                  {dexLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Checking</span>
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      <span>Check</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
                <FaTimesCircle />
                {error}
              </div>
            )}

            {result && (
              <div className="text-center p-8 rounded-lg bg-gray-700 bg-opacity-20 border border-purple-500 border-opacity-20">
                {result === 'Paid' ? (
                  <div className="space-y-3">
                    <div className="bg-green-500 bg-opacity-20 p-4 rounded-full inline-block">
                      <FaCheckCircle size={48} className="text-green-400" />
                    </div>
                    <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                      Enhanced Information Available
                    </p>
                    <p className="text-gray-400">This token has premium DEX data access</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-600 bg-opacity-20 p-4 rounded-full inline-block">
                      <FaTimesCircle size={48} className="text-gray-400" />
                    </div>
                    <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-300">
                      Basic Information Only
                    </p>
                    <p className="text-gray-400">No enhanced DEX data available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexChecker;