import style from "./style.module.css";



const FiltersSection = ({todas}) => {
  return (
    <div className={style.filtersContainer}>
      <h3>Filtros</h3>
      <div className={style.classesGroup}>
        <div className={style.classItem}>
            <label htmlFor="todas">Todas({todas || 0})</label>
            <input type="checkbox" id="todas" name="todas" />
        </div>
            <div className={style.classItem}>
            <label htmlFor="novas">Novas</label>
            <input type="checkbox" id="novas" name="novas" />
        </div>
            <div className={style.classItem}>
            <label htmlFor="favoritas">Favoritas</label>
            <input type="checkbox" id="favoritas" name="favoritas" />
        </div>
            <div className={style.classItem}>
            <label htmlFor="vencendo">Vencendo</label>
            <input type="checkbox" id="vencendo" name="vencendo" />
        </div>
      </div>
      <div className={style.searchGroup}>
        {/* <label htmlFor="search">Pesquisar</label> */}
        <input type="text" id="search" placeholder="Buscar órgão, edital ou objeto..." />
        <button type="button">Filtrar</button>

      </div>
      <div className={style.filterGroup}>
        <label htmlFor="orgao">Órgão / Entidade</label>
        <select id="orgao">
          <option value="">Selecione um órgão</option>
          <option value="orgao1">Órgão 1</option>
          <option value="orgao2">Órgão 2</option>
        </select>
      </div>
      <div className={style.filterGroup}>
        <label htmlFor="modalidade">Modalidade</label>
        <select id="modalidade">
          <option value="">Selecione uma modalidade</option>
          <option value="modalidade1">Modalidade 1</option>
          <option value="modalidade2">Modalidade 2</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersSection;
