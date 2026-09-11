import api from "./api";

export async function totalEditais() {
  const response = await api.get("/pncp/editais/contabilizar");

  return response.data;
}