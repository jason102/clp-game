import React from 'react';
import { AppContainer } from './App.styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/client' element={<Client />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
