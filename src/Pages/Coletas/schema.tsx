import * as Yup from "yup";

export default Yup.object().shape({
    loteId: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    aviarioId: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    coleta: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    dataColeta: Yup.date().typeError("Digite uma data válida!").required("Este é um campo obrigatório!"),
    limposNinho: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    sujosNinho: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    ovosCama: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    duasGemas: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    refugos: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    pequenos: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    cascaFina: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    frios: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    esmagadosQuebrados: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    camaNaoIncubaveis: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    deformados: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    sujosDeCama: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    trincados: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    eliminados: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    incubaveisBons: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    incubaveis: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    comerciais: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
    posturaDia: Yup.number().integer("Digite somente inteiros!").typeError("Digite somente números!").required("Este é um campo obrigatório"),
});