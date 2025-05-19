import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider, useSelector } from 'react-redux';

import App from './app';
import { RootState, store } from './redux/store';
import { ChatProvider } from './redux/context/ChatContext';


// Create a wrapper component to provide the currentUser to ChatProvider
const ChatAppWrapper = () => {
  const currentUser = useSelector((state: RootState) => state?.auth?.user);
  return (
    <ChatProvider currentUser={currentUser}>
      <App />
    </ChatProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense>
            <ChatAppWrapper /> {/* Replace <App /> with this wrapper */}
          </Suspense>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);