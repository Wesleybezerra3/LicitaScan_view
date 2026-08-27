export async function buscarEditais() {
  const response = await fetch(
    "http://localhost:3000/api/pncp/editais"
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar editais");
  }

  return response.json();
}