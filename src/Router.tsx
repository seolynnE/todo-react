import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Router() {
  const mainURL = process.env.PUBLIC_URL || "/";
  return (
    <BrowserRouter basename={mainURL}>
      <Switch>
        <Route path="/"></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
