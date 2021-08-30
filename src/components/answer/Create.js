import React, { useState, useEffect } from "react";
import { Container, Grid, Form, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

const Update = (props) => {
  const [question, setQuestion] = useState(undefined);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [qId] = useState(Number(props.match.params.qid));
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(true);

  useEffect(() => {
    var questionDetails;
    const qList = JSON.parse(localStorage.getItem("qList")) || [];
    if (qList.length > 0) {
      questionDetails = qList.filter((ele) => {
        return ele.id === qId;
      });
      setData(questionDetails[0]);
      setQuestion(questionDetails[0].question);
      questionDetails[0].answer !== undefined &&
        setAnswer(questionDetails[0].answer);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
    console.log(data);
    console.log(notFound);
  }, [notFound]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (answer === undefined || answer === "") {
      setFormSubmit(false);
      setVisible(true);
      setMessage("Answer is required!");
    } else {
      let answerData = {
        id: qId,
        question,
        answer,
        status: true,
      };
      let aList = [];
      aList = JSON.parse(localStorage.getItem("qList"));
      let newQlist = aList.filter((ele) => {
        return ele.id !== qId;
      });
      newQlist.push(answerData);
      localStorage.setItem("qList", JSON.stringify(newQlist));

      setFormSubmit(true);
      setVisible(true);
      setMessage("Answer added in localstorage successfully!");
    }
  };

  const handleAnswerChange = (value) => {
    setAnswer(value);
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
              <h3>
                Answer
                <Button floated="right">
                  <Link to="/">Question List</Link>
                </Button>
              </h3>
            </Grid.Column>
          </Grid.Row>
          {!notFound && data !== undefined && question !== undefined ? (
            <Grid.Row centered>
              <Grid.Column width={8}>
                {visible && formSubmit && message != null && (
                  <Message
                    onDismiss={handleDismiss}
                    positive
                    header={message}
                  />
                )}
                {visible && !formSubmit && message != null && (
                  <Message
                    onDismiss={handleDismiss}
                    negative
                    header={message}
                  />
                )}

                <Form onSubmit={handleFormSubmit}>
                  <Form.Field>
                    <p>Question </p>
                    <ReactQuill
                      id="question"
                      type="text"
                      readOnly
                      value={question}
                    />
                  </Form.Field>
                  <Form.Field>
                    <p>Answer </p>
                    <ReactQuill
                      id="answer"
                      type="text"
                      theme="snow"
                      required
                      placeholder="Write down your answer...."
                      value={answer}
                      onChange={handleAnswerChange}
                    />
                  </Form.Field>

                  <Button type="submit" value="submit">
                    Answer
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row centered>
              <Grid.Column width={8}>
                <p>No Question Found</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Update;
