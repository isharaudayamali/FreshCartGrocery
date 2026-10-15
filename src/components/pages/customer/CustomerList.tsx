import "./CustomerList.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteCustomerData,
  getCustomersData,
} from "../../../services/customer-service";
import type CustomerDataModel from "../../../models/customer-data-model";
import { getPreviewPageNumbers, type Page } from "../../../models/common-models";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { BsInfoLg, BsPencilSquare, BsTrash3Fill } from "react-icons/bs";

function CustomerList() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNic] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const initialized = useRef(false);
  const [dataPage, setDataPage] = useState<Page<CustomerDataModel>>();
  const navigate = useNavigate();

  const search = useCallback(
    async function search(
      pageNumber: number,
      e: React.SubmitEvent | null = null,
      searchName: string = name,
      searchMobile: string = mobile,
      searchNic: string = nic,
      size: number = pageSize,
    ) {
      if (e) {
        e.preventDefault();
      }

      const page = await getCustomersData(
        pageNumber,
        size,
        searchName,
        searchMobile,
        searchNic,
      );
      setDataPage(page);
    },
    [name, mobile, nic, pageSize],
  );

  async function clear() {
    await setName("");
    await setMobile("");
    await setNic("");
    await setPageSize(10);
    search(0, null, "", "", "", 10);
  }

  async function deleteCustomer(id: number) {
    try {
      await deleteCustomerData(id);
      clear();
    } catch (e) {
      console.log(e);
      alert("Not Success");
    }
  }

  function showCustomerDetail(id: number) {
    navigate(`/customers/${id}`);
  }

  function updateCustomer(id: number) {
    navigate(`/customers/${id}` + "/edit");
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      search(0);
    }
  }, [search]);

  return (
    <div>
      <div>
        <form onSubmit={(e) => search(0, e)}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="searchFieldName"
                  placeholder="Filter By Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label htmlFor="searchFieldName">Filter By Name</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="searchFieldMobile"
                  placeholder="Filter By Mobile"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
                <label htmlFor="searchFieldMobile">Filter By Mobile</label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="searchFieldNic"
                  placeholder="Filter By NIC Number"
                  value={nic}
                  onChange={(e) => {
                    setNic(e.target.value);
                  }}
                />
                <label htmlFor="searchFieldNic">Filter By NIC Number</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Page Size&nbsp;&nbsp;&nbsp;
                </label>

                <div className="d-inline-block">
                  <select
                    className="form-select"
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value));
                    }}
                    defaultValue={pageSize}
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-end gap-3 align-items-start">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clear}
              >
                Clear
              </button>

              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>

        <div className="table-responsive">
          {dataPage && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>NIC Number</th>
                  <th>CITY</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {dataPage.content.map((customer) => {
                  return (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.mobile}</td>
                      <td>{customer.nic}</td>
                      <td>{customer.city}</td>
                      <td>
                        <div className="d-flex gap-3">
                          <button
                            onClick={() => updateCustomer(customer.id)}
                            className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1"
                          >
                            <BsPencilSquare />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                          >
                            <BsTrash3Fill />
                            Delete
                          </button>
                          <button
                            onClick={() => showCustomerDetail(customer.id)}
                            className="btn btn-info btn-sm d-flex align-items-center gap-1"
                          >
                            <BsInfoLg />
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!dataPage && <p>No data found.</p>}
        </div>

        {dataPage && (
          <div className="row">
            <div className="col-md-6">
              <p>
                Showing {dataPage.pageable.offset + 1} to{" "}
                {dataPage.pageable.offset + dataPage.numberOfElements} of{" "}
                {dataPage.totalElements} customers
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className={
                        dataPage.number == 0
                          ? "page-link disabled"
                          : "page-link"
                      }
                      href="#"
                      onClick={() => {
                        search(0);
                      }}
                    >
                      <MdKeyboardDoubleArrowLeft />
                    </a>
                  </li>

                  <li className="page-item">
                    <a
                      className={
                        dataPage.number == 0
                          ? "page-link disabled"
                          : "page-link"
                      }
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        search(dataPage.number - 1);
                      }}
                    >
                      <MdKeyboardArrowLeft />
                    </a>
                  </li>

                  {getPreviewPageNumbers(dataPage, 7).map((n) => {
                    return (
                      <li className="page-item" key={n}>
                        <a
                          className={
                            dataPage.number == n
                              ? "page-link active"
                              : "page-link"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            search(n);
                          }}
                          href="#"
                        >
                          {n + 1}
                        </a>
                      </li>
                    );
                  })}

                  <li className="page-item">
                    <a
                      className={
                        dataPage.number == dataPage.totalPages - 1
                          ? "page-link disabled"
                          : "page-link"
                      }
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        search(dataPage.number + 1);
                      }}
                    >
                      <MdKeyboardArrowRight />
                    </a>
                  </li>

                  <li className="page-item">
                    <a
                      className={
                        dataPage.number == dataPage.totalPages - 1
                          ? "page-link disabled"
                          : "page-link"
                      }
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        search(dataPage.totalPages - 1);
                      }}
                    >
                      <MdKeyboardDoubleArrowRight />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
