import api from "./api";

export async function buscarEditais(page = 1, orderState = {}) {
  const field = orderState.field || "dataEncerramento";
  const direction = orderState.direction || "desc";

  const response = await api.get("/pncp/editais", {
    params: {
      page,
      principal: field === "relevancia" ? "relevancia" : "data",
      dataEncerramento: field === "dataEncerramento" ? direction : "desc",
      relevancia: field === "relevancia" ? direction : "desc",
    },
  });

  return response.data;
}
