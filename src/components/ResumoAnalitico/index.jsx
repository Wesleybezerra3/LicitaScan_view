import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faWindowMaximize} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ResumoAnalitico = ({ data, isLoading = false }) => {
  const oportunidades = Array.isArray(data) ? data : [];
  const [minimizado, setMinimizado] = useState(false);

  const formatarMoeda = (valor, emCentavos = true) => {
    if (valor === null || valor === undefined || valor === "") {
      return "Não informado";
    }

    const valorNumerico = Number(valor);
    const valorFinal = emCentavos ? valorNumerico / 100 : valorNumerico;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorFinal);
  };

  return (
    <section className={`${style.containerResumo} ${minimizado ? style.minimizado : ""}`}>
      <div className={style.headerResumo}>
        <div>
          <h1>Resumo analítico</h1>
          <p>Maiores oportunidades por valor estimado</p>
        </div>
        <button
          type="button"
          className={style.minimizar}
          onClick={() => setMinimizado((estadoAtual) => !estadoAtual)}
          aria-label={minimizado ? "Abrir resumo analítico" : "Minimizar resumo analítico"}
          aria-expanded={!minimizado}
          title={minimizado ? "Abrir resumo" : "Minimizar resumo"}
        >
            <FontAwesomeIcon icon={minimizado ? faWindowMaximize : faWindowMinimize}/>
        </button>
      </div>

      {isLoading ? (
        <div className={style.listaValores} aria-label="Carregando resumo analítico">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className={style.skeletonItem} key={`resumo-loading-${index}`}>
              <span className={`${style.skeletonLine} ${style.skeletonPosition}`} />
              <div className={style.skeletonDetails}>
                <span className={`${style.skeletonLine} ${style.skeletonValue}`} />
                <span className={`${style.skeletonLine} ${style.skeletonObject}`} />
                <span className={`${style.skeletonLine} ${style.skeletonOrganization}`} />
              </div>
            </div>
          ))}
        </div>
      ) : oportunidades.length > 0 ? (
        <div className={style.listaValores}>
          {oportunidades.map((item, index) => {
            const contratacao = item?.contratacao ?? {};
            const unidade = contratacao.unidadeOrgao
              ? JSON.parse(contratacao.unidadeOrgao)
              : {};
            const entidade = contratacao.orgaoEntidade
              ? JSON.parse(contratacao.orgaoEntidade)
              : {};

            return (
              <a
                className={style.itemValor}
                key={item?.id ?? index}
                href={contratacao.url || undefined}
                target={contratacao.url ? "_blank" : undefined}
                rel={contratacao.url ? "noreferrer" : undefined}
                title={contratacao.url ? "Abrir edital no PNCP" : undefined}
              >
                <span className={style.posicao}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={style.detalhesValor}>
                  <strong>{formatarMoeda(contratacao.valorEstimado)}</strong>
                  <span title={contratacao.objeto}>
                    {contratacao.objeto || "Objeto não informado"}
                  </span>
                  <small>
                    {entidade.razaoSocial || unidade.nomeUnidade || "Órgão não informado"}
                  </small>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <p className={style.estadoVazio}>
          Nenhuma oportunidade com valor estimado encontrada.
        </p>
      )}
    </section>
  );
};

export default ResumoAnalitico;
