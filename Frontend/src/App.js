import React, { Fragment } from "react";
import { Provider } from "react-redux";
import Store from "./Store";
import { BrowserRouter, Route } from "react-router-dom";

//Import the components
import Home from "./Components/Home/Home";
import GetAllCompanies from "./Components/Company/GetAllCompanies";
import Field from "./Components/Field/Field";
const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/showallcompanies" component={GetAllCompanies} />
          <Route exact path="/custom_fields" component={Field} />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
