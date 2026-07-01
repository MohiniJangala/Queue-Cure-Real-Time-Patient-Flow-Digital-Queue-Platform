import { FaUserMd } from "react-icons/fa";

function CurrentTokenCard({
  currentToken,
}) {
  return (
    <div className="current-token-card">

      <div className="current-token-header">

        <FaUserMd
          size={35}
          color="#ffffff"
        />

        <h2>
          Now Serving
        </h2>

      </div>

      <div className="current-token-number">
        T{currentToken}
      </div>

      <p className="current-token-text">
        Patient Currently in Consultation
      </p>

    </div>
  );
}

export default CurrentTokenCard;
