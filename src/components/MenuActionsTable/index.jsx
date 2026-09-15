import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faStar, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const MenuActionsTable = ({ showMenu, url}) => {
  //     const openLink = (url) => {
  //   if (url) {
  //     window.open(url, "_blank");
  //   }
  //   console.log(url);
  // };

  return (
    <>
      <div
        className={`${style.menuContainer} ${showMenu ? style.menuOpen : style.menuClosed}`}
        aria-hidden={!showMenu}
      >
        {/* <button onClick={() => openLink(url)}>
           
          <FontAwesomeIcon icon={faLink} />
        </button> */}
        <button>
          <FontAwesomeIcon icon={faStar} />
        </button>
        {/* <button>
          <FontAwesomeIcon icon={faEllipsisH} />
        </button> */}
      </div>
    </>
  );
};

export default MenuActionsTable;
