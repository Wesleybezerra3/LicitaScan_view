import api from "./api";

export async function maioresValores() {
 

  const response = await api.get("/pncp/editais/maiores-valores");

  return response.data;
}
