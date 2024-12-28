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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl w-full p-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FaCube size={48} className="text-black" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            Token Analysis
          </h1>
          <p className="text-gray-600">
            Check enhanced DEX information availability for any Solana token
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="tokenAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Token Address
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  id="tokenAddress"
                  className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter Solana token address"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
                <button
                  onClick={checkTokenInfo}
                  disabled={dexLoading}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 transition-colors"
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
              <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-md flex items-center gap-3">
                <FaTimesCircle className="text-red-500" />
                {error}
              </div>
            )}

            {result && (
              <div className="text-center p-8 rounded-lg border border-gray-200">
                {result === 'Paid' ? (
                  <div className="space-y-3">
                    <FaCheckCircle size={48} className="text-green-500 mx-auto" />
                    <p className="text-xl font-semibold text-gray-900">Enhanced Information Available</p>
                    <p className="text-gray-600">This token has premium DEX data access</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <FaTimesCircle size={48} className="text-gray-400 mx-auto" />
                    <p className="text-xl font-semibold text-gray-900">Basic Information Only</p>
                    <p className="text-gray-600">No enhanced DEX data available</p>
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