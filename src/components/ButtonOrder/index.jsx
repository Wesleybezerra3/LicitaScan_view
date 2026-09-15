import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/Context";
import style from "./style.module.css";

const ButtonOrder = ({ field }) => {
  const { orderState, setOrderState } = useContext(UserContext);

  const isActive = orderState.field === field;
  const isAscending = isActive && orderState.direction === "asc";

  const handleClick = () => {
    setOrderState((previous) => ({
      field,
      direction:
        previous.field === field && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <button
      type="button"
      className={`${style.orderButton} ${isActive ? style.active : ""}`}
      onClick={handleClick}
      aria-label={`Ordenar por ${field}`}
      aria-pressed={isActive}
      title={`Ordenar por ${field}`}
    >
      <FontAwesomeIcon
        icon={faArrowDown}
        className={isAscending ? style.ascending : ""}
      />
    </button>
  );
};

export default ButtonOrder;