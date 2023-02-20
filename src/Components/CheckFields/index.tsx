import api from "../../Services/api";

export const LoteExixts = ((elote: any) => {
    return api.get(`loteExist/${elote}`).then((result) => {
        // I will be doing stuff here
        return result.data.lote;
      })
});