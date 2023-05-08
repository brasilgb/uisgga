import * as Yup from "yup";

export default Yup.object().shape({
    dataMorte: Yup.date().typeError("Digite uma data válida!").required("A data de cadastro é um campo obrigatório!"),
    loteId: Yup.number().required("O Lote é um campo obrigatório"),
    aviarioId: Yup.number().required("O Aviário é um campo obrigatório"),
    causaMorte: Yup.number().required("A causa é um campo obrigatório"),
    outraCausa: Yup.string().required("Descreva a outra causa da morte"),
    box1Femea: Yup.number().typeError("Digite somente números").required("Box1 é um campo obrigatório"),
    box2Femea: Yup.number().typeError("Digite somente números").required("Box2 é um campo obrigatório"),
    box3Femea: Yup.number().typeError("Digite somente números").required("Box3 é um campo obrigatório"),
    box4Femea: Yup.number().typeError("Digite somente números").required("Box4 é um campo obrigatório"),
    box1Macho: Yup.number().typeError("Digite somente números").required("Box1 é um campo obrigatório"),
    box2Macho: Yup.number().typeError("Digite somente números").required("Box2 é um campo obrigatório"),
    box3Macho: Yup.number().typeError("Digite somente números").required("Box3 é um campo obrigatório"),
    box4Macho: Yup.number().typeError("Digite somente números").required("Box4 é um campo obrigatório"),
});