import api from "../../Services/api";

export const LoteExixts = (async (elote: any) => {
  const result = await api.get(`loteExist/${elote}`);
  return result.data.lote;
});