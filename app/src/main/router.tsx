import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../presentation/views/Home/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);
