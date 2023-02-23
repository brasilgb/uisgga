import api from "../../Services/api";

export const LoteExixts = (async (ilote: any, elote: any) => {

  await api.get(`loteExist/${ilote}/${elote}`)
    .then((response) => {
      return response.data.lote;
    })


});