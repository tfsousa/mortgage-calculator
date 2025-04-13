import React from 'react';
import { createRoot } from 'react-dom/client';

import './main.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
