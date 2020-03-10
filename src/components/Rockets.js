import React, { useState, useEffect, useContext } from "react";
import ContextContent from "../ContextContent";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

//
// Query through Apollo towards graphQL. In the schema.js of the BE the query is defined
// and the relevant API call and return data
//

const GLOBAL_QUERY = gql`
  {
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
const Rockets = () => {
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
    console.log("Rockets Component mounted");

    //
    // *************** GraphQL call response handling ************** //
    //
    if (loading) console.log("Loading Data...");
    if (error) console.log(error);
    if (data) {
      // console.log("Rockets: ", data.rockets);
      //
      console.log(data)
      setRockets(data.rockets);
      //
      // Once API response is received dispatch the                   //
      //                   data to the Context Wrapper                //
      dispatch({ type: "FETCH_ROCKETS", payload: data });
      console.log(
        "This writting and accessing the Context from Rockets Component",
        state
      );
      //
      // ************************************************************ //
    }
  }, [rockets, data]); // useEffect is syntaxed in this way to avoid infinite loops.
  //                             // This way it is executed on mount and unmount and when [rockets, launches, data] is modified
  //
  //
  return (
    <div>
      <h4>Rockets</h4>
      {loading && <div>Fecthing Rocket related data</div>}
      {state.rockets.length !== 0 &&
        state.rockets.map(rocket => {
          return <div key={rocket.rocket_id}>{rocket.rocket_name}</div>;
        })}
    </div>
  );
};
export default Rockets;
