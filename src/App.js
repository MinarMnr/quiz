import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import questionCreate from "./components/question/Create";
import questionUpdate from "./components/question/Update";
import questionList from "./components/question/List";
import answerCreate from "./components/answer/Create";
// import login from "./components/auth/Login";
import Login from "./components/auth/Login";

function App() {
  const [type, setType] = useState(undefined);
  const [notFound, setNotFound] = useState(true);

  useEffect(() => {
    const authType = JSON.parse(localStorage.getItem("auth")) || [];
    var permission = undefined;
    if (authType.length > 0) {
      permission = authType[0].type;
      setType(permission);
      console.log(type);
      setNotFound(false);
    }
  }, [notFound]);

  return (
    <>
      <Router>
        <Switch>
          {type !== undefined ? (
            <>
              <Route path="/list" exact component={questionList} />

              {type === "admin" && (
                <>
                  <Route
                    path="/question/create"
                    exact
                    component={questionCreate}
                  />
                  <Route
                    path="/question/update/:id"
                    exact
                    component={questionUpdate}
                  />
                </>
              )}
              {type === "user" && (
                <Route
                  path="/answer/create/:qid"
                  exact
                  component={answerCreate}
                />
              )}
            </>
          ) : (
            <Login />
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
