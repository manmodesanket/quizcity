import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/datacontext";
import { Home, QuizPage } from "./pages";
import * as ROUTES from "./routes/routes";

function App() {
  return (
    <DataProvider>
      <Router>
        <Route path={ROUTES.ROUTE_HOME} exact component={Home} />
        <Route path={ROUTES.ROUTE_QUIZ} exact component={QuizPage} />
      </Router>
    </DataProvider>
  );
}

export default App;
