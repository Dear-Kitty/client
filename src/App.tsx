import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import Toast from './components/Common/Toast';
import router from './Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
