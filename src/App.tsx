import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/datacontext";
import { AccountPage, Home, QuizPage, ResultPage } from "./pages";
import * as ROUTES from "./constants/routes";
import PrivateRoute from "./components/privateroute/privateroute";

function App() {
  return (
    <DataProvider>
      <Router>
        <Switch>
          <Route path={ROUTES.ROUTE_HOME} exact component={Home} />
          <PrivateRoute path={ROUTES.ROUTE_QUIZ} Element={QuizPage} />
          <Route path={ROUTES.ROUTE_RESULT} exact component={ResultPage} />
          <Route path={ROUTES.ROUTE_ACCOUNT} exact component={AccountPage} />
        </Switch>
      </Router>
    </DataProvider>
  );
}

export default App;
