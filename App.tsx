import React from 'react';
import CanvasLayout from './components/CanvasLayout';
import OverlayUI from './components/OverlayUI';

function App() {
  return (
    <main className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <CanvasLayout />
      <OverlayUI />
    </main>
  );
}

export default App;
