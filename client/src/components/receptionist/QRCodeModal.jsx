import QRCode from "react-qr-code";

function QRCodeModal({
  patient,
  onClose,
}) {

  if (!patient) return null;

  const patientURL =
    `${window.location.origin}/patient/${patient.token}`;

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          Patient QR Code
        </h2>

        <br />

        <QRCode
          value={patientURL}
          size={220}
        />

        <br />

        <h3>
          {patient.name}
        </h3>

        <p>
          Token: T{patient.token}
        </p>

        <br />

        <button
          className="btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default QRCodeModal;
