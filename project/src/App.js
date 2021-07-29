import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/login_page/login_page.components";
import SignUp from "./pages/signup_page/signup_page.component";
import Profile from "./pages/profile_page/profile_page.component";
import ForgotPassword from "./pages/forgot_password_page/forgot_password_page.component";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div className="App">
      <div className="content-page">
        <Switch>
          <Route exact path="/" component={(props) => <Login {...props} />} />
          <Route path="/signup" component={(props) => <SignUp {...props} />} />
          <Route
            path="/forgot_pass"
            component={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path="/profile"
            component={(props) => <Profile {...props} />}
          />
          {/* <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgot_pass" component={ForgotPassword} />
          <Route exact path="/profile" component={Profile} /> */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
