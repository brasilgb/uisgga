import React, { Fragment, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoFileTrayOutline } from "react-icons/io5";
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
import "animate.css";
import { AMessageError, AMessageSuccess } from "../../Components/Messages";
import moment from "moment";
registerLocale("ptbr", ptbr);

interface EnviosProps {
  idEnvio: number;
  dataEnvio: Date;
  loteId: string;
  incubaveis: string;
  comerciais: string;
  totalEnvio: number;
}

const EditEnvio = () => {
  const location = useLocation().state as EnviosProps;

  const navigate = useNavigate();
  const { loading } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [listLotes, setListLotes] = useState([]);
  const [activeCiclo, setActiveCiclo] = useState<any>();

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
    api.patch('envios', {
      values: values
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
                  <IoFileTrayOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Envios</h1>
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
                onClick={() => navigate('/envios')}
                className="text-gray-600  hover:underline"
              >
                Envios
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
            <SBackButtom onClick={() => navigate('/envios')} />
          </div>
        </div>

        {!activeCiclo
          ? <AMessageError className="rounded-t-lg">Para adicionar aviários os ciclos deverão estar cadastrados e ativos</AMessageError>
          : <Formik

            validationSchema={schema}
            onSubmit={onsubmit}
            initialValues={{
              idEnvio: location.idEnvio,
              dataEnvio: moment(location.dataEnvio),
              loteId: location.loteId,
              incubaveis: location.incubaveis,
              comerciais: location.comerciais,
              totalEnvio: location.totalEnvio,
            }}
          >
            {({ errors, isValid, values, handleChange, handleBlur }) => (

              <Form autoComplete="off">

                <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                  {postMessageErro &&
                    <div>{<AMessageError className="rounded-lg">{postMessageErro}</AMessageError>}</div>
                  }
                  {postMessageSuccess &&
                    <div>{<AMessageSuccess className="rounded-lg">{postMessageSuccess}</AMessageSuccess>}</div>
                  }

                  <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                    <h1 className="font-lg text-white font-medium uppercase">Alterar envio</h1>
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-4 border border-gray-200 p-4 rounded-lg bg-gray-100">
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataEnvio">Data e hora do envio</label>
                      <DatePickerField
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.dataEnvio ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="dataEnvio"
                        name="dataEnvio"
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
                        {listLotes.map((lt: any, ilt: any) => (
                          <option value={lt.idLote}>{lt.lote}</option>
                        ))}
                      </Field>
                      {errors.loteId &&
                        <AMessageError className="rounded-b-lg">{errors.loteId}</AMessageError>
                      }
                    </div>

                  </div>

                  <div className="md:grid md:grid-cols-3 md:gap-4 mt-4 border border-gray-200 p-4 rounded-lg bg-gray-100">
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="incubaveis">Incubáveis</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.incubaveis ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="incubaveis"
                        name="incubaveis"
                        type="text"
                        onFocus={(e: any) => e.target.value}
                        onKeyPress={(e: any) => handleKeyPress(e)}
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
                        onFocus={(e: any) => e.target.value}
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.comerciais &&
                        <AMessageError className="rounded-b-lg">{errors.comerciais}</AMessageError>
                      }
                    </div>
                    <div className="mt-4 md:mt-0">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="totalEnvio">Total à enviar</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.totalEnvio ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="totalEnvio"
                        name="totalEnvio"
                        type="text"
                        onFocus={(e: any) => e.target.value}
                        onKeyPress={(e: any) => handleKeyPress(e)}
                        value={values.totalEnvio = parseInt(values.incubaveis ? values.incubaveis : '0') + parseInt(values.comerciais ? values.comerciais : '0')}
                      />
                      {errors.totalEnvio &&
                        <AMessageError className="rounded-b-lg">{errors.totalEnvio}</AMessageError>
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

export default EditEnvio;