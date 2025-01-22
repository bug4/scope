import React from 'react';
import { FaBolt } from 'react-icons/fa';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 z-50 flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
          <FaBolt className="text-purple-400 w-16 h-16 animate-bounce" />
          <div className="mt-4 bg-purple-500 bg-opacity-20 rounded-lg border border-purple-500 border-opacity-20 p-1">
            <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded animate-loading"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;