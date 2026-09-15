import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faLink } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Pagination from "../Pagination";
import MenuActionsTable from "../menuActionsTable";
import ButtonOrder from "../ButtonOrder";

const Table = ({ data = [], page, limit, total, isLoading }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const pageLimit = limit || 10;

  const loadingRows = Array.from({ length: 4 });

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

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>UF</th>
            <th>Órgão / Entidade</th>
            <th>Edital</th>
            <th>Modalidade</th>
            <th>Objeto</th>
            <th>Data de publicação</th>
            <th className={style.order}>
              Termino de Propostas{" "}
              <div>
                <ButtonOrder field="dataEncerramento" />
              </div>
            </th>
            <th className={style.order}>
              Relevância{" "}
              <div>
                <ButtonOrder field="relevancia" />
              </div>
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            loadingRows.map((_, index) => (
              <tr key={`loading-${index}`} className={style.loadingRow}>
                {Array.from({ length: 9 }).map((__, cellIndex) => (
                  <td key={`loading-cell-${cellIndex}`}>
                    <span className={style.loadingPlaceholder} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length > 0 ? (
            data.map((item, index) => {
              const unidade = item?.contratacao?.unidadeOrgao
                ? JSON.parse(item?.contratacao?.unidadeOrgao)
                : {};
              const entidade = item?.contratacao?.orgaoEntidade
                ? JSON.parse(item?.contratacao?.orgaoEntidade)
                : {};
              return (
                <tr key={index}>
                  <td className={style.cellUf}>
                    <span className={style.organUf}>
                      {unidade.ufSigla || "N/A"}
                    </span>
                  </td>
                  <td className={style.cellOrgan}>
                    <span
                      className={style.organName}
                      title={entidade.razaoSocial || unidade.nomeUnidade}
                    >
                      {entidade.razaoSocial || unidade.nomeUnidade || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={style.numeroEdital}
                      title={item?.contratacao?.numero}
                    >
                      {item?.contratacao?.numero || "N/A"}
                    </span>
                  </td>
                  <td>
                    {item?.contratacao?.modalidade || "Pregão eletrônico"}
                  </td>
                  <td className={style.cellObject}>
                    <span title={item?.contratacao?.objeto || 'N/A'}>{item?.contratacao?.objeto || "N/A"}</span>
                  </td>
                  <td>
                    <div className={style.dateBox}>
                      <span className={style.datePubli}>
                        {formatDate(item?.contratacao?.dataPublicacao) || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={style.dateBox}>
                      <span className={style.dateProposta}>
                        {formatDate(item?.contratacao?.dataEncerramento) ||
                          "N/A"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${style.status} ${style[item?.analise?.relevancia?.toLowerCase()]}`}
                    >
                      {` ${item?.analise?.relevancia || "N/A"}`}
                    </span>
                  </td>
                  <td className={style.actions}>
                    <MenuActionsTable
                      showMenu={activeMenu === index}
                      url={item?.contratacao?.url}
                    />
                    <button onClick={() => openLink(item?.contratacao?.url)} className={style.linkBtn}>
                      <FontAwesomeIcon icon={faLink} />
                    </button>
                    <button
                      className={style.actionBtn}
                      title="Mais opções"
                      onClick={() =>
                        setActiveMenu(activeMenu === index ? null : index)
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className={style.emptyMessage}>
                Nenhum edital encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data.length < pageLimit && (
        <div
          className={style.remainingMessage}
          style={{ display: isLoading ? "none" : "block" }}
        >
          Sem mais editais por aqui
        </div>
      )}
      <div className={style.paginationContainer}>
        <Pagination page={page} limit={limit} total={total} />
      </div>
    </div>
  );
};

export default Table;
