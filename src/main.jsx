import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root/root.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import GeneralAnalytics from './routes/generalAnalytics/generalAnalytics.jsx';
// import PersonalAnalytics from './routes/personalAnalytics/personalAnalytics.jsx';
import Search from './routes/search/search.jsx';
import { Web3ModalProvider } from './web3Provider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/general', element: <GeneralAnalytics /> },
      // { path: '/personal', element: <PersonalAnalytics /> },
      { path: '/search', element: <Search /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <RouterProvider router={router} />
    </Web3ModalProvider>
  </React.StrictMode>
);
