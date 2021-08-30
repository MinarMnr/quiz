import React, { useState, useEffect } from "react";
import Show from "./Show";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const List = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [datasPerPage] = useState(10);
  const [serial, setSerial] = useState(1);
  const [authType, setAuthType] = useState(undefined);

  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      const qList = JSON.parse(localStorage.getItem("qList")) || [];
      const type = JSON.parse(localStorage.getItem("auth")) || [];
      setAuthType(type[0].type);
      console.log(authType);
      setDatas(qList);
      setLoading(false);
    };

    fetchDatas();
  }, [authType]);

  // Get current datas
  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSerial(datasPerPage * pageNumber - datasPerPage + 1);
  };

  const clickLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <Container textAlign="center">
        <h1 className="text-primary text-center mb-3 center">Question List</h1>
      </Container>
      <Container>
        <Button
          floated="right"
          color="orange"
          style={{ cursor: "pointer" }}
          title="Log out"
          onClick={clickLogout}
        >
          <Link to="/">LOGOUT</Link>
        </Button>
        <Button floated="right">
          <Link to="/question/create">Question Create</Link>
        </Button>
      </Container>
      <Show
        datas={currentDatas}
        loading={loading}
        datasPerPage={datasPerPage}
        totalDatas={datas.length}
        paginate={paginate}
        serial={serial}
        type={authType}
      />
    </div>
  );
};

export default List;
