import React from 'react';
import AuthenticationProvider from './src/Navigation/AuthenticationProvider';
import Routes from './src/Navigation/Routes';

const App = () => {
  return (
    <AuthenticationProvider>
      <Routes />
    </AuthenticationProvider>
  );
};

export default App;
