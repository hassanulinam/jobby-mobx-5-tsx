import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./routes/JobsPage";
import JobItemDetails from "./routes/JobDetailsPage";
import NotFound from "./routes/NotFoundPage";
import Home from "./routes/HomePage";

import Login from "./routes/LoginPage";
import { observer } from "mobx-react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default observer(App);
