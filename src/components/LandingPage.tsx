import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaSearch, FaLayerGroup, FaWallet, FaTwitter } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Social buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <a 
          href="https://pump.fun/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 bg-purple-500 bg-opacity-20 text-purple-400 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2 border border-purple-500 border-opacity-20"
        >
          Buy $Volt
        </a>
        <a 
          href="https://x.com/VoltTechAI" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-3 bg-purple-500 bg-opacity-20 text-purple-400 rounded-lg hover:bg-opacity-30 transition-all duration-300 border border-purple-500 border-opacity-20"
        >
          <FaTwitter size={24} />
        </a>
      </div>

      <div className="h-full flex flex-col items-center justify-center px-4 py-16 relative z-10">
        {/* Header section */}
        <div className="max-w-4xl w-full text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Volt Vision
            </h1>
          </div>
          <h2 className="text-2xl text-gray-400 mb-8">Analysis Tools</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Advanced monitoring and analysis suite for Solana tokens, 
            providing deep insights and real-time tracking capabilities.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mb-16">
          <Link to="/monitor" className="group">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full flex flex-col items-center text-center transform hover:scale-[1.02]">
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaChartLine size={36} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                Token Monitor
              </h2>
              <p className="text-gray-400">
                Real-time token monitoring with metadata analysis faster than any trading platform.
              </p>
            </div>
          </Link>

          <Link to="/dex" className="group">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full flex flex-col items-center text-center transform hover:scale-[1.02]">
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaSearch size={36} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                Token Analysis
              </h2>
              <p className="text-gray-400">
                Enhanced DEX check for any pump.fun token.
              </p>
            </div>
          </Link>

          <div className="group">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full flex flex-col items-center text-center relative transform hover:scale-[1.02]">
              <div className="absolute top-4 right-4">
                <span className="bg-purple-500 bg-opacity-20 text-purple-400 text-xs font-medium px-2.5 py-0.5 rounded border border-purple-500 border-opacity-20">
                  Coming Soon
                </span>
              </div>
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaLayerGroup size={36} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                Bundle Analysis
              </h2>
              <p className="text-gray-400">
                Monitor and analyze bundle transactions for market insights.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full flex flex-col items-center text-center relative transform hover:scale-[1.02]">
              <div className="absolute top-4 right-4">
                <span className="bg-purple-500 bg-opacity-20 text-purple-400 text-xs font-medium px-2.5 py-0.5 rounded border border-purple-500 border-opacity-20">
                  Coming Soon
                </span>
              </div>
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaWallet size={36} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                Wallet Tracker
              </h2>
              <p className="text-gray-400">
                Track and analyze wallet behaviors and transaction patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Launch button */}
        <Link 
          to="/monitor" 
          className="px-8 py-3 bg-purple-500 bg-opacity-20 text-purple-400 rounded-lg hover:bg-opacity-30 transition-all duration-300 border border-purple-500 border-opacity-20 transform hover:scale-105"
        >
          Launch App
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;