import React from "react";

const ContentContext = React.createContext({});

// This is the initial State
let initialState = {
  name: "Syd KBC",
  rockets: [],
  launches: []
};

// This reducer will handle the update of the Context Information
let reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "FETCH_ROCKETS":
      return {
        ...state,
        rockets: action.payload.rockets
      };
    case "FETCH_LAUNCHES":
      return {
        ...state,
        launches: action.payload.launches
      };
    default:
      return initialState;
  }
};
//
// This is how we will provide the Context Data throughout the App
// and how we can access/edit these data keeping them in the central state
//
function ContentProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <ContentContext.Provider value={value}>
      {props.children}
    </ContentContext.Provider>
  );
}
//
let ContentConsumer = ContentContext.Consumer;
export default ContentContext;
export { ContentProvider, ContentConsumer };
