import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from "./Contexts/AppContext";
import { AuthProvider } from './Contexts/AuthContext';
import Routes from './Routes';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;