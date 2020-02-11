import React, { useState, useEffect, useContext } from "react";
import ContextContent from "../ContextContent";
import FunctionalComponentChild from "./FunctionalComponentChild";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

//
// Query through Apollo towards graphQL. In the schema.js of the BE the query is defined
// and the relevant API call and return data
//

const GLOBAL_QUERY = gql`
  {
    launches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
    }
    rockets {
      rocket_id
      rocket_name
      rocket_type
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
  const [rockets, setRockets] = useState({});
  // Use this hook to retrieve the Context State. Now state variable contains the state
  // as it is provided by the provider in App.js. Dispatch function is used to update the values in the Context API
  const { state, dispatch } = useContext(ContextContent);
  //
  // ************************ GraphQL call ************************ //
  //
  const { loading, error, data } = useQuery(GLOBAL_QUERY);
  //
  // ************************************************************** //
  // Callback when Component mounts or updates - LIFECYCLE METHODS  //
  //
  useEffect(() => {
    count === 0
      ? console.log("Child FC mounted")
      : console.log("Child FC updated");
    //
    // *************** GraphQL call response handling ************** //
    //
    if (loading) console.log("Loading Data...");
    if (error) console.log(error);
    if (data) {
      // console.log("Rockets: ", data.rockets);
      // console.log("Launches: ", data.launches);
      //
      setRockets(data.rockets);
      setLaunches(data.launches);
      //
      // Once API response is received dispatch the                   //
      //                   data to the Context Wrapper                //
      dispatch({ type: "FETCH", payload: data });
      console.log("This writting and accessing the Context from FC", state);
      //
      // ************************************************************ //
    }
  }, [rockets, launches, data]); // useEffect is syntaxed in this way to avoid infinite loops.
  //                             // This way it is executed on mount and unmount and when [rockets, launches, data] is modified
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
