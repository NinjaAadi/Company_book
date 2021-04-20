import React, { Fragment } from "react";
import { Provider } from "react-redux";
import Store from "./Store";
import { BrowserRouter, Route } from "react-router-dom";

//Import the components
import Home from "./Components/Home/Home";
import GetAllCompanies from "./Components/Company/GetAllCompanies";

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={Home} />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
