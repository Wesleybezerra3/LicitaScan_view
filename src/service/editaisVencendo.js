import api from "./api";

export async function buscarEditaisVencendo(page = 1, orderState = {}) {
  const response = await api.get("/pncp/editais/vencidos", {
    params: {
      page,
      orderState
    },
  });

  return response.data;
}