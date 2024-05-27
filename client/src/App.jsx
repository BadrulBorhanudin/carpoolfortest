import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Box display='flex' flexDirection='column' minHeight='100vh'>
          <Layout>
            <Header />
            <Box flex='1'>
              <Outlet />
            </Box>
          </Layout>
          <Footer />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
