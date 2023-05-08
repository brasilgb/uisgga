import React, { Fragment, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoCartOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { ABoxAll } from "../../Components/Boxes";
import { SBackButtom, SSaveButtom } from "../../Components/Buttons";
import SLoading from "../../Components/Loading";
import { SubBar, SubBarLeft, SubBarRight } from "../../Components/SubBar";
import { AppContext } from "../../Contexts/AppContext";
import { Formik, Field, Form, useFormikContext, useField } from 'formik';
import schema from './schema';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import ptbr from "date-fns/locale/pt-BR";
import api from "../../Services/api";
import { AMessageError, AMessageSuccess } from "../../Components/Messages";
import moment from "moment";
registerLocale("ptbr", ptbr);

interface ColetaProps {
  idColeta: number | undefined,
  dataColeta: Date,
  loteId: string | undefined;
  aviarioId: string | undefined;
  coleta: string | undefined;
  limposNinho: string | undefined;
  sujosNinho: string | undefined;
  ovosCama: string | undefined;
  duasGemas: string | undefined;
  refugos: string | undefined;
  pequenos: string | undefined;
  cascaFina: string | undefined;
  frios: string | undefined;
  esmagadosQuebrados: string | undefined;
  camaNaoIncubaveis: string | undefined;
  deformados: string | undefined;
  sujosDeCama: string | undefined;
  trincados: string | undefined;
  eliminados: string | undefined;
  incubaveisBons: number | undefined,
  incubaveis: number | undefined,
  comerciais: number | undefined,
  posturaDia: number | undefined,
}
const EditColeta = () => {
  const location = useLocation().state as ColetaProps;

  const navigate = useNavigate();
  const { loading } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [allValuesForm, setAllValuesForm] = useState<any>();
  const [lotesAll, setLotesAll] = useState([]);
  const [aviarioLote, setAviarioLote] = useState([]);
  const [coletasAviario, setColetasAviario] = useState('0');

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
        locale='ptbr'
      />
    );
  };

  useEffect(() => {
    const getLotesAll = (async () => {
      await api.get('lotes')
        .then((response) => {
          setLotesAll(response.data.data);
        })
    });
    getLotesAll();
  }, []);

  useEffect(() => {
    const getAviarioLote = (async () => {
      if (allValuesForm && allValuesForm.loteId !== "") {
        await api.get('aviarios')
          .then((response) => {
            let aviarios = response.data.data.filter((fl: any) => (fl.loteId === parseInt(allValuesForm.loteId)));
            setAviarioLote(aviarios);
          })
      }
    });
    getAviarioLote();
  }, [allValuesForm])

  useEffect(() => {
    const getColetasAviario = (async () => {

      if (allValuesForm && allValuesForm.aviarioId !== "") {
        await api.get('coletas')
          .then((response) => {
            let coletas = response.data.data.filter((fa: any) => (fa.aviarioId === parseInt(allValuesForm.aviarioId)));
            setColetasAviario(coletas.length > 0 ? coletas.slice(-1)[0].coleta + 1 : 1);
          })
      }
    });
    getColetasAviario();
  }, [allValuesForm]);

  const onsubmit = async (values: any, { resetForm }: any) => {
    setLoadingSaveButton(true);
    await api.patch('coletas', {
      values: values
    }).then((response) => {
      resetForm();
      setTimeout(() => {
        setLoadingSaveButton(false);
        setPostMessageErro(false)
        setPostMessageSuccess(response.data.message);
      }, 500)
    }).catch((error) => {
      setPostMessageErro(false)
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
  }

  return (
    <Fragment>
      {loading &&
        <SLoading />
      }

      <SubBar>
        <>
          <SubBarLeft>
            <>
              <IconContext.Provider value={{ className: 'text-3xl' }} >
                <div>
                  <IoCartOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Coletas</h1>
            </>

          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-4">
              <button
                onFocus={() => navigate('/')}
                className="text-gray-600 "
              >
                <IconContext.Provider value={{ className: 'text-xl' }} >
                  <div>
                    <IoHome />
                  </div>
                </IconContext.Provider>
              </button>

              <span className="mx-2 text-gray-500 ">/</span>

              <button
                onFocus={() => navigate('/coletas')}
                className="text-gray-600  hover:underline"
              >
                Coletas
              </button>
              <span className="mx-2 text-gray-500 ">/</span>
              <span className="text-gray-600 ">Alterar</span>
            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>
        <div className="flex items-center justify-between mb-2">
          <div>
            <SBackButtom onClick={() => navigate('/coletas')} />
          </div>

        </div>
        <Formik

          validationSchema={schema}
          // validateOnBlur={false}
          // validateOnChange={false}
          onSubmit={onsubmit}
          initialValues={{
            idColeta: location.idColeta,
            dataColeta: moment(location.dataColeta),
            loteId: location.loteId,
            aviarioId: location.aviarioId,
            coleta: location.coleta,
            limposNinho: location.limposNinho,
            sujosNinho: location.sujosNinho,
            ovosCama: location.ovosCama,
            duasGemas: location.duasGemas,
            refugos: location.refugos,
            pequenos: location.pequenos,
            cascaFina: location.cascaFina,
            frios: location.frios,
            camaNaoIncubaveis: location.camaNaoIncubaveis,
            deformados: location.deformados,
            sujosDeCama: location.sujosDeCama,
            esmagadosQuebrados: location.esmagadosQuebrados,
            trincados: location.trincados,
            eliminados: location.eliminados,
            incubaveisBons: location.incubaveisBons,
            incubaveis: location.incubaveis,
            comerciais: location.comerciais,
            posturaDia: location.posturaDia,
          }}
        >
          {({ errors, isValid, values }) => (
            <Form autoComplete="off">
              <FormObserver />
              <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                {postMessageErro &&
                  <div>{<AMessageError className="rounded-lg">{postMessageErro}</AMessageError>}</div>
                }
                {postMessageSuccess &&
                  <div>{<AMessageSuccess className="rounded-lg">{postMessageSuccess}</AMessageSuccess>}</div>
                }

                <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                  <h1 className="font-lg text-white font-medium uppercase">Alterar coleta</h1>
                </div>

                <div className="md:grid md:grid-cols-4 md:gap-4 border border-gray-200 p-4 rounded-lg bg-gray-100">
                  <div>
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataColeta">Data e hora da coleta</label>
                    <DatePickerField
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.dataColeta ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="dataColeta"
                      name="dataColeta"
                      dateFormat="dd/MM/yyyy HH:mm:ss"
                      onFocus={(e: any) => e.target.blur()}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      timeCaption="Hora"
                    />
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="loteId">Lote</label>
                    <Field
                      as="select"
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.loteId ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="loteId"
                      name="loteId"
                      type="text"
                    >
                      <option value="">Selecione o Lote</option>
                      {lotesAll.map((lt: any, ilt: any) => (
                        <option value={lt.idLote}>{lt.lote}</option>
                      ))}
                    </Field>
                    {errors.loteId &&
                      <AMessageError className="rounded-b-lg">{errors.loteId}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="aviarioId">Aviário</label>
                    <Field
                      as="select"
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.aviarioId ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="aviarioId"
                      name="aviarioId"
                      type="text"
                    >
                      <option value="0">Selecione o aviário</option>
                      {aviarioLote.map((av: any, iav: any) => (
                        <option value={av.idAviario}>{av.aviario}</option>
                      ))}
                    </Field>
                    {errors.aviarioId &&
                      <AMessageError className="rounded-b-lg">{errors.aviarioId}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="coleta">Coleta</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.coleta ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="coleta"
                      name="coleta"
                      type="text"
                      value={values.coleta = coletasAviario}
                      readonly="true"
                    />
                    {errors.coleta &&
                      <AMessageError className="rounded-b-lg">{errors.coleta}</AMessageError>
                    }
                  </div>

                </div>

                <div className="md:grid md:grid-cols-4 md:gap-4 mt-4 border border-gray-200 p-4 rounded-lg bg-gray-100">
                  <div>
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="limposNinho">Limpos do ninho</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.limposNinho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="limposNinho"
                      name="limposNinho"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.limposNinho &&
                      <AMessageError className="rounded-b-lg">{errors.limposNinho}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="sujosNinho">Sujos do ninho</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.sujosNinho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="sujosNinho"
                      name="sujosNinho"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.sujosNinho &&
                      <AMessageError className="rounded-b-lg">{errors.sujosNinho}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="ovosCama">Cama incubáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.ovosCama ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="ovosCama"
                      name="ovosCama"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.ovosCama &&
                      <AMessageError className="rounded-b-lg">{errors.ovosCama}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="duasGemas">Duas gemas</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.duasGemas ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="duasGemas"
                      name="duasGemas"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.duasGemas &&
                      <AMessageError className="rounded-b-lg">{errors.duasGemas}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="pequenos">Pequenos</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.pequenos ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="pequenos"
                      name="pequenos"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.pequenos &&
                      <AMessageError className="rounded-b-lg">{errors.pequenos}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="trincados">Trincados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.trincados ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="trincados"
                      name="trincados"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.trincados &&
                      <AMessageError className="rounded-b-lg">{errors.trincados}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="cascaFina">Casca fina</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.cascaFina ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="cascaFina"
                      name="cascaFina"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.cascaFina &&
                      <AMessageError className="rounded-b-lg">{errors.cascaFina}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="deformados">Deformados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.deformados ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="deformados"
                      name="deformados"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.deformados &&
                      <AMessageError className="rounded-b-lg">{errors.deformados}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="frios">Frios</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.frios ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="frios"
                      name="frios"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.frios &&
                      <AMessageError className="rounded-b-lg">{errors.frios}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="sujosDeCama">Sujos não aproveitáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.sujosDeCama ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="sujosDeCama"
                      name="sujosDeCama"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.sujosDeCama &&
                      <AMessageError className="rounded-b-lg">{errors.sujosDeCama}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="esmagadosQuebrados">Esmagados e quebrados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.esmagadosQuebrados ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="esmagadosQuebrados"
                      name="esmagadosQuebrados"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.esmagadosQuebrados &&
                      <AMessageError className="rounded-b-lg">{errors.esmagadosQuebrados}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="camaNaoIncubaveis">Cama não incubáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.camaNaoIncubaveis ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="camaNaoIncubaveis"
                      name="camaNaoIncubaveis"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.camaNaoIncubaveis &&
                      <AMessageError className="rounded-b-lg">{errors.camaNaoIncubaveis}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="eliminados">Eliminados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.eliminados ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="eliminados"
                      name="eliminados"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.eliminados &&
                      <AMessageError className="rounded-b-lg">{errors.eliminados}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="refugos">Refugos</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.refugos ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="refugos"
                      name="refugos"
                      type="text"
                      onFocus={(e: any) => e.target.value}
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.refugos &&
                      <AMessageError className="rounded-b-lg">{errors.refugos}</AMessageError>
                    }
                  </div>

                </div>
                <div className="md:grid md:grid-cols-4 md:gap-4 mt-4 border border-gray-200 p-4 rounded-lg bg-gray-100">
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="incubaveisBons">Incubáveis bons</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.incubaveisBons ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="incubaveisBons"
                      name="incubaveisBons"
                      type="text"
                      readonly="true"
                      value={values.incubaveisBons =
                        (
                          parseInt(values.limposNinho ? values.limposNinho : '0') +
                          parseInt(values.sujosNinho ? values.sujosNinho : '0')
                        )
                      }
                    />
                    {errors.incubaveisBons &&
                      <AMessageError className="rounded-b-lg">{errors.incubaveisBons}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="incubaveis">Incubáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.incubaveis ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="incubaveis"
                      name="incubaveis"
                      type="text"
                      readonly="true"
                      value={values.incubaveis =
                        (
                          parseInt(values.limposNinho ? values.limposNinho : '0') +
                          parseInt(values.sujosNinho ? values.sujosNinho : '0') +
                          parseInt(values.ovosCama ? values.ovosCama : '0')
                        )
                      }
                    />
                    {errors.incubaveis &&
                      <AMessageError className="rounded-b-lg">{errors.incubaveis}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="comerciais">Comerciais</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.comerciais ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="comerciais"
                      name="comerciais"
                      type="text"
                      readonly="true"
                      value={values.comerciais =
                        (
                          parseInt(values.duasGemas ? values.duasGemas : '0') +
                          parseInt(values.pequenos ? values.pequenos : '0') +
                          parseInt(values.trincados ? values.trincados : '0') +
                          parseInt(values.cascaFina ? values.cascaFina : '0') +
                          parseInt(values.deformados ? values.deformados : '0') +
                          parseInt(values.frios ? values.frios : '0') +
                          parseInt(values.sujosDeCama ? values.sujosDeCama : '0') +
                          parseInt(values.camaNaoIncubaveis ? values.camaNaoIncubaveis : '0') +
                          parseInt(values.refugos ? values.refugos : '0')
                        )
                      }
                    />
                    {errors.comerciais &&
                      <AMessageError className="rounded-b-lg">{errors.comerciais}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="posturaDia">Postura do dia</label>

                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.posturaDia ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="posturaDia"
                      name="posturaDia"
                      type="text"
                      readonly="true"
                      value={values.posturaDia =
                        (
                          parseInt(values.limposNinho ? values.limposNinho : '0') +
                          parseInt(values.sujosNinho ? values.sujosNinho : '0') +
                          parseInt(values.ovosCama ? values.ovosCama : '0') +
                          parseInt(values.duasGemas ? values.duasGemas : '0') +
                          parseInt(values.pequenos ? values.pequenos : '0') +
                          parseInt(values.trincados ? values.trincados : '0') +
                          parseInt(values.cascaFina ? values.cascaFina : '0') +
                          parseInt(values.deformados ? values.deformados : '0') +
                          parseInt(values.frios ? values.frios : '0') +
                          parseInt(values.sujosDeCama ? values.sujosDeCama : '0') +
                          parseInt(values.esmagadosQuebrados ? values.esmagadosQuebrados : '0') +
                          parseInt(values.camaNaoIncubaveis ? values.camaNaoIncubaveis : '0') +
                          parseInt(values.eliminados ? values.eliminados : '0') +
                          parseInt(values.refugos ? values.refugos : '0')
                        )
                      }
                    />
                    {errors.posturaDia &&
                      <AMessageError className="rounded-b-lg">{errors.posturaDia}</AMessageError>
                    }
                  </div>

                </div>

              </div>
              <div className="flex items-center justify-end bg-white border-x border-b rounded-b-lg py-2 pr-2">
                <SSaveButtom loading={loadingSaveButton} disabled={!isValid} />
              </div>
            </Form>
          )}
        </Formik>
      </ABoxAll>
    </Fragment>
  )
}

export default EditColeta;