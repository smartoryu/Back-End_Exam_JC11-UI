/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col, InputGroup, InputGroupAddon, Input } from "reactstrap";

import { API_URL } from "../config/API_URL";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PaginationComp } from "../components/Pagination";

function Categories() {
  const dispatch = useDispatch();
  const { Login, DataCategory, SortedCategory, Loading, TotalPages } = useSelector(({ auth, cat }) => {
    return {
      Login: auth.login,
      DataCategory: cat.dataCategory,
      SortedCategory: cat.sortedCategory,
      Loading: cat.loading,
      TotalPages: cat.pagesCount,
    };
  });

  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  // const [pagesCount, setPagesCount] = useState(0);
  const [searchPagesCount, setSearchPagesCount] = useState(0);

  const [sortId, setSortId] = useState("asc");
  const [sortCat, setSortCat] = useState(undefined);

  const [onEdit, setOnEdit] = useState(-1);
  const [onDelete, setOnDelete] = useState(-1);

  const [searchQuery, setSearchQuery] = useState("");
  const startIndex = (currentPage - 1) * limitPage;

  useEffect(() => {
    // setPagesCount(Math.ceil(DataCategory.length / limitPage));
  }, [DataCategory, limitPage]);

  // ================================================== BUTTON FUNCTION
  const btnDelete = (id, name) => {
    setOnEdit(-1);
    toast.warn(`Are you sure deleting ${name}?`, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 2000,
      closeButton: false,
      onOpen: () => setOnDelete(id),
      // onClose: () => {}
    });
  };
  const confirmDelete = () => {
    toast.error("Delete!", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnDelete(-1),
    });
  };
  const btnEdit = (id, name) => {
    setOnDelete(-1);
    toast(<span className="font-weight-bold text-dark">{`Edit ${name}`}</span>, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnEdit(id),
      // onClose: () => {}
    });
  };
  const btnSave = () => {
    toast.info(<span className="font-weight-bold text-dark">Save</span>, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnEdit(false),
      // onClose: () => {}
    });
  };
  const btnCancel = () => {
    toast.warn(<span className="font-weight-bold text-dark">Cancel</span>, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnEdit(false),
      // onClose: () => {}
    });
  };

  // ================================================== ON CLICK SORT

  function compareValue(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "asc" ? comparison : comparison * -1;
    };
  }

  function handleSorting(key, order) {
    setCurrentPage(1);
    if (key === "id") {
      setSortCat(undefined);
      setSortId(order);
    } else {
      setSortId(undefined);
      setSortCat(order);
    }
    return DataCategory.sort(compareValue(key, order));
  }

  // ================================================== ON ENTER SEARCH QUERY
  const searchKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const { data } = await Axios.get(`${API_URL}/cat/search`, {
          params: { search: searchQuery, page: currentSearchPage },
        });
        console.log(data);
        setCurrentPage(0);
        // setPagesCount(0);
        setSearchPagesCount(data.pagesCount);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ================================================== ON CLICK PAGINATION
  const handlePageClick = (e, page) => {
    e.preventDefault();
    if (TotalPages > 0) {
      setCurrentPage(page);
    } else {
      setCurrentPage(0);
      setCurrentSearchPage(page);
    }
  };

  if (Loading) {
    return <div>loading</div>;
  } else {
    if (!Login) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="App">
          <section className="App-container">
            <div className="my-3 w-25">
              <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">Search:</InputGroupAddon>
                <Input type="text" onKeyPress={searchKeyPress} onChange={(e) => setSearchQuery(e.target.value)} />
              </InputGroup>
            </div>

            <Container>
              <Row>
                <Col sm="1" />
                <Col sm="10">
                  <table className="table table-dark table-hover w-100">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">
                          {sortId === "asc" ? (
                            <button className="btn w-100 text-light" onClick={() => handleSorting("id", "desc")}>
                              <strong>#</strong>
                              <span className="float-right">{<FaChevronDown />}</span>
                            </button>
                          ) : sortId === "desc" ? (
                            <button className="btn w-100 text-light " onClick={() => handleSorting("id", "asc")}>
                              <strong>#</strong>
                              <span className="float-right">{<FaChevronUp />}</span>
                            </button>
                          ) : (
                            <button className="btn w-100 text-light " onClick={() => handleSorting("id", "asc")}>
                              #
                            </button>
                          )}
                        </th>
                        <th scope="col">
                          {sortCat === "asc" ? (
                            <button className="btn w-100 text-light " onClick={() => handleSorting("name", "desc")}>
                              <strong>Category Name</strong>
                              <span className="float-right">{<FaChevronDown />}</span>
                            </button>
                          ) : sortCat === "desc" ? (
                            <button className="btn w-100 text-light " onClick={() => handleSorting("name", "asc")}>
                              <strong>Category Name</strong>
                              <span className="float-right">{<FaChevronUp />}</span>
                            </button>
                          ) : (
                            <button className="btn w-100 text-light " onClick={() => handleSorting("name", "asc")}>
                              Category Name
                            </button>
                          )}
                        </th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Loading ? (
                        <tr>
                          <td colSpan="3">Loading</td>
                        </tr>
                      ) : (
                        DataCategory.filter((_, id) => id >= startIndex && id < startIndex + limitPage).map((cat, id) => {
                          if (onEdit === id) {
                            return (
                              <tr className="text-center" key={"search" + id}>
                                <td key={"id" + id} style={{ width: "20%" }}>
                                  {cat.id}
                                </td>
                                <td key={"name" + id} style={{ width: "50%" }}>
                                  <input defaultValue={cat.name} type="text" className="text-center" />
                                </td>
                                <td key={"act" + id} style={{ width: "30%" }}>
                                  <div className="d-flex flex-wrap justify-content-center">
                                    <button onClick={btnCancel} style={{ width: 75 }} className="btn btn-sm btn-warning m-1">
                                      Cancel
                                    </button>
                                    <button onClick={btnSave} style={{ width: 75 }} className="btn btn-sm btn-success m-1">
                                      Save
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          } else if (onDelete === id) {
                            return (
                              <tr className="text-center" key={id}>
                                <td key={"id" + id} style={{ width: "20%" }}>
                                  {cat.id}
                                </td>
                                <td key={"name" + id} style={{ width: "50%" }}>
                                  <div
                                    style={{
                                      backgroundColor: "#f7f7f7",
                                      color: "black",
                                      padding: 5,
                                      borderRadius: 15,
                                    }}>{`Are you sure deleting ${cat.name}?`}</div>
                                </td>
                                <td key={"act" + id} style={{ width: "30%" }}>
                                  <div className="d-flex flex-wrap justify-content-center">
                                    <button onClick={confirmDelete} style={{ width: 75 }} className="btn btn-sm btn-danger m-1">
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => setOnDelete(-1)}
                                      style={{ width: 75 }}
                                      className="btn btn-sm btn-primary m-1">
                                      No
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          } else if (DataCategory.length > 0) {
                            return (
                              <tr className="text-center" key={id}>
                                <td key={"id" + id} style={{ width: "20%" }}>
                                  {cat.id}
                                </td>
                                <td key={"name" + id} style={{ width: "50%" }}>
                                  {cat.name}
                                </td>
                                <td key={"act" + id} style={{ width: "30%" }}>
                                  <div className="d-flex flex-wrap justify-content-center">
                                    <button
                                      onClick={() => btnEdit(id, cat.name)}
                                      style={{ width: 75 }}
                                      className="btn btn-sm btn-primary m-1">
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => btnDelete(id, cat.name)}
                                      style={{ width: 75 }}
                                      className="btn btn-sm btn-danger m-1">
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          } else {
                            return (
                              <tr className="text-center" key={id}>
                                <td key={"id" + id} style={{ width: "100%" }}>
                                  Categories not found!
                                </td>
                              </tr>
                            );
                          }
                        })
                      )}
                    </tbody>
                  </table>
                </Col>
                <Col sm="1" />
              </Row>
            </Container>

            <div className="d-flex mx-auto mb-0">
              <PaginationComp
                className="mt-5"
                currentPage={currentPage}
                totalPages={TotalPages}
                pageNeighbours={1}
                handlePageClick={handlePageClick}
                handlePreviousClick={handlePageClick}
                handleNextClick={handlePageClick}
              />
            </div>
          </section>
        </div>
      );
    }
  }
}

export default Categories;
