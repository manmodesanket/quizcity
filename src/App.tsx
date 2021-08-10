import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/datacontext";
import { AccountPage, Home, QuizPage, ResultPage } from "./pages";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <DataProvider>
      <Router>
        <Route path={ROUTES.ROUTE_HOME} exact component={Home} />
        <Route path={ROUTES.ROUTE_QUIZ} exact component={QuizPage} />
        <Route path={ROUTES.ROUTE_RESULT} exact component={ResultPage} />
        <Route path={ROUTES.ROUTE_ACCOUNT} exact component={AccountPage} />
      </Router>
    </DataProvider>
  );
}

export default App;
