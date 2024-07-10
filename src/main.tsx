import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app.tsx';
import './styles/main.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/error_page.tsx';
import { FilmInfo } from './pages/film_info_page.tsx';
import { setupStore } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: import.meta.env.BASE_URL + 'film/:id',
    element: <FilmInfo />,
  },
]);

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
