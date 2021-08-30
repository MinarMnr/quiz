import React from "react";
import { Icon, Menu, Table, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Show = ({
  datas,
  loading,
  datasPerPage,
  totalDatas,
  paginate,
  serial,
  type,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDatas / datasPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <Container textAlign="center">
        <h2>Loading...</h2>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <Table celled size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Serial No</Table.HeaderCell>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {datas.map((data) => (
              <Table.Row key={data.id}>
                <Table.Cell>{serial++}</Table.Cell>
                <Table.Cell>
                  {data.question.replace(/<\/?[^>]+(>|$)/g, "")}
                </Table.Cell>
                <Table.Cell>{data.status ? "Active" : "Inactive"}</Table.Cell>
                <Table.Cell>
                  {type === "admin" && (
                    <Button>
                      <Link to={`/question/update/${data.id}`}>Update</Link>
                    </Button>
                  )}
                  {type === "user" && data.status && (
                    <Button>
                      <Link to={`/answer/create/${data.id}`}>Answer</Link>
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                  <Menu.Item icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  {pageNumbers.map((number) => (
                    <Menu.Item onClick={() => paginate(number)} key={number}>
                      {number}
                    </Menu.Item>
                  ))}
                  <Menu.Item icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </React.Fragment>
  );
};

export default Show;
