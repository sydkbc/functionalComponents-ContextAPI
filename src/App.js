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
// Functional Component Child
//
//
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Anestis");

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
          <ContentProvider value={{ count, name }}>
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
