import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaSearch, FaLayerGroup, FaWallet, FaCrosshairs, FaTwitter } from 'react-icons/fa';

const LandingPage: React.FC = () => {
 return (
   <div className="min-h-screen bg-white">
     <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
 <a 
   href="https://pump.fun/coin/5hsr4mz9TTaRiyTiUz1XPTt4zgASmBivAFKjAQV8pump" 
   target="_blank" 
   rel="noopener noreferrer"
   className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
 >
   Buy $SCOPE
 </a>
 <a 
   href="https://x.com/ScopeToolsAI" 
   target="_blank" 
   rel="noopener noreferrer" 
   className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
 >
   <FaTwitter size={24} />
 </a>
</div>

     <div className="h-full flex flex-col items-center justify-center px-4 py-16">
       <div className="max-w-4xl w-full text-center mb-16">
         <div className="flex items-center justify-center gap-3 mb-6">
           <FaCrosshairs size={40} className="text-black" />
           <h1 className="text-5xl font-bold text-black">SCOPE</h1>
         </div>
         <h2 className="text-2xl text-gray-600 mb-8">Analysis Tools</h2>
         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           Advanced monitoring and analysis suite for Solana tokens, 
           providing deep insights and real-time tracking capabilities.
         </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mb-16">
         <Link to="/monitor" className="group">
           <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
             <div className="text-black mb-6 transform group-hover:scale-110 transition-transform duration-300">
               <FaChartLine size={36} />
             </div>
             <h2 className="text-2xl font-bold text-black mb-4">Token Monitor</h2>
             <p className="text-gray-600">
               Real-time token monitoring with metadata analysis faster than any trading platform.
             </p>
           </div>
         </Link>

         <Link to="/dex" className="group">
           <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
             <div className="text-black mb-6 transform group-hover:scale-110 transition-transform duration-300">
               <FaSearch size={36} />
             </div>
             <h2 className="text-2xl font-bold text-black mb-4">Token Analysis</h2>
             <p className="text-gray-600">
               Enhanced DEX check for any pump.fun token.
             </p>
           </div>
         </Link>

         <div className="group">
           <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative">
             <div className="absolute top-4 right-4">
               <span className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded">
                 Coming Soon
               </span>
             </div>
             <div className="text-black mb-6 transform group-hover:scale-110 transition-transform duration-300">
               <FaLayerGroup size={36} />
             </div>
             <h2 className="text-2xl font-bold text-black mb-4">Bundle Analysis</h2>
             <p className="text-gray-600">
               Monitor and analyze bundle transactions for market insights.
             </p>
           </div>
         </div>

         <div className="group">
           <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative">
             <div className="absolute top-4 right-4">
               <span className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded">
                 Coming Soon
               </span>
             </div>
             <div className="text-black mb-6 transform group-hover:scale-110 transition-transform duration-300">
               <FaWallet size={36} />
             </div>
             <h2 className="text-2xl font-bold text-black mb-4">Wallet Tracker</h2>
             <p className="text-gray-600">
               Track and analyze wallet behaviors and transaction patterns.
             </p>
           </div>
         </div>
       </div>

       <Link 
         to="/monitor" 
         className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
       >
         Launch App
       </Link>
     </div>
   </div>
 );
};

export default LandingPage;