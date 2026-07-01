import {
  useState,
  useEffect,
  useCallback,
} from "react";

import { useParams } from "react-router-dom";

import {
  FaHospital,
  FaUserMd,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import API from "../services/api";
import socket from "../services/socket";

function Patient() {

  const { token } = useParams();

  const [patient, setPatient] = useState({
    patientName: "",
    patientToken: token,
    currentToken: 0,
    patientsAhead: 0,
    estimatedWait: 0,
    status: "",
  });

  const fetchPatientStatus = useCallback(async () => {

    try {

      const res = await API.get(
        `/patients/status/${token}`
      );

      setPatient(res.data);

    } catch (error) {
      console.log(error);
    }

  }, [token]);

  useEffect(() => {
    fetchPatientStatus();
  }, [fetchPatientStatus]);

  useEffect(() => {

    socket.on("queueUpdated", () => {
      fetchPatientStatus();
    });

    return () => {
      socket.off("queueUpdated");
    };

  }, [fetchPatientStatus]);

  // ==========================
  // Patient Status
  // ==========================

  let statusText = "";
  let statusColor = "#2563eb";

  if (patient.status === "completed") {

    statusText = "Consultation Completed";
    statusColor = "#16a34a";

  }

  else if (
    patient.status === "in_consultation"
  ) {

    statusText =
      "You are Currently in Consultation";

    statusColor = "#2563eb";

  }

  else if (
    patient.currentToken <
    patient.patientToken
  ) {

    statusText = "Waiting";

    statusColor = "#f59e0b";

  }

  else if (
    patient.currentToken ===
    patient.patientToken
  ) {

    statusText = "It's Your Turn";

    statusColor = "#16a34a";

  }

  else {

    statusText =
      "Token Missed - Contact Reception";

    statusColor = "#dc2626";

  }

  return (

    <div className="patient-container">

      <div className="patient-card">

        <FaHospital
          size={45}
          color="#2563eb"
        />

        <h1>
          Queue Cure
        </h1>

        <p>
          Live Patient Queue
        </p>

        <br />

        <div className="patient-info">

          <FaUserMd color="#2563eb" />

          <span>
            Your Name :
          </span>

          {patient.patientName}

        </div>

        <div className="patient-info">

          <FaUsers color="#2563eb" />

          <span>
            Your Token :
          </span>

          T{patient.patientToken}

        </div>

        <div className="patient-info">

          <FaCheckCircle color="#16a34a" />

          <span>
            Now Serving :
          </span>

          T{patient.currentToken}

        </div>

        <div className="patient-info">

          <FaUsers color="#f59e0b" />

          <span>
            Patients Ahead :
          </span>

          {patient.patientsAhead}

        </div>

        <div className="patient-info">

          <FaClock color="#ec4899" />

          <span>
            Estimated Wait :
          </span>

          {patient.estimatedWait} mins

        </div>

        <br />

        <div
          style={{
            background: statusColor,
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >

          <FaExclamationTriangle />

          {"  "}

          {statusText}

        </div>

      </div>

    </div>

  );

}

export default Patient;
