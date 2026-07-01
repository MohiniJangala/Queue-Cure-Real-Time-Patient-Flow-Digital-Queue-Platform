import { useState } from "react";
import API from "../../services/api";

function AddPatientForm({ refreshPatients }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {

    if (!name.trim() || !phone.trim()) {
      alert("Please enter patient name and phone number");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {

      await API.post("/patients", {
        name,
        phone,
      });

      setName("");
      setPhone("");

      refreshPatients();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="card">

      <h2>Add Patient</h2>

      <br />

      <input
        type="text"
        className="input"
        placeholder="Enter Patient Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="tel"
        className="input"
        placeholder="Enter Phone Number"
        value={phone}
        maxLength={10}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <br />
      <br />

      <button
        className="btn"
        onClick={handleSubmit}
      >
        Add Patient
      </button>

    </div>

  );

}

export default AddPatientForm;
