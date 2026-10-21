import { useState } from "react";
import "./CustomerForm.scss";
import type CustomerInsertModel from "../../../models/customer-insert-model";
import { insertCustomer } from "../../../services/customer-service";

function CustomerForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [NIC, setNIC] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
      const data = await insertCustomer(customer);
      alert("Customer added successfully with ID: " + data?.id);
      clearForm();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  }

  function clearForm() {
    setName("");
    setMobile("");
    setNIC("");
    setDateOfBirth("");
    setGender("");
    setCity("");
    setAddress("");
  }

  return (
    <div className="customer-form">
      <h1>Customer Form</h1>
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
                    value="Male"
                    checked={gender === "Male"}
                    onChange={() => setGender("Male")}
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
                    value="Female"
                    checked={gender === "Female"}
                    onChange={() => setGender("Female")}
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
                placeholder="Address"
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

        <div className="d-flex justify-content-end gap-4">
          <div className="form-actions">
            <button type="button" onClick={clearForm} className="btn btn-outline-secondary">
              Clear
            </button>
            <button type="submit" className="btn btn-outline-primary">
              Add to customer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;