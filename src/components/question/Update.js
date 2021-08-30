import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Form,
  Button,
  Message,
  Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

const Update = (props) => {
  const [question, setQuestion] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [qId] = useState(Number(props.match.params.id));
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
      setStatus(questionDetails[0].status);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [notFound]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
      let qList = [];
      qList = JSON.parse(localStorage.getItem("qList"));
      let newQlist = qList.filter((ele) => {
        return ele.id !== qId;
      });
      newQlist.push(questionData);
      localStorage.setItem("qList", JSON.stringify(newQlist));

      setFormSubmit(true);
      setVisible(true);
      setMessage("Question updated in localstorage successfully!");
      setQuestion("");
    }
  };

  const handleQuestionChange = (value) => {
    setQuestion(value);
  };
  const handleDismiss = () => {
    setVisible(false);
  };

  const handleStatusChange = (event, { value }) => {
    setStatus(value);
  };

  const statusOptions = [
    {
      key: "1",
      text: "Active",
      value: true,
    },
    {
      key: "2",
      text: "Inactive",
      value: false,
    },
  ];

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <h3>
                Question Update
                <Button floated="right">
                  <Link to="/list">Question List</Link>
                </Button>
              </h3>
            </Grid.Column>
          </Grid.Row>
          {!notFound && data !== undefined && status !== undefined ? (
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
                    {/* <input
                      id="question"
                      type="text"
                      value={question}
                      required
                      placeholder="Write down you question...."
                      onChange={handleQuestionChange}
                    /> */}
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

                  <Form.Field>
                    <p>Status: </p>
                    <Dropdown
                      placeholder="Select Status"
                      id="status"
                      fluid
                      selection
                      onChange={handleStatusChange}
                      defaultValue={status}
                      options={statusOptions}
                      value={statusOptions.value}
                    />
                  </Form.Field>

                  <Button type="submit" value="submit">
                    Update
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row centered>
              <Grid.Column width={8}>
                <p>No Data Found</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Update;
