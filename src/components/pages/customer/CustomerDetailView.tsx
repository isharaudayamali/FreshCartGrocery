import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CustomerDetailView.scss";
import {
  deleteCustomerData,
  getCustomerDetail,
} from "../../../services/customer-service";
import type { CustomerDetailsModel } from "../../../models/customer-details-model";
import { BsTrash3 } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function CustomerDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetailsModel>();
  const [error, setError] = useState("");
  const customerId = id ? Number(id) : NaN;
  const invalidIdMessage = !id
    ? "Customer ID is missing."
    : !Number.isInteger(customerId);
  const dateOfBirth = customer?.dob ? dayjs(customer.dob) : null;
  const hasValidDateOfBirth = Boolean(dateOfBirth?.isValid());

  useEffect(() => {
    if (invalidIdMessage) {
      return;
    }

    dayjs.extend(relativeTime);

    getCustomerDetail(customerId)
      .then(setCustomer)
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load customer details.",
        );
      });
  }, [id, customerId, invalidIdMessage]);

  async function deleteCustomer() {
    try {
      await deleteCustomerData(Number(id));
      navigate("/customers");
    } catch (error) {
      console.log(error);
      alert("Failed to delete customer. Please try again.");
    }
  }

  async function updateCustomer(id: number) {
    try {
      navigate(`/customers/${id}/edit`);
    } catch (error) {
      console.log(error);
      alert("Please try again.");
    }
  }

  return (
 <div className="customer-detail-view my-4 d-block">
      {/* 1. Page Header with Title and Timestamp */}
      <div className="w-100 border-bottom mb-3 pb-3 mb-4">
        <h2 className="fw-bold text-primary mb-1">Customer Details</h2>
        {customer && (
          <p className="text-muted small mb-0">
            <span className="mx-2">•</span>
            <span>
              <span className="fw-bold text-secondary me-2">Created:</span>
              {dayjs(customer.createdAt).format("YYYY MMMM DD, hh:mm A")} (
              {dayjs(customer.createdAt).fromNow()})
            </span> <br></br>
            <span className="mx-2">•</span>
            <span>
              <span className="fw-bold text-secondary me-2">Updated:</span>
              {dayjs(customer.updatedAt).format("YYYY MMMM DD, hh:mm A")} (
              {dayjs(customer.updatedAt).fromNow()})
            </span>
          </p>
        )}
      </div>

      {(invalidIdMessage || error) && (
        <div className="alert alert-danger">{invalidIdMessage || error}</div>
      )}
      {!customer && !invalidIdMessage && !error && (
        <p>Loading customer details...</p>
      )}

      {customer && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{customer.id}</td>
              </tr>
              <tr>
                <th scope="row">Name</th>
                <td>{customer.name}</td>
              </tr>
              <tr>
                <th scope="row">Mobile</th>
                <td>{customer.mobile}</td>
              </tr>
              <tr>
                <th scope="row">NIC</th>
                <td>{customer.nic || "-"}</td>
              </tr>
              <tr>
                <th scope="row">Date of Birth</th>
                <td>
                  {hasValidDateOfBirth && dateOfBirth
                    ? `${dateOfBirth.format("YYYY MMMM DD")} (${dayjs().diff(dateOfBirth, "year")} years old)`
                    : "-"}
                </td>
              </tr>
              <tr>
                <th scope="row">Gender</th>
                <td>{customer.gender || "male"}</td>
              </tr>
              <tr>
                <th scope="row">City</th>
                <td>{customer.city || "-"}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{customer.address || "-"}</td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/customers" className="btn btn-outline-secondary">
              Back to Customers
            </Link>
            <div className="d-flex gap-2 align-items-end">
              <button
                className="btn btn-primary me-2"
                onClick={() => updateCustomer(Number(id))}
              >
                Edit
              </button>
              <button
                className="btn btn-danger d-inline-flex gap-1 align-items-center"
                onClick={deleteCustomer}
              >
                <BsTrash3></BsTrash3>Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDetailView;
