// FILE PATH: src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider }   from '@/contexts/ThemeContext';
import { CountryProvider } from '@/contexts/CountryContext';
import { CartProvider }    from '@/contexts/CartContext';
import { AdminProvider }   from '@/contexts/AdminContext';

import Index    from '@/pages/Index';
// import Services from '@/pages/Services';
// import About    from '@/pages/About';
// import Projects from '@/pages/Projects';
// import Contact  from '@/pages/Contact';

import './styles/globals.css';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CountryProvider>
          <CartProvider>
            <AdminProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AdminProvider>
          </CartProvider>
        </CountryProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
