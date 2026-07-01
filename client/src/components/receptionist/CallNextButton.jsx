import API from "../../services/api";

function CallNextButton({
  refreshDashboard,
}) {

  
  // Call Next Patient
  
  const callNext = async () => {

    try {

      await API.post("/queue/next");

      refreshDashboard();

    } catch (error) {

      console.log(error);

    }

  };

  
  // Complete Consultation

  const completeConsultation = async () => {

    try {

      await API.put("/queue/complete");

      refreshDashboard();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        display: "flex",
        gap: "15px",
      }}
    >

      <button
        className="btn"
        onClick={callNext}
      >
        CALL NEXT
      </button>

      <button
        className="btn"
        style={{
          backgroundColor: "#16a34a",
        }}
        onClick={completeConsultation}
      >
        COMPLETE
      </button>

    </div>

  );

}

export default CallNextButton;
