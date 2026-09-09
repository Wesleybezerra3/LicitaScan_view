import { useState } from "react";
import style from "./style.module.css";

const FiltersSection = ({ todas, novas, favoritas, vencendo }) => {
  const [tabState, setTabState] = useState("todas");

  return (
    <div className={style.filtersContainer}>
      <h3>Filtros</h3>
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
            onClick={() => setTabState("todas")}
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
            onClick={() => setTabState("novas")}
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
            onClick={() => setTabState("vencendo")}
            value={`Vencendo (${vencendo || 0})`}
          />
        </div>
      </div>
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
  );
};

export default FiltersSection;
