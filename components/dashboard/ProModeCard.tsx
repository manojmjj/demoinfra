import React from 'react';

const ProModeCard: React.FC = () => {
  const handleUnlock = () => {
    alert('Upgrade now to unlock all features!');
  };

  return (
    <div 
        className="relative h-full flex flex-col justify-between p-6 rounded-lg text-white overflow-hidden"
        style={{ background: 'linear-gradient(45deg, #0052D4, #4364F7, #6FB1FC)'}}
    >
        <div 
            className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/20 rounded-full"
            style={{ filter: 'blur(40px)' }}
        ></div>
         <div 
            className="absolute right-0 top-0 w-32 h-32"
        >
             <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M128 0C98.4975 39.5183 39.5183 98.4975 0 128L128 128L128 0Z" fill="url(#paint0_linear_1_2)"/>
                <defs>
                <linearGradient id="paint0_linear_1_2" x1="64" y1="0" x2="64" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.2"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                </defs>
            </svg>
        </div>
      
      <div className="z-10">
        <h3 className="text-lg font-bold">Pro Mode</h3>
        <p className="mt-1 text-sm text-blue-100 max-w-xs">
          Upgrade now to unlock all features you need.
        </p>
      </div>
      <button onClick={handleUnlock} className="z-10 mt-6 self-start flex items-center px-4 py-2 text-sm font-semibold bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
        Unlock Now
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </button>
    </div>
  );
};

export default ProModeCard;