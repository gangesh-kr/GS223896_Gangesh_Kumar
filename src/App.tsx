import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';

// Pages
import StorePage from './pages/StorePage';
import SKUPage from './pages/SKUPage';
import PlanningPage from './pages/PlanningPage';
import ChartPage from './pages/ChartPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };
  
  const handleSignOut = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Box sx={{ display: 'flex', minWidth: '1080px' }}>
            <Navbar 
              isAuthenticated={isAuthenticated} 
              onSignIn={handleSignIn} 
              onSignOut={handleSignOut} 
            />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Routes>
                <Route path="/stores" element={<StorePage />} />
                <Route path="/skus" element={<SKUPage />} />
                <Route path="/planning" element={<PlanningPage />} />
                <Route path="/chart" element={<ChartPage />} />
                <Route path="/" element={<Navigate to="/stores" replace />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;