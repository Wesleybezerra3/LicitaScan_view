import { useEffect, useState } from "react";
import api from "../../service/api";
import { buscarEditais } from "../../service/editais";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  // const [data, setdata]= useState();

  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["editais"],
    queryFn: buscarEditais,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Erro: {error.message}</p>;
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
      <section>
        <h1>test</h1>
        <div>
          {data.editais?.map((edital) => (
            <div key={edital.edital}>
              <h3>{edital.nomeOrgao}</h3>
              <p>{edital.portal}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default Dashboard;
