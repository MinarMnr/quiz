import React, { useState } from "react";
import { Container, Grid, Form, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

const Create = () => {
  const [question, setQuestion] = useState(undefined);
  const [status] = useState(true);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const min = 1;
    const max = 100000;
    const rand = min + Math.random() * (max - min);
    const qId = Math.round(rand);

    if (question === undefined || question === "") {
      setFormSubmit(false);
      setVisible(true);
      setMessage("Question is required!");
    } else {
      let questionData = {
        id: qId,
        question,
        status,
      };

      var qList = [];
      qList = JSON.parse(localStorage.getItem("qList")) || [];
      qList.push(questionData);
      localStorage.setItem("qList", JSON.stringify(qList));

      setFormSubmit(true);
      setVisible(true);
      setMessage("Question saved in localstorage successfully!");
      setQuestion("");
    }
  };

  const handleQuestionChange = (value) => {
    setQuestion(value);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <h1>
                Question Create
                <Button floated="right">
                  <Link to="/">Question List</Link>
                </Button>
              </h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <Grid.Column width={8}>
              {visible && formSubmit && message != null && (
                <Message onDismiss={handleDismiss} positive header={message} />
              )}
              {visible && !formSubmit && message != null && (
                <Message onDismiss={handleDismiss} negative header={message} />
              )}

              <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                  <p>Question </p>
                  <ReactQuill
                    id="question"
                    type="text"
                    theme="snow"
                    required
                    placeholder="Write down your question...."
                    value={question}
                    onChange={handleQuestionChange}
                  />
                </Form.Field>

                <Button type="submit" value="submit">
                  Create
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Create;
