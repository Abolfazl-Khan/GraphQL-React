import './style/style.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const container = document.getElementById('root');
const root = createRoot(container);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SongList />} />
          <Route path='songs'>
            <Route path='new' element={<SongCreate />} />
            <Route path=':id' element={<SongDetail />} />
          </Route>

          {/* <Route path='/songs/new' element={<SongCreate />} />
          <Route path='/songs/:id' element={<SongDetail />} /> */}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
