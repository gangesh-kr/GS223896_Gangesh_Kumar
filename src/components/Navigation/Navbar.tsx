import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataImporter from './DataImporter';
import logo from '../../assets/logo.svg';

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
    <AppBar 
      position="fixed" 
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white", color: "black" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="GSynergy Logo" style={{ height: '50px', marginRight: '16px' }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center", gap: 2 }}>
          <Typography variant="h6" component="div">
            GSynergy Data Viewer
          </Typography>
          <DataImporter />
        </Box>

        <Box>
          {isAuthenticated ? (
            <Button color="inherit" onClick={onSignOut}>Sign Out</Button>
          ) : (
            <Button color="inherit" onClick={onSignIn}>Sign In</Button>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
