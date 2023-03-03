import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoFileTrayOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ABoxAll } from "../../Components/Boxes";
import { SBackButtom, SSaveButtom } from "../../Components/Buttons";
import SLoading from "../../Components/Loading";
import { SubBar, SubBarLeft, SubBarRight } from "../../Components/SubBar";
import { AppContext } from "../../Contexts/AppContext";
import { Formik, Field, Form, useFormikContext, useField, useFormik, FormikHelpers, FormikValues, } from 'formik';
import schema from './schema';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import ptbr from "date-fns/locale/pt-BR";
import api from "../../Services/api";
import "animate.css";
import { AMessageError, AMessageSuccess } from "../../Components/Messages";

registerLocale("ptbr", ptbr);

const AddAviario = () => {

  const navigate = useNavigate();
  const { loading } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [listLotes, setListLotes] = useState([]);
  const [activeCiclo, setActiveCiclo] = useState<any>();
  const [idCicloAtivo, setIdCicloAtivo] = useState();

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
        locale='ptbr'
      />
    );
  };

  useEffect(() => {
    const getLotes = (async () => {
      await api.get('lotes')
        .then((reponse) => {
          const lotes = reponse.data.data;
          setListLotes(lotes);
        });
    });
    getLotes();
  }, []);

  useEffect(() => {
    const getCiclos = (async () => {
      await api.get('ciclos')
        .then((res) => {
          const active = res.data.data.filter((act: any) => (act.ativo === true));
          setIdCicloAtivo(active[0].idCiclo);
          setActiveCiclo(active.length > 0 ? true : false);
          if (active.length > 0) {
            if (active[0].ativo) {
              setActiveCiclo(active[0].idCiclo)
            }
          }
        });
    });
    getCiclos();
  }, []);

  const onsubmit = async (values: any) => {
    setLoadingSaveButton(true);
    api.post('aviarios', {
      cicloId: idCicloAtivo,
      loteId: values.loteId,
      aviario: values.aviario,
      dataEntrada: values.dataEntrada,
      box1Femea: values.box1Femea,
      box2Femea: values.box2Femea,
      box3Femea: values.box3Femea,
      box4Femea: values.box4Femea,
      box1Macho: values.box1Macho,
      box2Macho: values.box2Macho,
      box3Macho: values.box3Macho,
      box4Macho: values.box4Macho,
    }).then((response) => {
      setTimeout(() => {
        setLoadingSaveButton(false);
        setPostMessageErro(false)
        setPostMessageSuccess(response.data.message);
      }, 500);
    }).catch((err) => {
      setPostMessageErro(false)
      setLoadingSaveButton(false);
    });
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
                  <IoFileTrayOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Aviários</h1>
            </>
          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600"
              >
                <IconContext.Provider value={{ className: 'text-xl' }} >
                  <div>
                    <IoHome />
                  </div>
                </IconContext.Provider>
              </button>
              <span className="mx-2 text-gray-500 ">/</span>
              <button
                onClick={() => navigate('/aviarios')}
                className="text-gray-600  hover:underline"
              >
                Aviários
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
            <SBackButtom onClick={() => navigate('/aviarios')} />
          </div>
        </div>

        {!activeCiclo
          ? <AMessageError className="rounded-t-lg">Para cadastrar aviários os ciclos deverão estar cadastrados e ativos</AMessageError>
          : <Formik

            validationSchema={schema}
            onSubmit={onsubmit}
            initialValues={{
              cicloId: '',
              loteId: '',
              aviario: '',
              dataEntrada: new Date(),
              box1Femea: '',
              box2Femea: '',
              box3Femea: '',
              box4Femea: '',
              box1Macho: '',
              box2Macho: '',
              box3Macho: '',
              box4Macho: '',
            }}
          >
            {({ errors, isValid, values, handleChange, handleBlur }) => (

              <Form autoComplete="off" >

                <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                  {postMessageErro &&
                    <div>{<AMessageError className="rounded-lg">{postMessageErro}</AMessageError>}</div>
                  }
                  {postMessageSuccess &&
                    <div>{<AMessageSuccess className="rounded-lg">{postMessageSuccess}</AMessageSuccess>}</div>
                  }

                  <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                    <h1 className="font-lg text-white font-medium uppercase">Cadastrar aviário{values.loteId}</h1>
                  </div>
                  <Field id="idLote" name="idLote" type="hidden" />
                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="aviario">Identificador do aviário</label>
                    <Field
                      className={`w-full px-4 py-2 uppercase text-gray-700 bg-gray-50 border border-gray-200 ${errors.aviario ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="aviario"
                      name="aviario"
                      type="text"
                      autoFocus
                    />
                    {errors.aviario &&
                      <AMessageError className="rounded-b-lg">{errors.aviario}</AMessageError>
                    }
                  </div>

                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataEntrada">Data de chegada</label>
                    <DatePickerField
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.dataEntrada ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="dataEntrada"
                      name="dataEntrada"
                      dateFormat="dd/MM/yyyy"
                      onFocus={(e: any) => e.target.blur()}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="loteId">Lotes</label>
                    <Field
                      as="select"
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.loteId ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="loteId"
                      name="loteId"
                    >
                      <option value="">Selecione um lote</option>
                      {listLotes.map((lt: any, ilt: any) => (
                        <option key={ilt} value={lt.idLote}>{lt.lote}</option>
                      ))}
                    </Field>
                    {errors.loteId &&
                      <AMessageError className="rounded-b-lg">{errors.loteId}</AMessageError>
                    }
                  </div>

                  {/* Cadastro aves fêmeas ************************************************************** */}
                  <div className="flex items-center mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">Cadastro de fêmeas</span>
                    {values.loteId &&
                      <div className="flex items-center animate__animated animate__fadeIn ">
                        <span className="ml-4 font-medium text-xs">Disponíveis</span>
                        <span className="text-blue-500 ml-1 font-medium text-sm px-2 rounded-t-lg">
                          {
                            listLotes.filter((mf: any) => (mf.idLote == values.loteId)).map((mc: any) => (
                              mc.femeaCapitalizada -
                              (
                                parseInt(values.box1Femea ? values.box1Femea : '0') +
                                parseInt(values.box2Femea ? values.box2Femea : '0') +
                                parseInt(values.box3Femea ? values.box3Femea : '0') +
                                parseInt(values.box4Femea ? values.box4Femea : '0')
                              )
                            ))
                          }
                        </span>
                      </div>
                    }

                  </div>
                  <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box1Femea">Box 1</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box1Femea ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box1Femea"
                        name="box1Femea"
                        type="text"
                      />
                      {errors.box1Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box1Femea}</AMessageError>
                      }
                    </div>

                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box2Femea">Box 2</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box2Femea ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box2Femea"
                        name="box2Femea"
                        type="text"
                      />
                      {errors.box2Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box2Femea}</AMessageError>
                      }
                    </div>

                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box3Femea">Box 3</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box3Femea ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box3Femea"
                        name="box3Femea"
                        type="text"
                      />
                      {errors.box3Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box3Femea}</AMessageError>
                      }
                    </div>

                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box4Femea">Box 4</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box4Femea ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box4Femea"
                        name="box4Femea"
                        type="text"
                      />
                      {errors.box4Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box4Femea}</AMessageError>
                      }
                    </div>
                  </div>

                  {/* Cadastro aves machos ************************************************************** */}
                  <div className="flex mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">Cadastro de machos</span>
                    {values.loteId &&
                      <div className="flex items-center animate__animated animate__fadeIn ">
                        <span className="ml-4 font-medium text-xs">Disponíveis</span>
                        <span className="text-blue-500 ml-1 font-medium text-sm px-2 rounded-t-lg">
                          {listLotes.filter((mf: any) => (mf.idLote == values.loteId)).map((mc: any) => (
                            mc.machoCapitalizado -
                            (
                              parseInt(values.box1Macho ? values.box1Macho : '0') +
                              parseInt(values.box2Macho ? values.box2Macho : '0') +
                              parseInt(values.box3Macho ? values.box3Macho : '0') +
                              parseInt(values.box4Macho ? values.box4Macho : '0')
                            )
                          ))}
                        </span>
                      </div>
                    }
                  </div>
                  <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box1Macho">Box 1</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box1Macho ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box1Macho"
                        name="box1Macho"
                        type="text"
                      />
                      {errors.box1Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box1Macho}</AMessageError>
                      }
                    </div>
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box2Macho">Box 2</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box2Macho ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box2Macho"
                        name="box2Macho"
                        type="text"
                      />
                      {errors.box2Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box2Macho}</AMessageError>
                      }
                    </div>
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box3Macho">Box 3</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box3Macho ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box3Macho"
                        name="box3Macho"
                        type="text"
                      />
                      {errors.box3Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box3Macho}</AMessageError>
                      }
                    </div>
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box4Macho">Box 4</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box4Macho ? 'rounded-t-md' : 'rounded-md'} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box4Macho"
                        name="box4Macho"
                        type="text"
                      />
                      {errors.box4Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box4Macho}</AMessageError>
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
        }
      </ABoxAll>
    </Fragment>
  )
}

export default AddAviario;