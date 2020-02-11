import React, { useState, useEffect } from "react";
import FC from "./components/FunctionalComponent";
import "./App.css";
import { ContentProvider } from "./ContextContent";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
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
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Anestis");
  const state = {};

  // Callback when Component mounts or updates
  useEffect(() => {
    count
      ? console.log("Parent FC mounted", count, name)
      : console.log("Parent FC updated", count, name);
  });
  // Callback from Child COmponent
  const callbackFromChild = (childData, count) => {
    console.log("Inside Parent: ", childData, count);
    setCount(count + 1);
  };
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <ContentProvider>
            <FC
              propsFromParent="Hello from parent"
              callbackFromChild={callbackFromChild}
            />
          </ContentProvider>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
