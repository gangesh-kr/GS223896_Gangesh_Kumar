
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataImporter from './DataImporter';

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated = false, 
  onSignIn = () => {}, 
  onSignOut = () => {} 
}) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src="/gsynergy-logo.svg" 
            alt="GSynergy Logo" 
            style={{ height: '40px', marginRight: '16px' }} 
          />
          <Typography variant="h6" component="div">
            GSynergy Data Viewer
          </Typography>
          <DataImporter />
        </Box>
        {isAuthenticated ? (
          <Button color="inherit" onClick={onSignOut}>Sign Out</Button>
        ) : (
          <Button color="inherit" onClick={onSignIn}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;