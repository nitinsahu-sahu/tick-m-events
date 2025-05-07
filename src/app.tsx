import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import 'src/global.css';

import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { eventFetch } from './redux/actions/event.action';
import { AppDispatch } from './redux/store';


// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useScrollToTop();
  useEffect(() => {
     dispatch(eventFetch());
  }, [dispatch]);
  return (
    <ThemeProvider>
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}
