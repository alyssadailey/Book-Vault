import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Navbar from './components/Navbar';
import Auth from './utils/auth';

//send the token to the server with request
const httpLink = createHttpLink({
  uri: '/graphql',
  headers: {
    authorization: Auth.loggedIn() ? `Bearer ${Auth.getToken()}` : '',
  },

 })

// Create Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
