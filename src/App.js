import React, { useReducer } from "react";
import Setting from "./components/Setting";
import Report from "./components/Report";
import SendMessage from "./components/SendMessage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import AppContext from "./AppContext";
import { Menu } from "antd";
import reducer from "./reducer";

export const initialState = {
  keys: [],
  msg: []
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link to="/">send SMS</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/report">Report</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/setting">Setting</Link>
              </Menu.Item>
            </Menu>
          </nav>

          <Switch>
            <Route path="/setting">
              <Setting />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/">
              <SendMessage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
}
