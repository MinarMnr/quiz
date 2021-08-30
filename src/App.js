import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import questionCreate from "./components/question/Create";
import questionUpdate from "./components/question/Update";
import questionList from "./components/question/List";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={questionList} />
          <Route path="/question/create" exact component={questionCreate} />
          <Route path="/question/update/:id" exact component={questionUpdate} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
