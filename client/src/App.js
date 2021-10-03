import Index1 from "./components/pages/Index1";
import Index from "./components/pages/Index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/"><h1>ตัวอย่างที่ 1</h1></Link>
      <Link to="/example2"><h1>ตัวอย่างที่ 2</h1></Link>
      <Switch>
        <Route path="/" exact component={Index1} />
        <Route path="/example2" exact component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
