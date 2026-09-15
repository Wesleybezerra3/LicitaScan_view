import { useState } from "react";
import { UserContext } from "../../context/Context";
import { useContext } from "react";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FiltersSection = ({ todas, novas, favoritas, vencendo }) => {

  
  const [tabState, setTabState] = useState("todas");
  const { setPageFilter } = useContext(UserContext);
  const [filterVisible, setFilterVisible] = useState(false);



  const handleTab = (tab) => {
    // setPageFilter({});
    if (tab) {
      setPageFilter(tab);
      setTabState(tab);
    }
  };

  return (
    <div className={style.filtersContainer}>
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
      <div style={{marginBottom: filterVisible?'':'-20px'}}>
        <div className={style.containerVisibleFilter}>
          <h3>Filtros</h3>
          <button
            type="button"
            className={style.toggleFilterButton}
            aria-label={filterVisible ? "Ocultar filtros" : "Mostrar filtros"}
            title={filterVisible ? "Ocultar filtros" : "Mostrar filtros"}
            onClick={() => setFilterVisible((prev) => !prev)}
          >
            Ocultar Filtro
            <FontAwesomeIcon icon={!filterVisible ? faEyeSlash: faEye}/>
          </button>
        </div>
        <div className={style.containerFilter} style={{display:filterVisible? 'grid':'none' }}>
            <div className={style.searchGroup}>
        
          {/* <label htmlFor="search">Pesquisar</label> */}
          <input
            type="text"
            id="search"
            placeholder="Buscar órgão, edital ou objeto..."
          />
          {/* <button type="button">Filtrar</button> */}
        </div>
          <div className={style.filterGroup}>
            <label htmlFor="estado">Estado</label>
            <select id="estado">
              <option value="">Selecione um estado</option>
              <option value="estado1">Estado 1</option>
              <option value="estado2">Estado 2</option>s
            </select>
          </div>
          <div className={style.filterGroup}>
            <label htmlFor="modalidade">Modalidade</label>
            <select id="modalidade">
              <option value="">Selecione uma modalidade</option>
              <option value="modalidade1">Pregão Eletrônico</option>
              <option value="modalidade2">Dispensa</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
