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
const Launches = () => {
  const [launches, setLaunches] = useState({});
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
    console.log("Launches Component mounted");

    //
    // *************** GraphQL call response handling ************** //
    //
    if (loading) console.log("Loading Data...");
    if (error) console.log(error);
    if (data) {
      // console.log("Launches: ", data.launches);
      //
      setLaunches(data.launches);
      //
      // Once API response is received dispatch the                   //
      //                   data to the Context Wrapper                //
      dispatch({ type: "FETCH_LAUNCHES", payload: data });
      console.log(
        "This writting and accessing the Context from Launches Component",
        state
      );
      //
      // ************************************************************ //
    }
  }, [launches, data]); // useEffect is syntaxed in this way to avoid infinite loops.
  //                             // This way it is executed on mount and unmount and when [rockets, launches, data] is modified
  //
  return (
    <div>
      <h4>Launches</h4>
      {loading && <div>Fecthing Launch related data</div>}
      {state.launches.length !== 0 &&
        state.launches.map(launch => {
          return <div key={launch.flight_number}>{launch.mission_name}</div>;
        })}
    </div>
  );
};
export default Launches;
