import React, { useState, useEffect, useContext } from "react";
import ContextContent from "../ContextContent";
import FunctionalComponentChild from "./FunctionalComponentChild";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
//
// Query through Apollo towards graphQL. In the schema.js of the BE the query is defined
// and the relevant API call and return data
//
const LAUNCHES_QUERY = gql`
  {
    launches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
    }
  }
`;
//
// Functional Component
//
const FunctionalComponent = props => {
  const [name, setName] = useState("Anestis");
  const [lastName, setlastName] = useState("Sidiropoulos");
  const [count, setCount] = useState(0);
  const [launches, setLaunches] = useState({});
  const contextData = useContext(ContextContent);
  //
  //
  // ************************ GraphQL call ************************ //
  //
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  //
  // ************************************************************** //
  // Callback when Component mounts or updates
  //
  useEffect(() => {
    count === 0
      ? console.log("Child FC mounted")
      : console.log("Child FC updated");
    console.log(contextData);
    //
    // *************** GraphQL call response handling ************** //
    //
    if (loading) console.log("loading");
    if (error) console.log(error);
    if (data) {
      console.log("Launches: ", data);
      // Once API response is received dispatch the                   //
      //                   data o the Context Wrapper                 //
      setLaunches(data);
      // ************************************************************ //
    }
  });
  //
  // Event Handler
  //
  const handleClick = () => {
    console.log("click");
    setCount(count + 1);
    setName(`Anestis ${count + 1}`);
    setlastName(`Sidiropoulos ${count + 1}`);
    props.callbackFromChild("I am the Child Data", count);
  };
  //
  return (
    <div>
      {/* Props from parent */}
      <header>{props.propsFromParent}</header>
      <br />
      <header>
        I am {lastName} {name}
      </header>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
      <FunctionalComponentChild />
    </div>
  );
};
export default FunctionalComponent;
