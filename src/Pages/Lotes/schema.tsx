import * as Yup from "yup";

export default Yup.object().shape({
    idLote: Yup.number().notRequired(),
    lote: Yup.string().required("O lote é um campo obrigatório"),
    dataEntrada: Yup.date().typeError("Digite uma data válida!").required("A data de cadastro é um campo obrigatório!"),
    femea: Yup.number().typeError("Digite somente números").required("Número de fêmeas é um campo obrigatório"),
    macho: Yup.number().typeError("Digite somente números").required("Número de machos é um campo obrigatório"),
    dataCapitalizacao: Yup.date().typeError("Digite uma data válida!"),
    femeaCapitalizada: Yup.number().typeError("Digite somente números").notRequired(),
    machoCapitalizado: Yup.number().typeError("Digite somente números").notRequired(),
});