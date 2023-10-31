import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import queryClient from './services/queryClient';
import { QueryClientProvider } from 'react-query';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App tab="home" />
    </QueryClientProvider>
  </Provider>,
);
