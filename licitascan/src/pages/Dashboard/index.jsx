import { buscarEditais } from "../../service/editais";
import { useQuery } from "@tanstack/react-query";
import CardDashboard from "../../components/CardDashboard";
import { faFile, faCalendar, faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import style from './style.module.css';
import Table from "../../components/Table";
import { UserContext } from "../../context/Context";
import { useContext } from "react";

const Dashboard = () => {
  // const [data, setdata]= useState();
  const { page } = useContext(UserContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editais", page],
    queryFn: () => buscarEditais(page),
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    console.error("Erro ao buscar editais:", error);
    return <p>Nenhum edital encontrado!</p>;
  }

  if(error){
    console.error("Erro ao buscar editais:", error);
    return <p>Erro ao buscar editais: {error.message}</p>;
  }
   console.log(data)
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
          <CardDashboard
            icon={faFile}
            text={"Oportunidades"}
            dados={data?.total || "0"}
            subText={"Encontradas"}
            color1="#6366F1"
            color2="#4F46E5"
          />
          <CardDashboard
            icon={faCalendar}
            text={"Novas oportunidades"}
            dados={"24"}
            subText={"desde ontem"}
            color1="#10B981"
            color2="#059669"
          />
          <CardDashboard
            icon={faClock}
            text={"Vencidos"}
            dados={"44"}
            subText={"Prazo encerrado"}
            color1="#F59E0B"
            color2="#D97706"
          />
          <CardDashboard
            icon={faStar}
            text={"Alta Relevância"}
            dados={"3"}
            subText={"---"}
            color1="#3B82F6"
            color2="#1D4ED8"
          />
        </section>
        <section className={style.containerTable}>

        <Table
          data={data?.editais ?? []}
          page={data?.page}
          limit={data?.limit}
          total={data?.total}
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
