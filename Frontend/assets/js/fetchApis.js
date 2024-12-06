API_URL = 'https://instabyte-pi.vercel.app'
let { API_URL } = process.env.NEXT_PUBLIC_API_URL;

// Função para buscar os dados do endpoint
export default async function fetchImages() {
  try {
    const response = await fetch(process.env.API_URL); // Usando a URL importada
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}
