import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconContext } from "react-icons";
import { IoHome, IoFileTrayOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ABoxAll } from "../../Components/Boxes";
import { SBackButtom, SSaveButtom } from "../../Components/Buttons";
import SLoading from "../../Components/Loading";
import { SubBar, SubBarLeft, SubBarRight } from "../../Components/SubBar";
import { AppContext } from "../../Contexts/AppContext";
import {
  Formik,
  Field,
  Form,
  useFormikContext,
  useField,
  useFormik,
  FormikHelpers,
  FormikValues,
} from "formik";
import schema from "./schema";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import ptbr from "date-fns/locale/pt-BR";
import api from "../../Services/api";
import "animate.css";
import { AMessageError, AMessageSuccess } from "../../Components/Messages";
import { causas } from "../../Constants";

registerLocale("ptbr", ptbr);

interface MortalidadeProps {
  cicloId: number;
  loteId: string;
  aviarioId: string;
  dataMorte: Date;
  causaMorte: string;
  outraCausa: string;
  box1Femea: string;
  box2Femea: string;
  box3Femea: string;
  box4Femea: string;
  box1Macho: string;
  box2Macho: string;
  box3Macho: string;
  box4Macho: string;
  totalFemeas: number;
  totalMachos: number;
  totalAves: number;
}
const AddMortalidade = () => {
  const navigate = useNavigate();
  const { loading } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [listLotes, setListLotes] = useState([]);
  const [activeCiclo, setActiveCiclo] = useState<any>();
  const [idCicloAtivo, setIdCicloAtivo] = useState();
  const [aviarioLote, setAviarioLote] = useState([]);
  const [allValuesForm, setAllValuesForm] = useState<any>();
  const [selectedLoteId, setSelectedLoteId] = useState<any>();

  const loteIdRef = useRef();

  const DatePickerField = ({ ...props }: any) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        locale="ptbr"
      />
    );
  };

  useEffect(() => {
    const getLotes = async () => {
      await api.get("lotes").then((reponse) => {
        const lotes = reponse.data.data;
        setListLotes(lotes);
      });
    };
    getLotes();
  }, []);

  useEffect(() => {
    const getCiclos = async () => {
      await api.get("ciclos").then((res) => {
        const active = res.data.data.filter((act: any) => act.ativo === true);
        setIdCicloAtivo(active[0].idCiclo);
        setActiveCiclo(active.length > 0 ? true : false);
        if (active.length > 0) {
          if (active[0].ativo) {
            setActiveCiclo(active[0].idCiclo);
          }
        }
      });
    };
    getCiclos();
  }, []);

  useEffect(() => {
    const getAviarioLote = async () => {
      if (allValuesForm && allValuesForm.loteId !== "") {
        await api.get("aviarios").then((response) => {
          let aviarios = response.data.data.filter(
            (fl: any) => fl.loteId === parseInt(allValuesForm.loteId)
          );
          setAviarioLote(aviarios);
        });
      }
    };
    getAviarioLote();
  }, [allValuesForm]);

  const onsubmit = async (values: MortalidadeProps, { resetForm }: any) => {
    setLoadingSaveButton(true);
    api
      .post("mortalidades", {
        data: values,
      })
      .then((response) => {
        setTimeout(() => {
          setLoadingSaveButton(false);
          setPostMessageErro(false);
          setPostMessageSuccess(response.data.message);
          resetForm();
        }, 500);
      })
      .catch((err) => {
        setPostMessageErro(false);
        setLoadingSaveButton(false);
      });
  };

  const FormObserver = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      setAllValuesForm(values);
    }, [values]);
    return null;
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      var form = e.target.form;
      var index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  };

  return (
    <Fragment>
      {loading && <SLoading />}

      <SubBar>
        <>
          <SubBarLeft>
            <>
              <IconContext.Provider value={{ className: "text-3xl" }}>
                <div>
                  <IoFileTrayOutline />
                </div>
              </IconContext.Provider>
              <h1 className="text-2xl ml-1 font-medium">Mortalidades</h1>
            </>
          </SubBarLeft>
          <SubBarRight>
            <div className="flex items-center py-4">
              <button onClick={() => navigate("/")} className="text-gray-600">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <div>
                    <IoHome />
                  </div>
                </IconContext.Provider>
              </button>
              <span className="mx-2 text-gray-500 ">/</span>
              <button
                onClick={() => navigate("/aviarios")}
                className="text-gray-600  hover:underline"
              >
                Mortalidades
              </button>
              <span className="mx-2 text-gray-500 ">/</span>
              <span className="text-gray-600 ">Adicionar</span>
            </div>
          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>
        <div className="flex items-center justify-between mb-2">
          <div>
            <SBackButtom onClick={() => navigate("/mortalidades")} />
          </div>
        </div>

        {!activeCiclo ? (
          <AMessageError className="rounded-t-lg">
            Para cadastrar mortalidades os ciclos deverão estar cadastrados e
            ativos
          </AMessageError>
        ) : (
          <Formik
            validationSchema={schema}
            onSubmit={onsubmit}
            initialValues={{
              cicloId: 0,
              loteId: "",
              aviarioId: "",
              dataMorte: new Date(),
              causaMorte: "",
              outraCausa: "",
              box1Femea: "",
              box2Femea: "",
              box3Femea: "",
              box4Femea: "",
              box1Macho: "",
              box2Macho: "",
              box3Macho: "",
              box4Macho: "",
              totalFemeas: 0,
              totalMachos: 0,
              totalAves: 0,
            }}
          >
            {({ errors, isValid, values }) => (
              <Form autoComplete="off">
                <FormObserver />
                <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                  {postMessageErro && (
                    <div>
                      {
                        <AMessageError className="rounded-lg">
                          {postMessageErro}
                        </AMessageError>
                      }
                    </div>
                  )}
                  {postMessageSuccess && (
                    <div>
                      {
                        <AMessageSuccess className="rounded-lg">
                          {postMessageSuccess}
                        </AMessageSuccess>
                      }
                    </div>
                  )}

                  <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                    <h1 className="font-lg text-white font-medium uppercase">
                      Adicioanar mortalidade
                    </h1>
                  </div>

                  <Field
                    type="hidden"
                    value={(values.cicloId = idCicloAtivo!)}
                  />
                  <div className="grid grid-cols-4 gap-8">
                    <div className="mt-4">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="dataMorte"
                      >
                        Data da morte
                      </label>
                      <DatePickerField
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.dataMorte
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="dataMorte"
                        name="dataMorte"
                        dateFormat="dd/MM/yyyy"
                        onFocus={(e: any) => e.target.blur()}
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="loteId"
                      >
                        Lotes
                      </label>
                      <Field
                        as="select"
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.loteId ? "border-red-400" : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="loteId"
                        name="loteId"
                      >
                        <option value="">Selecione um lote</option>
                        {listLotes.map((lt: any, ilt: any) => (
                          <option key={ilt} value={lt.idLote}>
                            {lt.lote}
                          </option>
                        ))}
                      </Field>
                      {errors.loteId && (
                        <AMessageError className="rounded-b-lg">
                          {errors.loteId}
                        </AMessageError>
                      )}
                    </div>

                    <div className="mt-4">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="aviarioId"
                      >
                        Aviário
                      </label>
                      <Field
                        as="select"
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                          errors.aviarioId
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="aviarioId"
                        name="aviarioId"
                        type="text"
                      >
                        <option value="0">Selecione o aviário</option>
                        {aviarioLote.map((av: any, iav: any) => (
                          <option key={iav} value={av.idAviario}>
                            {av.aviario}
                          </option>
                        ))}
                      </Field>
                      {errors.aviarioId && (
                        <AMessageError className="rounded-b-lg">
                          {errors.aviarioId}
                        </AMessageError>
                      )}
                    </div>

                    <div className="mt-4">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="aviarioId"
                      >
                        Causa da morte
                      </label>
                      <Field
                        as="select"
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                          errors.causaMorte
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="causaMorte"
                        name="causaMorte"
                        type="text"
                      >
                        <option value="0">Selecione a causa da morte</option>
                        {causas.map((cm: any, icm: any) => (
                          <option key={icm} value={cm.idx}>
                            {cm.causa}
                          </option>
                        ))}
                      </Field>
                      {errors.causaMorte && (
                        <AMessageError className="rounded-b-lg">
                          {errors.causaMorte}
                        </AMessageError>
                      )}
                    </div>
                  </div>
                  {values.causaMorte === "99" && (
                    <div className="mt-4">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="outraCausa"
                      >
                        Descreva a outra causa da morte
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.outraCausa
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="outraCausa"
                        name="outraCausa"
                        component="textarea"
                        rows="2"
                        autoFocus={true}
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.outraCausa && (
                        <AMessageError className="rounded-b-lg">
                          {errors.outraCausa}
                        </AMessageError>
                      )}
                    </div>
                  )}

                  {/* Cadastro aves fêmeas ************************************************************** */}
                  <div className="flex items-center mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">
                      Mortalidade de fêmeas
                    </span>
                    {values.loteId && (
                      <div className="flex items-center animate__animated animate__fadeIn ">
                        <span className="ml-4 font-medium text-xs">
                          Disponíveis
                        </span>
                        <span className="text-blue-500 ml-1 font-medium text-sm px-2 rounded-t-lg">
                          {listLotes
                            .filter((mf: any) => mf.idLote == values.loteId)
                            .map(
                              (mc: any) =>
                                mc.femeaCapitalizada -
                                (parseInt(
                                  values.box1Femea ? values.box1Femea : "0"
                                ) +
                                  parseInt(
                                    values.box2Femea ? values.box2Femea : "0"
                                  ) +
                                  parseInt(
                                    values.box3Femea ? values.box3Femea : "0"
                                  ) +
                                  parseInt(
                                    values.box4Femea ? values.box4Femea : "0"
                                  ))
                            )}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box1Femea"
                      >
                        Box 1
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box1Femea
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box1Femea"
                        name="box1Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box1Femea && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box1Femea}
                        </AMessageError>
                      )}
                    </div>

                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box2Femea"
                      >
                        Box 2
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box2Femea
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box2Femea"
                        name="box2Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box2Femea && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box2Femea}
                        </AMessageError>
                      )}
                    </div>

                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box3Femea"
                      >
                        Box 3
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box3Femea
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box3Femea"
                        name="box3Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box3Femea && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box3Femea}
                        </AMessageError>
                      )}
                    </div>

                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box4Femea"
                      >
                        Box 4
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box4Femea
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box4Femea"
                        name="box4Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box4Femea && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box4Femea}
                        </AMessageError>
                      )}
                    </div>
                  </div>

                  {/* Cadastro aves machos ************************************************************** */}
                  <div className="flex mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">
                      Mortalidade de machos
                    </span>
                    {values.loteId && (
                      <div className="flex items-center animate__animated animate__fadeIn ">
                        <span className="ml-4 font-medium text-xs">
                          Disponíveis
                        </span>
                        <span className="text-blue-500 ml-1 font-medium text-sm px-2 rounded-t-lg">
                          {listLotes
                            .filter((mf: any) => mf.idLote == values.loteId)
                            .map(
                              (mc: any) =>
                                mc.machoCapitalizado -
                                (parseInt(
                                  values.box1Macho ? values.box1Macho : "0"
                                ) +
                                  parseInt(
                                    values.box2Macho ? values.box2Macho : "0"
                                  ) +
                                  parseInt(
                                    values.box3Macho ? values.box3Macho : "0"
                                  ) +
                                  parseInt(
                                    values.box4Macho ? values.box4Macho : "0"
                                  ))
                            )}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box1Macho"
                      >
                        Box 1
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box1Macho
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box1Macho"
                        name="box1Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box1Macho && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box1Macho}
                        </AMessageError>
                      )}
                    </div>
                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box2Macho"
                      >
                        Box 2
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box2Macho
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box2Macho"
                        name="box2Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box2Macho && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box2Macho}
                        </AMessageError>
                      )}
                    </div>
                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box3Macho"
                      >
                        Box 3
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box3Macho
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box3Macho"
                        name="box3Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box3Macho && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box3Macho}
                        </AMessageError>
                      )}
                    </div>
                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="box4Macho"
                      >
                        Box 4
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${
                          errors.box4Macho
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box4Macho"
                        name="box4Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box4Macho && (
                        <AMessageError className="rounded-b-lg">
                          {errors.box4Macho}
                        </AMessageError>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">
                      Mortalidade de totais
                    </span>
                  </div>
                  <div className="md:grid md:grid-cols-3 md:gap-8">
                    <div>
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="totalFemeas"
                      >
                        Total fêmeas
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                          errors.totalFemeas
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="totalFemeas"
                        name="totalFemeas"
                        type="text"
                        onFocus={(e: any) => e.target.value}
                        value={
                          (values.totalFemeas =
                            parseInt(
                              values.box1Femea ? values.box1Femea : "0"
                            ) +
                            parseInt(
                              values.box2Femea ? values.box2Femea : "0"
                            ) +
                            parseInt(
                              values.box3Femea ? values.box3Femea : "0"
                            ) +
                            parseInt(values.box4Femea ? values.box4Femea : "0"))
                        }
                      />
                      {errors.totalFemeas && (
                        <AMessageError className="rounded-b-lg">
                          {errors.totalFemeas}
                        </AMessageError>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="totalMachos"
                      >
                        Total machos
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                          errors.totalMachos
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="totalMachos"
                        name="totalMachos"
                        type="text"
                        onFocus={(e: any) => e.target.value}
                        value={
                          (values.totalMachos =
                            parseInt(
                              values.box1Macho ? values.box1Macho : "0"
                            ) +
                            parseInt(
                              values.box2Macho ? values.box2Macho : "0"
                            ) +
                            parseInt(
                              values.box3Macho ? values.box3Macho : "0"
                            ) +
                            parseInt(values.box4Macho ? values.box4Macho : "0"))
                        }
                      />
                      {errors.totalMachos && (
                        <AMessageError className="rounded-b-lg">
                          {errors.totalMachos}
                        </AMessageError>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0">
                      <label
                        className="w-full mt-2 text-blue-800 font-medium"
                        htmlFor="totalAves"
                      >
                        Total à enviar
                      </label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                          errors.totalAves
                            ? "border-red-400"
                            : "border-gray-200"
                        } rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="totalAves"
                        name="totalAves"
                        type="text"
                        onFocus={(e: any) => e.target.value}
                        value={
                          (values.totalAves = values.totalFemeas
                            ? values.totalFemeas
                            : 0 + values.totalMachos
                            ? values.totalMachos
                            : 0)
                        }
                      />
                      {errors.totalAves && (
                        <AMessageError className="rounded-b-lg">
                          {errors.totalAves}
                        </AMessageError>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end bg-white border-x border-b rounded-b-lg py-2 pr-2">
                  <SSaveButtom
                    loading={loadingSaveButton}
                    disabled={!isValid}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </ABoxAll>
    </Fragment>
  );
};

export default AddMortalidade;
