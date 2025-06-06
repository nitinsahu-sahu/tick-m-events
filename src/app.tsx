import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import 'src/global.css';

import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { eventFetch, wishlistEventFetch } from './redux/actions/event.action';
import { AppDispatch } from './redux/store';
import { eventOrderFetch } from './redux/actions/eventOrder';
import { recommTrandingPopularEventFetch } from './redux/actions/home-recommendation.action';


// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useScrollToTop();
  useEffect(() => {
    dispatch(wishlistEventFetch())
    dispatch(eventFetch());
    dispatch(eventOrderFetch())
    dispatch(recommTrandingPopularEventFetch());
  }, [dispatch]);
  return (
    <ThemeProvider>
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}
