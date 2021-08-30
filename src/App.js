import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import questionCreate from "./components/question/Create";
import questionUpdate from "./components/question/Update";
import questionList from "./components/question/List";
import answerCreate from "./components/answer/Create";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={questionList} />
          <Route path="/question/create" exact component={questionCreate} />
          <Route path="/question/update/:id" exact component={questionUpdate} />
          <Route path="/answer/create/:qid" exact component={answerCreate} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
