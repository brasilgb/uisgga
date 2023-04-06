import * as Yup from "yup";

export default Yup.object().shape({
    dataEnvio: Yup.date().typeError("Digite uma data válida!").required("A data de cadastro é um campo obrigatório!"),
    loteId: Yup.number().required("O Lote é um campo obrigatório"),
    incubaveis: Yup.number().typeError("Digite somente números").required("Preencha os incubáveis"),
    comerciais: Yup.number().typeError("Digite somente números").required("Preencha os comerciais")

});