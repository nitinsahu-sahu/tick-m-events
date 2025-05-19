import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from './app';
import { store } from './redux/store';


// // Create a wrapper component to provide the currentUser to ChatProvider
// const ChatAppWrapper = () => {
//   // const currentUser = useSelector((state: RootState) => state?.auth?.user);
//   return (

//   );
// };

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense>
            <App />
          </Suspense>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);