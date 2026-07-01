import {
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function StatsCard({
  title,
  value,
}) {

  let icon = null;

  if (title === "Waiting Patients") {
    icon = <FaUsers size={28} color="#2563eb" />;
  } else if (title === "Completed") {
    icon = <FaCheckCircle size={28} color="#16a34a" />;
  } else if (title === "Average Time") {
    icon = <FaClock size={28} color="#f59e0b" />;
  }

  return (
    <div className="stats-card">

      <div className="stats-header">
        {icon}

        <h3>{title}</h3>
      </div>

      <h1 className="stats-value">
        {value}
      </h1>

    </div>
  );
}

export default StatsCard;
