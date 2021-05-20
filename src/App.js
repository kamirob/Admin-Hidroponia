import React from 'react';
import AuthProvider from './Providers/AuthContext';
import Application from "./Layouts/Security/Application";

function App() {
  return (
    <AuthProvider>
      <Application/>
    </AuthProvider>
  );
}

export default App;