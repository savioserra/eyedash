import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import protectRoute from "./components/hocs/protected";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/admin">
        <AdminRoutes />
      </Route>

      <Route path="/">
        <LoginPage />
      </Route>
    </Switch>
  </Router>
);

const AdminRoutes: React.FC = protectRoute(() => (
  <Switch>
    <Route path="/">
      <span>ok</span>
    </Route>
  </Switch>
));

export default App;
