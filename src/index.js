import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Converter from "./components/Converter";
import { ThemeProvider } from "@chakra-ui/core";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import * as serviceWorker from "./serviceWorker";



const cache = new InMemoryCache();
const link = ApolloLink.from([
  new RestLink({uri:  "http://data.fixer.io/api/"}),
  new HttpLink({uri: "https://countries.trevorblades.com/"})
]);

const apolloClient = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
  fetchOptions: {
    mode: 'no-cors',
  }
})

ReactDOM.render(
  <ThemeProvider>
  <ApolloProvider client={apolloClient}>
    <Router>
      <div>
        <Route path="/" component={Converter} />
      </div>
    </Router>
  </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
