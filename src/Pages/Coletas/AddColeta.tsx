import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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
import moment from "moment";
import { AMessageError, AMessageSuccess } from "../../Components/Messages";
registerLocale("ptbr", ptbr);

const AddColeta = () => {
  const navigate = useNavigate();
  const { loading } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [allValuesForm, setAllValuesForm] = useState<any>();
  const [lotesAll, setLotesAll] = useState([]);
  const [aviarioLote, setAviarioLote] = useState([]);
  const [coletasAviario, setColetasAviario] = useState(0);


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

  const FormObserver = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      setAllValuesForm(values);
    }, [values]);

    return null;
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
      const response = await api.get('aviarios')
      let aviarios = response.data.data.filter((fl: any) => (fl.loteId === parseInt(allValuesForm.loteId)));
      setAviarioLote(aviarios);
    });
    getAviarioLote();
  }, [allValuesForm])

  useEffect(() => {
    const getColetasAviario = (async () => {
      await api.get('coletas')
        .then((response) => {
          let coletas = response.data.data.filter((fa: any) => (fa.aviarioId === parseInt(allValuesForm.aviarioId)));
          setColetasAviario(coletas[coletas.length -1].coleta);
        })
    });
    getColetasAviario();
  }, [allValuesForm]);

  const onsubmit = async (values: any) => {
    setLoadingSaveButton(true);
    setTimeout(() => {
      setLoadingSaveButton(false);
    }, 500)

  };

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
                onClick={() => navigate('/')}
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
                onClick={() => navigate('/coletas')}
                className="text-gray-600  hover:underline"
              >
                Coletas
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
            <SBackButtom onClick={() => navigate('/coletas')} />
          </div>

        </div>
        <Formik
          validationSchema={schema}
          onSubmit={onsubmit}
          initialValues={{
            dataColeta: new Date(),
            loteId: '0',
            aviarioId: '0',
            coleta: '0',
            limposNinho: '0',
            sujosNinho: '0',
            ovosCama: '0',
            duasGemas: '0',
            refugos: '0',
            pequenos: '0',
            cascaFina: '0',
            frios: '0',
            esmagadosQuebrados: '0',
            camaNaoIncubaveis: '0',
            deformados: '0',
            sujosDeCama: '0',
            trincados: '0',
            eliminados: '0',
            incubaveisBons: '0',
            incubaveis: '0',
            comerciais: '0',
            posturaDia: '0',

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
                  <h1 className="font-lg text-white font-medium uppercase">Cadastro de coletas</h1>
                </div>

                <div className="md:grid md:grid-cols-4 md:gap-4 border border-gray-200 p-4 rounded-lg">
                  <div>
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataColeta">Data e hora da coleta</label>
                    <DatePickerField
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.dataColeta ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
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
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.loteId ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
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
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.aviarioId ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
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
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.coleta ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="coleta"
                      name="coleta"
                      type="text"
                      value={coletasAviario}
                    />
                    {errors.coleta &&
                      <AMessageError className="rounded-b-lg">{errors.coleta}</AMessageError>
                    }
                  </div>

                </div>

                <div className="md:grid md:grid-cols-4 md:gap-4 mt-4 border border-gray-200 p-4 rounded-lg">
                  <div>
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="limposNinho">Limpos do ninho</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.limposNinho ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="limposNinho"
                      name="limposNinho"
                      type="text"
                    />
                    {errors.limposNinho &&
                      <AMessageError className="rounded-b-lg">{errors.limposNinho}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="sujosNinho">Sujos do ninho</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.sujosNinho ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="sujosNinho"
                      name="sujosNinho"
                      type="text"
                    />
                    {errors.sujosNinho &&
                      <AMessageError className="rounded-b-lg">{errors.sujosNinho}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="ovosCama">Cama incubáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.ovosCama ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="ovosCama"
                      name="ovosCama"
                      type="text"
                    />
                    {errors.ovosCama &&
                      <AMessageError className="rounded-b-lg">{errors.ovosCama}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="duasGemas">Duas gemas</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.duasGemas ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="duasGemas"
                      name="duasGemas"
                      type="text"
                    />
                    {errors.duasGemas &&
                      <AMessageError className="rounded-b-lg">{errors.duasGemas}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="pequenos">Pequenos</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.pequenos ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="pequenos"
                      name="pequenos"
                      type="text"
                    />
                    {errors.pequenos &&
                      <AMessageError className="rounded-b-lg">{errors.pequenos}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="trincados">Trincados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.trincados ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="trincados"
                      name="trincados"
                      type="text"
                    />
                    {errors.trincados &&
                      <AMessageError className="rounded-b-lg">{errors.trincados}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="cascaFina">Casca fina</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.cascaFina ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="cascaFina"
                      name="cascaFina"
                      type="text"
                    />
                    {errors.cascaFina &&
                      <AMessageError className="rounded-b-lg">{errors.cascaFina}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="deformados">Deformados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.deformados ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="deformados"
                      name="deformados"
                      type="text"
                    />
                    {errors.deformados &&
                      <AMessageError className="rounded-b-lg">{errors.deformados}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="frios">Frios</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.frios ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="frios"
                      name="frios"
                      type="text"
                    />
                    {errors.frios &&
                      <AMessageError className="rounded-b-lg">{errors.frios}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="sujosDeCama">Sujos não aproveitáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.sujosDeCama ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="sujosDeCama"
                      name="sujosDeCama"
                      type="text"
                    />
                    {errors.sujosDeCama &&
                      <AMessageError className="rounded-b-lg">{errors.sujosDeCama}</AMessageError>
                    }
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="esmagadosQuebrados">Esmagados e quebrados</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.esmagadosQuebrados ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="esmagadosQuebrados"
                      name="esmagadosQuebrados"
                      type="text"
                    />
                    {errors.esmagadosQuebrados &&
                      <AMessageError className="rounded-b-lg">{errors.esmagadosQuebrados}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="camaNaoIncubaveis">Cama não incubáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.camaNaoIncubaveis ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="camaNaoIncubaveis"
                      name="camaNaoIncubaveis"
                      type="text"
                    />
                    {errors.camaNaoIncubaveis &&
                      <AMessageError className="rounded-b-lg">{errors.camaNaoIncubaveis}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="incubaveisBons">Incubáveis bons</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.incubaveisBons ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="incubaveisBons"
                      name="incubaveisBons"
                      type="text"
                    />
                    {errors.incubaveisBons &&
                      <AMessageError className="rounded-b-lg">{errors.incubaveisBons}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="incubaveis">Incubáveis</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.incubaveis ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="incubaveis"
                      name="incubaveis"
                      type="text"
                    />
                    {errors.incubaveis &&
                      <AMessageError className="rounded-b-lg">{errors.incubaveis}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="comerciais">Comerciais</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.comerciais ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="comerciais"
                      name="comerciais"
                      type="text"
                    />
                    {errors.comerciais &&
                      <AMessageError className="rounded-b-lg">{errors.comerciais}</AMessageError>
                    }
                  </div>

                  <div className="mt-4 md:mt-0">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="posturaDia">Postura do dia</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.posturaDia ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="posturaDia"
                      name="posturaDia"
                      type="text"
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

export default AddColeta;