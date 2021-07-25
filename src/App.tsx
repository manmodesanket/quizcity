import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/datacontext";
import { Home, Quiz } from "./pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/quiz/:quizId" component={Quiz} />
      </Router>
    </DataProvider>
  );
}

export default App;
