import API from "../../services/api";

function ResetQueueButton({
  refreshDashboard,
}) {

  const handleReset = async () => {

    const confirmReset = window.confirm(
      "Are you sure?\n\nThis will delete all patients and restart the queue from Token 1."
    );

    if (!confirmReset) return;

    try {

      await API.delete("/queue/reset");

      refreshDashboard();

      alert("Queue reset successfully!");

    } catch (error) {

      console.log(error);

      alert("Failed to reset queue.");

    }

  };

  return (

    <button
      className="btn"
      style={{
        background: "#dc2626",
        marginLeft: "10px",
      }}
      onClick={handleReset}
    >
      Reset Queue
    </button>

  );

}

export default ResetQueueButton;
