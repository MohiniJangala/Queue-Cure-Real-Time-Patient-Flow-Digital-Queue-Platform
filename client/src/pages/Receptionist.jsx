import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { FaHospital } from "react-icons/fa";

import API from "../services/api";
import socket from "../services/socket";

import AddPatientForm from "../components/receptionist/AddPatientForm";
import QueueList from "../components/receptionist/QueueList";
import CurrentTokenCard from "../components/receptionist/CurrentTokenCard";
import CallNextButton from "../components/receptionist/CallNextButton";
import StatsCard from "../components/receptionist/StatsCard";
import ResetQueueButton from "../components/receptionist/ResetQueueButton";

function Receptionist() {

  const [patients, setPatients] = useState([]);

  const [dashboard, setDashboard] = useState({
    currentToken: 0,
    waitingPatients: 0,
    completedPatients: 0,
    avgConsultationTime: 0,
  });

  // Fetch Patients

  const fetchPatients = useCallback(async () => {
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch Dashboard

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Refresh Dashboard

  const refreshDashboard = useCallback(async () => {
    await fetchPatients();
    await fetchDashboard();
  }, [fetchPatients, fetchDashboard]);

  // Initial Load

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  // Socket.IO

  useEffect(() => {

    socket.on("connect", () => {
      console.log(
        "✅ Socket Connected:",
        socket.id
      );
    });

    socket.on("queueUpdated", () => {
      console.log(
        "🔄 Queue Updated"
      );

      refreshDashboard();
    });

    socket.on("disconnect", () => {
      console.log(
        "❌ Socket Disconnected"
      );
    });

    return () => {
      socket.off("connect");
      socket.off("queueUpdated");
      socket.off("disconnect");
    };

  }, [refreshDashboard]);

  return (

    <div className="dashboard">

      {/* Dashboard Header */}

      <div className="dashboard-header">

        <FaHospital
          size={40}
          color="#2563eb"
        />

        <div>

          <h1 className="title">
            Queue Cure
          </h1>

          <p className="subtitle">
            Smart Digital Queue Management System
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <StatsCard
          title="Waiting Patients"
          value={dashboard.waitingPatients}
        />

        <StatsCard
          title="Completed"
          value={dashboard.completedPatients}
        />

        <StatsCard
          title="Average Time"
          value={`${dashboard.avgConsultationTime} min`}
        />

      </div>

      {/* Current Token */}

      <CurrentTokenCard
        currentToken={dashboard.currentToken}
      />

      {/* Receptionist Controls */}

      <div className="card">

        <h2>
          Receptionist Controls
        </h2>

        <br />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >

          <CallNextButton
            refreshDashboard={refreshDashboard}
          />

          <ResetQueueButton
            refreshDashboard={refreshDashboard}
          />

        </div>

      </div>

      {/* Add Patient */}

      <AddPatientForm
        refreshPatients={refreshDashboard}
      />

      {/* Queue */}

      <QueueList
        patients={patients}
        refreshPatients={refreshDashboard}
      />

    </div>

  );
}

export default Receptionist;
