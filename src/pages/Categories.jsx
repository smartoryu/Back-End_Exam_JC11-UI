/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import { API_URL } from "../config/API_URL";

import { PaginationComp } from "../components/Pagination";

function Categories() {
  const Login = useSelector(state => state.auth.login);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [searchPagesCount, setSearchPagesCount] = useState(0);

  const [onEdit, setOnEdit] = useState(-1);
  const [onDelete, setOnDelete] = useState(-1);

  const [searchQuery, setSearchQuery] = useState("");

  // ================================================== GET DATA
  useEffect(() => {
    const getCategories = async () => {
      try {
        if (currentPage > 0) {
          const { data } = await Axios.get(`${API_URL}/cat`, { params: { page: currentPage, limit: limitPage } });
          setCategories(data.results);
          setPagesCount(data.pagesCount);
        } else {
          const { data } = await Axios.get(`${API_URL}/cat/search`, {
            params: { search: searchQuery, page: currentSearchPage }
          });
          // console.log(data);
          setCurrentPage(0);
          setCategories(data.results);
          setSearchPagesCount(data.pagesCount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentSearchPage]);

  // ================================================== ON ENTER SEARCH QUERY
  const searchKeyPress = async e => {
    if (e.key === "Enter") {
      try {
        const { data } = await Axios.get(`${API_URL}/cat/search`, {
          params: { search: searchQuery, page: currentSearchPage }
        });
        console.log(data);
        setCurrentPage(0);
        setCategories(data.results);
        setSearchPagesCount(data.pagesCount);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ================================================== ON CLICK PAGINATION
  const handlePageClick = (e, idx) => {
    e.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(idx);
    } else {
      setCurrentSearchPage(idx);
    }
  };

  // ================================================== CONST HANDLE SEARCH
  const btnDelete = id => {
    toast.warn("Are you sure?", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnDelete(id)
      // onClose: () => {}
    });
  };

  const confirmDelete = () => {
    toast.error("Delete!", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnDelete(-1)
    });
  };

  const btnEdit = id => {
    toast(<span className="font-weight-bold text-dark">Edit</span>, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnEdit(id)
      // onClose: () => {}
    });
  };

  const btnSave = () => {
    toast.info(<span className="font-weight-bold text-dark">Save</span>, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnEdit(false)
      // onClose: () => {}
    });
  };

  const btnCancel = () => {
    toast.warn(<span className="font-weight-bold text-dark">Cancel</span>, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
      closeButton: false,
      onOpen: () => setOnEdit(false)
      // onClose: () => {}
    });
  };

  if (!Login) {
    return <Redirect to="/" />;
  } else if (categories.length === 0) {
    return <div>loading</div>;
  }
  return (
    <div className="App">
      <section className="App-container ">
        <h2>
          <code>Categories UI</code>
        </h2>

        <PaginationComp
          className="mt-5"
          currentPage={currentPage}
          totalPages={pagesCount}
          pageNeighbours={1}
          handlePageClick={handlePageClick}
          handlePreviousClick={handlePageClick}
          handleNextClick={handlePageClick}
        />

        <div className="mb-3 w-25">
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">Search:</InputGroupAddon>
            <Input type="text" onKeyPress={searchKeyPress} onChange={e => setSearchQuery(e.target.value)} />
          </InputGroup>
        </div>

        <table className="table table-dark table-hover w-50">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery
              ? categories.map((cat, id) => {
                  if (onEdit === id) {
                    return (
                      <tr className="text-center" key={"search" + id}>
                        <td key={"id" + id} style={{ width: "10%" }}>
                          {(currentSearchPage - 1) * limitPage + id + 1}
                        </td>
                        <td key={"name" + id} style={{ width: "20%" }}>
                          <input defaultValue={cat.name} type="text" className="text-center w-75" />
                        </td>
                        <td key={"act" + id} style={{ width: "20%" }}>
                          <button onClick={btnCancel} className="btn btn-sm btn-warning w-25 mr-3">
                            Cancel
                          </button>
                          <button onClick={btnSave} className="btn btn-sm btn-success w-25">
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  } else if (onDelete === id) {
                    return (
                      <tr className="text-center" key={id}>
                        <td key={"id" + id} style={{ width: "10%" }}>
                          {(currentSearchPage - 1) * limitPage + id + 1}
                        </td>
                        <td key={"name" + id} style={{ width: "20%" }}>{`Are you sure deleting ${cat.name}?`}</td>
                        <td key={"act" + id} style={{ width: "20%" }}>
                          <button onClick={confirmDelete} className="btn btn-sm btn-danger w-25 mr-3">
                            Yes
                          </button>
                          <button onClick={() => setOnDelete(-1)} className="btn btn-sm btn-primary w-25">
                            No
                          </button>
                        </td>
                      </tr>
                    );
                  } else if (categories.length > 0) {
                    return (
                      <tr className="text-center" key={id}>
                        <td key={"id" + id} style={{ width: "10%" }}>
                          {(currentSearchPage - 1) * limitPage + id + 1}
                        </td>
                        <td key={"name" + id} style={{ width: "20%" }}>
                          {cat.name}
                        </td>
                        <td key={"act" + id} style={{ width: "20%" }}>
                          <button onClick={() => btnEdit(id)} className="btn btn-sm btn-primary w-25 mr-3">
                            Edit
                          </button>
                          <button onClick={() => btnDelete(id)} className="btn btn-sm btn-danger w-25">
                            Delete
                          </button>
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
              : categories.map((cat, id) => {
                  if (onEdit === id) {
                    return (
                      <tr className="text-center" key={"cat" + id}>
                        <td key={"id" + id} style={{ width: "10%" }}>
                          {(currentPage - 1) * limitPage + id + 1}
                        </td>
                        <td key={"name" + id} style={{ width: "20%" }}>
                          <input defaultValue={cat.name} type="text" className="text-center w-75" />
                        </td>
                        <td key={"act" + id} style={{ width: "20%" }}>
                          <button onClick={btnCancel} className="btn btn-sm btn-warning w-25 mr-3">
                            Cancel
                          </button>
                          <button onClick={btnSave} className="btn btn-sm btn-success w-25">
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  } else if (onDelete === id) {
                    return (
                      <tr className="text-center" key={id}>
                        <td key={"id" + id} style={{ width: "10%" }}>
                          {(currentPage - 1) * limitPage + id + 1}
                        </td>
                        <td key={"name" + id} style={{ width: "20%" }}>{`Are you sure deleting ${cat.name}?`}</td>
                        <td key={"act" + id} style={{ width: "20%" }}>
                          <button onClick={confirmDelete} className="btn btn-sm btn-danger w-25 mr-3">
                            Yes
                          </button>
                          <button onClick={() => setOnDelete(-1)} className="btn btn-sm btn-primary w-25">
                            No
                          </button>
                        </td>
                      </tr>
                    );
                  } else if (categories.length > 0) {
                    return (
                      <tr className="text-center" key={id}>
                        <td key={"id" + id} style={{ width: "10%" }}>
                          {(currentPage - 1) * limitPage + id + 1}
                        </td>
                        <td key={"name" + id} style={{ width: "20%" }}>
                          {cat.name}
                        </td>
                        <td key={"act" + id} style={{ width: "20%" }}>
                          <button onClick={() => btnEdit(id)} className="btn btn-sm btn-primary w-25 mr-3">
                            Edit
                          </button>
                          <button onClick={() => btnDelete(id)} className="btn btn-sm btn-danger w-25">
                            Delete
                          </button>
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
                })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Categories;
