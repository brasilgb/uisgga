import React, { Fragment, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { ABoxAll } from "../../../Components/Boxes";
import { SBackButtom, SSaveButtom } from "../../../Components/Buttons";
import SLoading from "../../../Components/Loading";
import { SubBar, SubBarLeft, SubBarRight } from "../../../Components/SubBar";
import { AppContext } from "../../../Contexts/AppContext";
import { Formik, Field, Form, useFormikContext, useField } from 'formik';
import schema from './schema';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import ptbr from "date-fns/locale/pt-BR";
import api from "../../../Services/api";
import "animate.css";
import { AMessageError, AMessageSuccess } from "../../../Components/Messages";
import { GiChicken } from "react-icons/gi";
import moment from "moment";

registerLocale("ptbr", ptbr);
interface PesagemProps {
  idPesagem: number;
  cicloId: number;
  loteId: string;
  aviarioId: string;
  dataPesagem: Date,
  semana: string;
  box1Femea: string;
  box2Femea: string;
  box3Femea: string;
  box4Femea: string;
  box1Macho: string;
  box2Macho: string;
  box3Macho: string;
  box4Macho: string;
}
const EditRecebimento = () => {
  const location = useLocation().state as PesagemProps;
  const navigate = useNavigate();

  const { loading } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [listLotes, setListLotes] = useState([]);
  const [listMetas, setListMetas] = useState([]);
  const [activeCiclo, setActiveCiclo] = useState<any>();
  const [aviarioLote, setAviarioLote] = useState([]);
  const [allValuesForm, setAllValuesForm] = useState<any>();

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
    const getMetas = (async () => {
      await api.get('metas')
        .then((reponse) => {
          const lotes = reponse.data.data;
          setListMetas(lotes);
        });
    });
    getMetas();
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

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      var form = e.target.form;
      var index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  const FormObserver = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      setAllValuesForm(values);
    }, [values]);
    return null;
  };

  const onsubmit = async (values: PesagemProps) => {
    setLoadingSaveButton(true);
    api.patch('pesagens', {
      data: values
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
                  <GiChicken />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Pesagens</h1>
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
                onClick={() => navigate('/pesagens')}
                className="text-gray-600  hover:underline"
              >
                Pesagens
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
            <SBackButtom onClick={() => navigate('/pesagens')} />
          </div>
        </div>

        {!activeCiclo
          ? <AMessageError className="rounded-t-lg">Para cadastrar pesagens os ciclos deverão estar cadastrados e ativos</AMessageError>
          : <Formik

            validationSchema={schema}
            onSubmit={onsubmit}
            initialValues={{
              idPesagem: location.idPesagem,
              cicloId: location.cicloId,
              loteId: location.loteId,
              aviarioId: location.aviarioId,
              dataPesagem: location.dataPesagem,
              semana: location.semana,
              box1Femea: location.box1Femea,
              box2Femea: location.box2Femea,
              box3Femea: location.box3Femea,
              box4Femea: location.box4Femea,
              box1Macho: location.box1Macho,
              box2Macho: location.box2Macho,
              box3Macho: location.box3Macho,
              box4Macho: location.box4Macho,
            }}
          >
            {({ errors, isValid, values, handleChange, handleBlur }) => (

              <Form autoComplete="off" >
                <FormObserver />
                <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                  {postMessageErro &&
                    <div>{<AMessageError className="rounded-lg">{postMessageErro}</AMessageError>}</div>
                  }
                  {postMessageSuccess &&
                    <div>{<AMessageSuccess className="rounded-lg">{postMessageSuccess}</AMessageSuccess>}</div>
                  }

                  <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                    <h1 className="font-lg text-white font-medium uppercase">Adicioanar pesagem</h1>
                  </div>
                  <div className="grid grid-cols-4 gap-8">

                    <div className="mt-4">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataPesagem">Data de pesagem</label>
                      <DatePickerField
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.dataPesagem ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="dataPesagem"
                        name="dataPesagem"
                        value={moment(values.dataPesagem).format("DD/MM/YYYY")}
                        dateFormat="dd/MM/yyyy"
                        onFocus={(e: any) => e.target.blur()}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="loteId">Lote</label>
                      <Field
                        as="select"
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.loteId ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
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

                    <div className="mt-4">
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
                          <option key={iav} value={av.idAviario}>{av.aviario}</option>
                        ))}
                      </Field>
                      {errors.aviarioId &&
                        <AMessageError className="rounded-b-lg">{errors.aviarioId}</AMessageError>
                      }
                    </div>

                    <div className="mt-4">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="aviarioId">Semanas</label>
                      <Field
                        as="select"
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${errors.semana ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="semana"
                        name="semana"
                      >
                        <option value="">Selecione a semana</option>
                        {listMetas.map((me: any, ime: any) => (
                          <option key={ime} value={me.semana}>{me.semana}</option>
                        ))}
                      </Field>
                      {errors.semana &&
                        <AMessageError className="rounded-b-lg">{errors.semana}</AMessageError>
                      }
                    </div>


                  </div>
                  {/* Cadastro aves fêmeas ************************************************************** */}
                  <div className="flex items-center mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">Pesagem de fêmeas</span>

                  </div>
                  <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box1Femea">Box 1</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box1Femea ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box1Femea"
                        name="box1Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box1Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box1Femea}</AMessageError>
                      }
                    </div>

                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box2Femea">Box 2</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box2Femea ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box2Femea"
                        name="box2Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box2Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box2Femea}</AMessageError>
                      }
                    </div>

                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box3Femea">Box 3</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box3Femea ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box3Femea"
                        name="box3Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box3Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box3Femea}</AMessageError>
                      }
                    </div>

                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box4Femea">Box 4</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box4Femea ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box4Femea"
                        name="box4Femea"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box4Femea &&
                        <AMessageError className="rounded-b-lg">{errors.box4Femea}</AMessageError>
                      }
                    </div>
                  </div>

                  {/* Cadastro aves machos ************************************************************** */}
                  <div className="flex mb-6 mt-10 pt-1 pl-2 rounded-t-md border-b-2 border-l-8 border-blue-600">
                    <span className="text-gray-800 font-medium text-sm uppercase">Pesagem de machos</span>
                  </div>
                  <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box1Macho">Box 1</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box1Macho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box1Macho"
                        name="box1Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box1Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box1Macho}</AMessageError>
                      }
                    </div>
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box2Macho">Box 2</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box2Macho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box2Macho"
                        name="box2Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box2Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box2Macho}</AMessageError>
                      }
                    </div>
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box3Macho">Box 3</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box3Macho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box3Macho"
                        name="box3Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.box3Macho &&
                        <AMessageError className="rounded-b-lg">{errors.box3Macho}</AMessageError>
                      }
                    </div>
                    <div>
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="box4Macho">Box 4</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.box4Macho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="box4Macho"
                        name="box4Macho"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
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

export default EditRecebimento;