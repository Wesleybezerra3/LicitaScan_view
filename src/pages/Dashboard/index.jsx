import { buscarEditais } from "../../service/editais";
import { buscarEditaisVencendo } from "../../service/editaisVencendo";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CardDashboard from "../../components/CardDashboard";
import {
  faFile,
  faCalendar,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";
import Table from "../../components/Table";
import { UserContext } from "../../context/Context";
import { useContext, useEffect } from "react";
import FiltersSection from "../../components/FiltersSection";
import { totalEditais } from "../../service/totalEditais";
import { buscarEditaisNovos } from "../../service/editaisNovos";
import { maioresValores } from "../../service/maioresValores";
import ResumoAnalitico from "../../components/ResumoAnalitico";

const Dashboard = () => {
  // const [data, setdata]= useState();
  const { page, pageFilter, orderState } = useContext(UserContext);

  const { data: contadores, isLoading: isLoadingContadores } = useQuery({
    queryKey: ["editais", "contadores"],
    queryFn: totalEditais,
  });
  const totais = contadores?.totais ?? {};

  const {data: maiores_valores, isLoading:isLoadingValores}=useQuery({
    queryKey: ['editais','maioresValores'],
    queryFn: maioresValores,
  })

  
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [
      "editais",
      page,
      pageFilter,
      orderState.field,
      orderState.direction,
    ],
    queryFn: () => {
      switch (pageFilter) {
        case "vencendo":
          return buscarEditaisVencendo(
            page,
            orderState
          );
        case 'novas':
          return buscarEditaisNovos(
            page, orderState
          );

        default:
          return buscarEditais(page, orderState);
      }
    },
    placeholderData: keepPreviousData,
  });



  // console.log('contador:', contadores.totais);

  // if (isLoading) {
  //   return <p>Carregando...</p>;
  // }

  if (isError) {
    console.error("Erro ao buscar editais:", error);
    return <p>Nenhum edital encontrado!</p>;
  }

  if (error) {
    console.error("Erro ao buscar editais:", error);
    return <p>Erro ao buscar editais: {error.message}</p>;
  }
  console.log(data);
  console.log(contadores)
  // useEffect(() => {
  //   const getEditais = async () => {
  //     try {
  //       const response = await api.get("/pncp/editais");

  //       if (response.data) {
  //         // console.log(response.data);
  //         setdata(response.data)
  //       }

  //       if(data){
  //         console.log('data:',data)
  //       }
  //       console.log('Nenhum dado retornado');
  //     } catch (err) {
  //       console.log("Error ao buscar editais:", err);
  //       console.error(err);
  //     }
  //   };
  //   getEditais();
  // }, []);

  return (
    <>
      <section className={style.container}>
        {/* <h1>test</h1> */}
        <section className={style.containerDados}>
       <div className={style.containerCards}>
         
         <CardDashboard
           icon={faFile}
           text={"Oportunidades"}
           dados={isLoadingContadores ? "..." : totais.totalGeral || 0}
           subText={"Encontradas"}
           color1="#6366F1"
           color2="#4F46E5"
           isLoading={isLoadingContadores}
         />
         <CardDashboard
           icon={faCalendar}
           text={"Novas oportunidades"}
           dados={isLoadingContadores ? "..." : totais.totalNovos || 0}
           subText={"Últimos 3 dias"}
           color1="#10B981"
           color2="#059669"
           isLoading={isLoadingContadores}
         />
         <CardDashboard
           icon={faClock}
           text={"Encerrando"}
           dados={isLoadingContadores ? "..." : totais.totalVencendo || 0}
           subText={"Prazos se encerrando"}
           color1="#F59E0B"
           color2="#D97706"
           isLoading={isLoadingContadores}
         />
       </div>
          {/* <CardDashboard
            icon={faStar}
            text={"Alta Relevância"}
            dados={"3"}
            subText={"---"}
            color1="#3B82F6"
            color2="#1D4ED8"
            isLoading={isLoadingContadores}
          /> */}
        </section>
        <section className={style.containerResumo}>
          <ResumoAnalitico
            data={maiores_valores?.editais ?? []}
            isLoading={isLoadingValores}
          />
        </section>
        <section className={style.containerTable}>
          <FiltersSection
            todas={totais.totalGeral || 0}
            vencendo={totais.totalVencendo || 0}
            novas={totais.totalNovos || 0}
          />
          <div className={style.sectionTitle}>
            <p>
              Oportunidades encontradas -{" "}
              <span className={`${style.pageFilter} ${style[pageFilter] || ""}`}>
                {pageFilter}
              </span>
            </p>
          </div>
          <Table
            data={data?.editais ?? []}
            page={data?.page}
            limit={data?.limit}
            total={data?.total}
            isLoading={isLoading || isFetching}
          />
        </section>

        {/* <div>
          {data.editais?.map((edital) => (
            <div key={edital.edital}>
              <h3>{edital.nomeOrgao}</h3>
              <p>{edital.portal}</p>
            </div>
          ))}
        </div> */}
      </section>
    </>
  );
};
export default Dashboard;
