import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faStar, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination";

const Table = ({ data = [], page, limit, total}) => {
  const pageLimit = limit || 10;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openLink = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
    console.log(url);
  };


  const relevancia =(score)=>{

    if(score >= 80){
      return "Alta"
    }
    if(score >= 50 && score < 80){
      return "Media"
    }
    return "Baixa"
  }
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Órgão / Entidade</th>
            <th>Edital</th>
            <th>Modalidade</th>
            <th>Objeto</th>
            <th>Prazo de Propostas</th>
            <th>Relevância</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              const unidade = item?.contratacao?.unidadeOrgao
                ? JSON.parse(item?.contratacao?.unidadeOrgao)
                : {};
              return (
                <tr key={index}>
                  <td className={style.cellOrgan}>
                    <span className={style.organName}>
                      {unidade.nomeUnidade || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className={style.numeroEdital} title={item?.contratacao?.numero}>
                      {item?.contratacao?.numero || "N/A"}
                    </span>
                  </td>
                  <td>{item?.contratacao?.modalidade || 'Pregão eletrônico'}</td>
                  <td className={style.cellObject}>
                    <span title={item?.contratacao?.objeto}>{item?.contratacao?.objeto || "N/A"}</span>
                  </td>
                  <td>
                    <div className={style.dateBox}>
                      <span className={style.date}>
                        {formatDate(item?.contratacao?.dataEncerramento) || "N/A"}
                      </span>
                      {/* <span className={style.daysLeft}>{item?.contratacao?.diasRestantes}</span> */}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${style.status} ${style[relevancia(item?.analise?.porcentagemRelevancia)?.toLowerCase()]}`}
                    >
                      {` ${item?.analise?.porcentagemRelevancia || "N/A"}%`}
                    </span>
                  </td>
                  <td className={style.actions}>
                    {/* <button
                      className={style.actionBtn}
                      title="Abrir link"
                      onClick={() => openLink(item?.contratacao?.url || "N/A")}
                    >
                      <FontAwesomeIcon icon={faLink} />
                    </button>
                    <button className={style.actionBtn} title="Favoritar">
                      <FontAwesomeIcon icon={faStar} />
                    </button> */}
                    <button className={style.actionBtn} title="Mais opções">
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                  </td>
                </tr>
                
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className={style.emptyMessage}>
                Nenhum edital encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data.length < pageLimit && (
        <div className={style.remainingMessage}>Sem mais editais por aqui</div>
      )}
      <div className={style.paginationContainer}>
        <Pagination page={page} limit={limit} total={total} />
      </div>
    </div>
  );
};

export default Table;
