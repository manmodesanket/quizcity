import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/datacontext";
import { Home, QuizPage } from "./pages";
import ResultPage from "./pages/result";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <DataProvider>
      <Router>
        <Route path={ROUTES.ROUTE_HOME} exact component={Home} />
        <Route path={ROUTES.ROUTE_QUIZ} exact component={QuizPage} />
        <Route path={ROUTES.ROUTE_RESULT} exact component={ResultPage} />
      </Router>
    </DataProvider>
  );
}

export default App;
