import { useState } from "react";
import API from "../../services/api";
import QRCodeModal from "./QRCodeModal";
function QueueList({
  patients,
  refreshPatients,
}) {
  const [selectedPatient, setSelectedPatient] =
    useState(null);
  const [search, setSearch] = useState("");
  // Cancel Patient
  const handleCancel = async (id) => {
    try {
      await API.put(`/patients/${id}`, {
        status: "cancelled",
      });

      refreshPatients();
    } catch (error) {
      console.log(error);
    }
  };
// Mark as Missed
const handleMissed = async (id) => {
  try {
    await API.put(`/patients/${id}`, {
      status: "missed",
    });
    refreshPatients();
  } catch (error) {
    console.log(error);
  }
};
  // Edit Patient
  const handleEdit = async (
    id,
    currentName,
    currentPhone
  ) => {

    const newName = prompt(
      "Enter Patient Name",
      currentName
    );

    if (!newName) return;

    const newPhone = prompt(
      "Enter Phone Number",
      currentPhone
    );

    if (!newPhone) return;

    try {

      await API.put(
        `/patients/edit/${id}`,
        {
          name: newName,
          phone: newPhone,
        }
      );

      refreshPatients();

    } catch (error) {

      console.log(error);

    }

  };
  // WhatsApp
  const handleWhatsApp = (patient) => {
    const patientLink =
      `${window.location.origin}/patient/${patient.token}`;
    const message =
`Hello ${patient.name},

Welcome to Queue Cure.

Your Token Number: T${patient.token}

Track your queue here:

${patientLink}

Thank you.`;

    const whatsappURL =
      `https://wa.me/91${patient.phone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappURL,
      "_blank"
    );

  };
// Rejoin Queue
const handleRejoin = async (id) => {

  try {

    await API.put(
      `/patients/rejoin/${id}`
    );

    refreshPatients();

  } catch (error) {

    console.log(error);

  }

};
  // Search
  const filteredPatients =
    patients.filter((patient) => {

      if (
        patient.status !== "waiting"
      )
        return false;

      return (
        patient.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        patient.token
          .toString()
          .includes(search)
      );

    });

  return (

    <>

      <div className="card">

        <h2>Waiting Queue</h2>

        <br />

        <input
          type="text"
          className="search-box"
          placeholder=" Search by Name or Token"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {filteredPatients.length === 0 ? (

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginTop: "20px",
            }}
          >
            No patient found.
          </p>

        ) : (

          filteredPatients.map(
            (patient) => (

              <div
                key={patient._id}
                className="queue-item"
              >

                <div className="patient-details">

                  <strong>
                    T{patient.token}
                  </strong>

                  <br />

                  {patient.name}

                  <br />

                   {patient.phone}

                </div>

                <div className="patient-actions">

                  <button
                    className="btn qr-btn"
                    onClick={() =>
                      setSelectedPatient(
                        patient
                      )
                    }
                  >
                    Show QR
                  </button>

                  <button
                    className="btn"
                    onClick={() =>
                      handleWhatsApp(
                        patient
                      )
                    }
                  >
                    WhatsApp
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        patient._id,
                        patient.name,
                        patient.phone
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{
                     background: "#f59e0b",
            }}
               onClick={() =>
                handleMissed(
             patient._id
               )
            }
> 
        Missed
        </button>
              <button
                className="cancel-btn"
                onClick={() =>
                handleCancel(
                 patient._id
              )
            }
>
               Cancel
              </button>
                </div>
              </div>
            )
          )

        )}

      </div>

      <QRCodeModal
        patient={selectedPatient}
        onClose={() =>
          setSelectedPatient(null)
        }
      />

    </>

  );

}

export default QueueList;