import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products'; 
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ComingSoon from './pages/ComingSoon';
import { CssBaseline } from '@mui/material';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeModeProvider } from './context/ThemeContext'; // 👈 NEW




import { DashboardCustomize } from '@mui/icons-material';


function App() {

  return (
    
    <ThemeModeProvider >
      <CssBaseline />
      <NotificationProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} /> 
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard/>}/>
              <Route path="products" element={<Products/>} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="orders" element={<ComingSoon title="Orders Management" />} />
              <Route path="purchase" element={<ComingSoon title="Purchase Orders" />} />
              <Route path="reporting" element={<ComingSoon title="Reports & Analytics" />} />
              <Route path="support" element={<ComingSoon title="Support & Helpdesk" />} />
              <Route path="settings" element={<ComingSoon title="Settings & Configuration" />} />

            </Route>
        </Routes> 
        
      </NotificationProvider>
      
      
    </ThemeModeProvider>
    
  )
}

export default App
