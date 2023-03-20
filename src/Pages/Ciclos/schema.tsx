import * as Yup from "yup";

export default Yup.object().shape({
    dataInicial: Yup.date().typeError("Digite uma data válida!").required("A data inicial é um campo obrigatório!"),
    semanaInicial: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("A semana inicial é um campo obrigatório"),
});