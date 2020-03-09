import React, { useEffect } from "react";
import Launches from "./components/Launches";
import Rockets from "./components/Rockets";

import "./App.css";
import { ContentProvider } from "./ContextContent";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://graph-ql-anesid.herokuapp.com:8080/graphql"
});
//
// *****************************************************************************************************************  //
// This is a very simple application.
// It combines technologies like React, GraphQL, Apollo, Funcional Components, Hooks and Context API
// The application performs a graphQL call which subsequently interfaces with Space X API to bring information
// regarding Rockets and Launchings. Once this info is brought they are inserted in the Context Content
// as a central point of refference, replacing this way Redux
//
// Graph QL Apollo React info : https://www.apollographql.com/docs/react/get-started/
//
// Context API and Hooks as an alternative of to Class based components with redux
//
//           App
//            |
//            |
//           F C [ Apollo ------> Graphql ---------- ]
//            |  [Context<------- Space X API <----| ]
//            |
//            |
//
// *****************************************************************************************************************  //
//
// Functional Component Child
//
//
function App() {
  // Callback when Component mounts or updates
  useEffect(() => {
    console.log("App mounted/updated");
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <ContentProvider>
            <Launches />
            <br />
            <Rockets />
          </ContentProvider>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
