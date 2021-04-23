import React, { Fragment } from "react";
import { Provider } from "react-redux";
import Store from "./Store";
import { BrowserRouter, Route } from "react-router-dom";

//Import the components
import Home from "./Components/Home/Home";
import Field from "./Components/Field/Field";
import Group from "./Components/Groups/Groups";
import Module from "./Components/Module/Module";
import ShowCompany from "./Components/Company/ShowCompany";
import ShowPComp from "./Components/Company/ShowAllCompanies/ShowParticularCompany/ShowPComp";
import CompanyForm from "./Components/Company/CompanyForm/CompanyForm";
import EditCompany from "./Components/Company/EditCompany/EditCompany";
import Showpersonlist from "./Components/Company/ShowAllCompanies/ShowParticularCompany/ShowPersonList/Showpersonlist";
import Groupsearch from "./Components/Company/Groupsearch/Groupsearch";
const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/custom_fields" component={Field} />
          <Route exact path="/modules" component={Module} />
          <Route exact path="/groups" component={Group} />
          <Route exact path="/companies" component={ShowCompany} />
          <Route exact path="/groupsearch" component={Groupsearch} />
          <Route
            exact
            path="/particularcompany"
            render={(props) => <ShowPComp {...props} />}
          />
          <Route
            exact
            path="/editcompany"
            render={(props) => <EditCompany {...props} />}
          />
          <Route exact path="/createcompany" component={CompanyForm} />
          <Route exact path="/company/personlist" component={Showpersonlist} />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
