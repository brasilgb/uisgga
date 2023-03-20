import * as Yup from "yup";

export default Yup.object().shape({
    aviario: Yup.string().required("O Aviário é um campo obrigatório"),
    dataEntrada: Yup.date().typeError("Digite uma data válida!").required("A data de cadastro é um campo obrigatório!"),
    loteId: Yup.number().required("O Lote é um campo obrigatório"),
    box1Femea: Yup.number().typeError("Digite somente números").required("Box1 é um campo obrigatório"),
    box2Femea: Yup.number().typeError("Digite somente números").notRequired(),
    box3Femea: Yup.number().typeError("Digite somente números").notRequired(),
    box4Femea: Yup.number().typeError("Digite somente números").notRequired(),
    box1Macho: Yup.number().typeError("Digite somente números").required("Box1 é um campo obrigatório"),
    box2Macho: Yup.number().typeError("Digite somente números").notRequired(),
    box3Macho: Yup.number().typeError("Digite somente números").notRequired(),
    box4Macho: Yup.number().typeError("Digite somente números").notRequired(),

});