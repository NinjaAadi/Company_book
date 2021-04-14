import React, { Fragment } from "react";
import { Provider } from "react-redux";
import Store from "./Store";
const App = () => {
  return (
    <Provider store={Store}>
      <Fragment>
        <div>
          <h1>Hello world</h1>
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
