// FILE PATH: src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div style={{ padding: '2rem', fontSize: '2rem' }}>App is working ✅</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
