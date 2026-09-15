import style from "./style.module.css";
import { UserContext } from "../../context/Context";
import { useContext, useState } from "react";

const NavegacaoCategoria = ({ todas, novas, favoritas, vencendo }) => {
  const [tabState, setTabState] = useState("todas");
  const { setPageFilter } = useContext(UserContext);

  const handleTab = (tab) => {
    // setPageFilter({});
    if (tab) {
      setPageFilter(tab);
      setTabState(tab);
    }
  };

  return (
    <>
      <div className={style.navegation}>
          <h2>Navegação</h2>
          <div className={style.classesGroup}>
            <div className={style.classItem}>
              <input
                style={{
                  borderBottom:
                    tabState === "todas" ? "0.5px solid var(--pupple)" : "none",
                }}
                type="button"
                id="todas"
                name="todas"
                className={style.filterButton}
                onClick={() => handleTab("todas")}
                value={`Todas (${todas || 0})`}
              />
            </div>
            <div className={style.classItem}>
              <input
                style={{
                  borderBottom:
                    tabState === "novas" ? "1px solid var(--pupple)" : "none",
                }}
                type="button"
                id="novas"
                name="novas"
                className={style.filterButton}
                onClick={() => handleTab("novas")}
                value={`Novas (${novas || 0})`}
              />
            </div>
            <div className={style.classItem}>
              <input
                style={{
                  borderBottom:
                    tabState === "favoritas" ? "1px solid var(--pupple)" : "none",
                }}
                type="button"
                id="favoritas"
                name="favoritas"
                className={style.filterButton}
                onClick={() => setTabState("favoritas")}
                value={`Favoritas (${favoritas || 0})`}
              />
            </div>
            <div className={style.classItem}>
              <input
                style={{
                  borderBottom:
                    tabState === "vencendo" ? "1px solid var(--pupple)" : "none",
                }}
                type="button"
                id="vencendo"
                name="vencendo"
                className={style.filterButton}
                onClick={() => handleTab("vencendo")}
                value={`Encerrando (${vencendo || 0})`}
              />
            </div>
          </div>
      </div>
    </>
  );
};

export default NavegacaoCategoria;