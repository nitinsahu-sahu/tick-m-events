// import React, { createContext, useContext, useState } from 'react';

// interface FrameContextType {
//   selectedFrame: string | null;
//   setSelectedFrame: (url: string | null) => void;
// }

// const FrameContext = createContext<FrameContextType>({
//   selectedFrame: null,
//   setSelectedFrame: () => {},
// });

// export const useFrame = () => useContext(FrameContext);

// export const FrameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

//   return (
//     <FrameContext.Provider value={{ selectedFrame, setSelectedFrame }}>
//       {children}
//     </FrameContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface FrameContextType {
  selectedFrame: string | null;
  setSelectedFrame: (url: string | null) => void;
}

const FrameContext = createContext<FrameContextType | undefined>(undefined);

export const FrameProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const value = useMemo(() => ({ selectedFrame, setSelectedFrame }), [selectedFrame]);

  return (
    <FrameContext.Provider value={value}>
      {children}
    </FrameContext.Provider>
  );
};

export const useFrame = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrame must be used within a FrameProvider');
  }
  return context;
};
