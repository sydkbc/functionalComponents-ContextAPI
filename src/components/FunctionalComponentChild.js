import React, { useState, useEffect, useContext } from "react";
import ContextContent from "../ContextContent";

// functional Component
const FunctionalComponentChild = props => {
  const [name, setName] = useState("Anestis");
  const [lastName, setlastName] = useState("Sidiropoulos");
  const [count, setCount] = useState(10);
  const contextData = useContext(ContextContent);

  // Callback when Component mounts or updates
  useEffect(() => {
    count === 0
      ? console.log("Child Child FC mounted")
      : console.log("Child Child FC updated");
    console.log(contextData);
    //contextData({ name, count });
  });

  return (
    <div>
      {/* Props from parent */}
      <header>yo</header>
    </div>
  );
};
export default FunctionalComponentChild;
