import * as Yup from "yup";
import { LoteExixts } from "../../Components/CheckFields";


export default Yup.object().shape({
    lote: Yup.string().required("O lote é um campo obrigatório")
    .test("lote_check", "Lote já existe na base de dados, escolha outro identificador", 
    async value => (await LoteExixts(value)) === false)
    ,
    dataEntrada: Yup.date().typeError("Digite uma data válida!").required("A data inicial é um campo obrigatório!"),
    femea: Yup.number().typeError("Digite somente números").required("Número de fêmeas é um campo obrigatório"),
    macho: Yup.number().typeError("Digite somente números").required("Número de machos é um campo obrigatório"),
    dataCapitalizacao: Yup.date().typeError("Digite uma data válida!"),
    femeaCapitalizada: Yup.number().typeError("Digite somente números"),
    machoCapitalizado: Yup.number().typeError("Digite somente números"),
});