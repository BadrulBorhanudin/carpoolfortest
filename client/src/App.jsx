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

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set the context for the Apollo Client to include the authorization token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client with the HTTP link and in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Define the main App component
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
