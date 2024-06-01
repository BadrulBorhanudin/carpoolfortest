import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleRide from './pages/SingleRide.jsx';
import Support from './pages/Support.jsx';
import SuccessPage from './pages/Success.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import 'react-datepicker/dist/react-datepicker.css';

// Create the router with the routes configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/support',
        element: <Support />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profiles/:username',
        element: <Profile />,
      },
      {
        path: '/me',
        element: <Profile />,
      },
      {
        path: '/rides/:id',
        element: <SingleRide />,
      },
      {
        path: '/success',
        element: <SuccessPage />,
      },
    ],
  },
]);

// Render the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);

// Register the service worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}