import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/Context";

const ButtonOrder = ({ field }) => {
  const { orderState, setOrderState } = useContext(UserContext);
  const isActive = orderState.field === field;
  const shouldRotate = isActive && orderState.direction === "asc";

  const handleClick = () => {
    if (field === "relevancia") {
      setOrderState((prev) => ({
        ...prev,
        relevancia: prev.relevancia === "asc" ? "desc" : "asc",
      }));
    }
    if (field === "dataEncerramento") {
      setOrderState((prev) => ({
        ...prev,
        dataEncerramento: prev.dataEncerramento === "desc" ? "asc" : "desc",
      }));
    }
    // console.log(orderState);
    // setOrderState((prev) => ({
    //   field,
    //   direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    // }));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Ordenar por ${field}`}
      aria-pressed={isActive}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: isActive ? "#2563eb" : "#374151",
        transform: shouldRotate ? "rotate(180deg)" : "none",
        transition: "transform 0.2s ease",
        padding: 0,
      }}
    >
      <FontAwesomeIcon icon={faArrowDown} />
    </button>
  );
};

export default ButtonOrder;
