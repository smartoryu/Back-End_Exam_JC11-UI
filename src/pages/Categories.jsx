/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { API_URL } from "../config/API_URL";

import { PaginationComp } from "../components/Pagination";

function Categories() {
  const Login = useSelector(state => state.auth.login);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const [onEdit, setOnEdit] = useState(-1);
  const [onDelete, setOnDelete] = useState(-1);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await Axios.get(`${API_URL}/cat/page/${currentPage}`);
        setCategories(data.results);
        setMaxPage(data.maxPage);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, [currentPage]);

  const handlePageClick = (e, idx) => {
    e.preventDefault();
    setCurrentPage(idx);
  };

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

  // if (!Login) {
  //   return <Redirect to="/" />;
  // } else if (categories.length === 0) {
  //   return <div>loading</div>
  // }
  return (
    <div className="App">
      <section className="App-container ">
        <h2>
          <code>Categories UI</code>
        </h2>

        <PaginationComp
          currentPage={currentPage}
          pagesCount={maxPage}
          handlePageClick={handlePageClick}
          handlePreviousClick={handlePageClick}
          handleNextClick={handlePageClick}
        />

        <table className="table table-dark table-hover w-50">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, id) => {
              if (onEdit === id) {
                return (
                  <tr className="text-center" key={id}>
                    <td style={{ width: "10%" }}>{(currentPage - 1) * 5 + id + 1}</td>
                    <td style={{ width: "20%" }}>
                      <input defaultValue={cat.name} type="text" className="text-center w-75" />
                    </td>
                    <td style={{ width: "20%" }}>
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
                    <td style={{ width: "20%" }}>{`Are you sure deleting ${cat.name}?`}</td>
                    <td style={{ width: "20%" }}>
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
                    <td style={{ width: "20%" }}>{cat.name}</td>
                    <td style={{ width: "20%" }}>
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

export default Categories;
