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

  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      const qList = JSON.parse(localStorage.getItem("qList")) || [];
      setDatas(qList);
      setLoading(false);
    };

    fetchDatas();
  }, []);

  // Get current datas
  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSerial(datasPerPage * pageNumber - datasPerPage + 1);
  };

  return (
    <div className="container mt-5">
      <Container textAlign="center">
        <h1 className="text-primary text-center mb-3 center">Question List</h1>
      </Container>
      <Container>
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
      />
    </div>
  );
};

export default List;
