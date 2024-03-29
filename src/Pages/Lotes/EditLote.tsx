import React, { Fragment, useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoFileTrayStackedOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
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
import moment from "moment";
import "animate.css";
import { AMessageError, AMessageSuccess } from "../../Components/Messages";
registerLocale("ptbr", ptbr);

interface LoteProps {
  idLote: number;
  lote: string,
  dataEntrada: Date,
  femea: number,
  macho: number,
  dataCapitalizada: Date,
  femeaCapitalizada: number,
  machoCapitalizado: number
}

const EditLote = () => {
  const navigate = useNavigate();
  const location = useLocation().state as LoteProps;

  const { loading, handleKeyPress } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);
  const [openCapitalizadas, setOpenCapitalizadas] = useState<boolean>(false);
  const [loteExist, setLoteExist] = useState(false);

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

  const onsubmit = async (values: any) => {
    await api.get('lotes')
      .then((response) => {
        const exist = response.data.data.filter((act: any) => ((act.lote).toUpperCase() === (values.lote).toUpperCase() && act.idLote !== location.idLote));
        if (exist.length) {
          setLoteExist(true);
        } else {
          setLoteExist(false);
          setLoadingSaveButton(true);
          api.patch('lotes', {
            idLote: location.idLote,
            lote: values.lote,
            dataEntrada: values.dataEntrada,
            femea: values.femea,
            macho: values.macho,
            dataCapitalizacao: values.dataCapitalizacao,
            femeaCapitalizada: values.femeaCapitalizada === '' ? null : values.femeaCapitalizada,
            machoCapitalizado: values.machoCapitalizado === '' ? null : values.machoCapitalizado,
          })
            .then((response) => {
              setTimeout(() => {
                setLoadingSaveButton(false);
                setPostMessageErro(false)
                setPostMessageSuccess(response.data.message);
              }, 500);
            }).catch((err) => {
              setPostMessageErro(false)
              setLoadingSaveButton(false);

            });
          }
        })
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
                    <IoFileTrayStackedOutline />
                  </div>
                </IconContext.Provider>
                <h1 className='text-2xl ml-1 font-medium'>Lotes</h1>
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
                  onClick={() => navigate('/lotes')}
                  className="text-gray-600  hover:underline"
                >
                  Lotes
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
              <SBackButtom onClick={() => navigate('/lotes')} />
            </div>
          </div>
          <Formik
            validationSchema={schema}
            initialValues={{
              idLote: location.idLote,
              lote: location.lote,
              dataEntrada: moment(location.dataEntrada),
              femea: location.femea,
              macho: location.macho,
              dataCapitalizada: moment(location.dataCapitalizada),
              femeaCapitalizada: location.femeaCapitalizada,
              machoCapitalizado: location.machoCapitalizado,
            }}
            onSubmit={onsubmit}
          >
            {({ errors, isValid }) => (
              <Form autoComplete="off" >

                <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                  {postMessageErro &&
                    <div>{<AMessageError className="rounded-lg">{postMessageErro}</AMessageError>}</div>
                  }
                  {postMessageSuccess &&
                    <div>{<AMessageSuccess className="rounded-lg">{postMessageSuccess}</AMessageSuccess>}</div>
                  }

                  <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                    <h1 className="font-lg text-white font-medium uppercase">Alterar lote</h1>
                  </div>
                  <Field id="idLote" name="idLote" type="hidden" />
                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="lote">Identificador do lote</label>
                    <Field
                      className={`w-full px-4 py-2 uppercase text-gray-700 bg-gray-50 border border-gray-200 ${errors.lote ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="lote"
                      name="lote"
                      type="text"
                      autoFocus
                    />
                    {errors.lote &&
                      <AMessageError className="rounded-b-lg">{errors.lote}</AMessageError>
                    }
                    {loteExist &&
                      <AMessageError className="rounded-b-lg">Lote existente na base de dados, insira um identificador diferente!</AMessageError>
                    }
                  </div>

                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataEntrada">Data de chegada</label>
                    <DatePickerField
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.dataEntrada ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="dataEntrada"
                      name="dataEntrada"
                      dateFormat="dd/MM/yyyy"
                      onFocus={(e: any) => e.target.blur()}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="femea">Número de fêmeas</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.femea ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="femea"
                      name="femea"
                      type="text"
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.femea &&
                      <AMessageError className="rounded-b-lg">{errors.femea}</AMessageError>
                    }
                  </div>

                  <div className="mt-4">
                    <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="macho">Número de machos</label>
                    <Field
                      className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.macho ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                      id="macho"
                      name="macho"
                      type="text"
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    {errors.macho &&
                      <AMessageError className="rounded-b-lg">{errors.macho}</AMessageError>
                    }
                  </div>

                  <div onClick={() => setOpenCapitalizadas(!openCapitalizadas)} className="cursor-pointer flex items-center justify-between mt-8 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                    <h1 className="font-lg text-white uppercase">Capitalização de aves</h1>
                    <IconContext.Provider value={{ className: 'text-xl mr-4 text-white font-bold' }} >
                      <div>
                        {openCapitalizadas ? <IoChevronUp /> : <IoChevronDown />}
                      </div>
                    </IconContext.Provider>
                  </div>

                  <div className={`${openCapitalizadas ? 'flex-col animate__animated animate__fadeIn' : 'hidden'}`}>
                    <div className="mt-4">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataCapitalizada">Data de capitalização</label>
                      <DatePickerField
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.dataCapitalizada ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="dataCapitalizada"
                        name="dataCapitalizada"
                        dateFormat="dd/MM/yyyy"
                        onFocus={(e: any) => e.target.blur()}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="femeaCapitalizada">Fêmeas capitalizadas</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.femeaCapitalizada ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="femeaCapitalizada"
                        name="femeaCapitalizada"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.femeaCapitalizada &&
                        <AMessageError className="rounded-b-lg">{errors.femeaCapitalizada}</AMessageError>
                      }
                    </div>

                    <div className="mt-4">
                      <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="machoCapitalizado">Machos capitalizados</label>
                      <Field
                        className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.machoCapitalizado ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                        id="machoCapitalizado"
                        name="machoCapitalizado"
                        type="text"
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                      {errors.machoCapitalizado &&
                        <AMessageError className="rounded-b-lg">{errors.machoCapitalizado}</AMessageError>
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

  export default EditLote;