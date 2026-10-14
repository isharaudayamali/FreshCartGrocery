import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CustomerEditForm.scss";
import type CustomerInsertModel from "../../../models/customer-insert-model";
import { getCustomerDetail, updateCustomer } from "../../../services/customer-service";
import type { CustomerDetailsModel } from "../../../models/customer-details-model";

function CustomerEditForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerDetailsModel | null>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [NIC, setNIC] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const customerId = id ? Number(id) : NaN;

    async function loadCustomer() {
      try {
        const data = await getCustomerDetail(customerId);
        setName(data.name ?? "");
        setMobile(data.mobile ?? "");
        setNIC(data.nic ?? "");
        setDateOfBirth(data.dateOfBirth ?? data.dob ?? "");
        setGender(data.gender ?? "");
        setCity(data.city ?? "");
        setAddress(data.address ?? "");
        setCustomer(data);
      } catch (error) {
        console.error("Error loading customer details:", error);
      }
    }

    void loadCustomer();
  }, [id]);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!id) {
      console.error("Customer ID is missing.");
      return;
    }

    const customer: CustomerInsertModel = {
      name,
      mobile,
      nic: NIC || undefined,
      dob: dateOfBirth || undefined,
      gender: gender || undefined,
      city: city || undefined,
      address: address || undefined,
    };

    try {
      await updateCustomer(Number(id), customer);
      alert("Customer updated successfully.");
      navigate(`/customers/${id}`);
    } catch (requestError) {
      console.error("Error updating customer:", requestError);
      alert("Failed to update customer. Please try again.");
    }
  }

  if (!id || isNaN(Number(id))) {
    return <div className="container mt-4">Error: Invalid customer ID</div>;
  }

  function resetForm() {
    if (customer) {
    
    setName(customer?.name ?? "");
    setMobile(customer?.mobile ?? "");
    setNIC(customer?.nic ?? "");
    setDateOfBirth(customer?.dateOfBirth ?? customer?.dob ?? "");
    setGender(customer?.gender ?? "");
    setCity(customer?.city ?? "");
    setAddress(customer?.address ?? "");
    }
  }

  return (
    <div className="customer-form container">
      <h1>Edit Customer of {customer?.name}</h1>

        <form onSubmit={submitForm}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3 form-floating">
                <input
                  id="nameInput"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="nameInput">Name:</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3 form-floating">
                <input
                  id="mobile"
                  type="tel"
                  className="form-control"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <label htmlFor="mobile">Mobile:</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3 form-floating">
                <input
                  id="NIC"
                  type="text"
                  className="form-control"
                  placeholder="NIC"
                  value={NIC}
                  onChange={(e) => setNIC(e.target.value)}
                />
                <label htmlFor="NIC">NIC:</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3 form-floating">
                <input
                  id="dateOfBirth"
                  type="date"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <label htmlFor="dateOfBirth">Date of Birth:</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender:</label>
                <div>
                  <div className="form-check">
                    <input
                      id="genderMaleRadio"
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                    />
                    <label className="form-check-label" htmlFor="genderMaleRadio">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="genderFemaleRadio"
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                    />
                    <label className="form-check-label" htmlFor="genderFemaleRadio">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3 form-floating">
                <input
                  id="city"
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="city">City:</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="mb-3 form-floating">
                <input
                  id="address"
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="address">Address:</label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                resetForm();
              }}
            >
              Reset Default
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>);
}

export default CustomerEditForm;
