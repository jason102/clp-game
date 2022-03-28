import React from 'react';
import { AppContainer } from 'App.styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'pages/dashboard/Dashboard';
import Client from 'pages/client/Client';

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/client' element={<Client />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
