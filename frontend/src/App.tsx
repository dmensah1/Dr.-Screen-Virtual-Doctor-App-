import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";
import Login from "./pages/auth/Login";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Patients from "./pages/Patients";

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="/booking" exact component={Booking} />
          <Route path="/patients" exact component={Patients} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
