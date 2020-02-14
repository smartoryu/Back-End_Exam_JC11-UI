/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { API_URL } from "../config/API_URL";

import { PaginationComp } from "../components/Pagination";

function Movies() {
  const Login = useSelector(state => state.auth.login);
  const [movies, setMovies] = useState([]);

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
    const getMovies = async () => {
      try {
        if (currentPage > 0) {
          const { data } = await Axios.get(`${API_URL}/movie`, { params: { page: currentPage, limit: limitPage } });
          setMovies(data.results);
          setPagesCount(data.pagesCount);
        } else {
          const { data } = await Axios.get(`${API_URL}/movie/search`, {
            params: { search: searchQuery, page: currentSearchPage }
          });
          // console.log(data);
          setCurrentPage(0);
          setMovies(data.results);
          setSearchPagesCount(data.pagesCount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentSearchPage]);

  // ================================================== ON ENTER SEARCH QUERY
  const searchKeyPress = async e => {
    if (e.key === "Enter") {
      try {
        const { data } = await Axios.get(`${API_URL}/movie/search`, {
          params: { search: searchQuery, page: currentSearchPage }
        });
        console.log(data);
        setCurrentPage(0);
        setMovies(data.results);
        setSearchPagesCount(data.pagesCount);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ================================================== GET DATA
  const handlePageClick = (e, idx) => {
    e.preventDefault();
    setCurrentPage(idx);
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
  } else if (movies.length === 0) {
    return <div>loading</div>;
  }
  return (
    <div className="App">
      <section className="App-container">
        <h2>
          <code>Movies UI</code>
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

        <table className="table table-dark table-hover">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, id) => {
              if (onEdit === id) {
                return (
                  <tr className="text-center">
                    <td style={{ width: "10%" }}>{(currentPage - 1) * 5 + id + 1}</td>
                    <td style={{ width: "20%" }}>
                      <input className="text-center w-75" type="text" defaultValue={movie.name} />
                    </td>
                    <td style={{ width: "10%" }}>
                      <input className="text-center w-75" type="text" defaultValue={movie.year} />
                    </td>
                    <td style={{ width: "35%" }}>
                      <input className="text-center w-75" type="text" defaultValue={movie.description} />
                    </td>
                    <td style={{ width: "25%" }}>
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
                    <td style={{ width: "10%" }}>{(currentPage - 1) * 5 + id + 1}</td>
                    <td style={{ width: "20%" }}>{movie.name}</td>
                    <td style={{ width: "10%" }}>{movie.year}</td>
                    <td
                      style={{
                        width: "35%",
                        fontWeight: "bolder",
                        textAlign: "right"
                      }}>{`Are you sure deleting ${movie.name}?`}</td>
                    <td style={{ width: "25%" }}>
                      <button onClick={confirmDelete} className="btn btn-sm btn-danger w-25 mr-3">
                        Yes
                      </button>
                      <button onClick={() => setOnDelete(-1)} className="btn btn-sm btn-primary w-25">
                        No
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr className="text-center" key={id}>
                    <td style={{ width: "10%" }}>{(currentPage - 1) * 5 + id + 1}</td>
                    <td style={{ width: "20%" }}>{movie.name}</td>
                    <td style={{ width: "10%" }}>{movie.year}</td>
                    <td style={{ width: "35%" }}>{movie.description}</td>
                    <td style={{ width: "25%" }}>
                      <button onClick={() => btnEdit(id)} className="btn btn-sm btn-primary w-25 mr-3">
                        Edit
                      </button>
                      <button onClick={() => btnDelete(id)} className="btn btn-sm btn-danger w-25">
                        Delete
                      </button>
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

export default Movies;
