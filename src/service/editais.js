import api from "./api";

export async function buscarEditais(page = 1, orderState = {}) {
  const response = await api.get("/pncp/editais", {
    params: {
      page,
      orderBy: orderState.field || "dataEncerramento",
      orderDirection: orderState.direction || "desc",
    },
  });

  return response.data;
}