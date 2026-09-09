import api from "./api";

export async function buscarEditais(page = 1) {
  const response = await api.get("/pncp/editais", {
    params: { page },
  });

  return response.data;
}