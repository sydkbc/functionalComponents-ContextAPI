import React, { useState, useEffect, useContext } from "react";
import ContextContent from "../ContextContent";

// functional Component
const FunctionalComponentChild = props => {
  const [count, setCount] = useState(10);
  const contextData = useContext(ContextContent);

  // Callback when Component mounts or updates
  useEffect(() => {
    count === 0
      ? console.log("Child Child FC mounted")
      : console.log("Child Child FC updated");
    // This is just a simple Consumer of Context. No dispatch is defined
    // so the component can only access and read the Context data
    console.log("This is accessing the Context from FCC", contextData);
  });

  return (
    <div>
      {/* Props from parent */}
      <header>yo</header>
    </div>
  );
};
export default FunctionalComponentChild;
