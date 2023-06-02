import React, { Fragment, useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoTimerOutline } from "react-icons/io5";
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

const AddCiclo = () => {
  const navigate = useNavigate();
  const { loading, setCicloActive } = useContext(AppContext);
  const [loadingSaveButton, setLoadingSaveButton] = useState<boolean>(false);
  const [postMessageErro, setPostMessageErro] = useState<any>(false);
  const [postMessageSuccess, setPostMessageSuccess] = useState<any>(false);

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
    setLoadingSaveButton(true);
    let datainicial = moment(values.dataInicial).format("YYYY-MM-DD");
    await api.get(`date/${datainicial}`, {
      headers: {
        // "Authorization": `Bearer ${user.Token}` 
      }
    })
      .then((result) => {
        const response = result.data.data
        if (response.length > 0) {
          setLoadingSaveButton(false);
          setPostMessageSuccess(false);
          setPostMessageErro("Existe um ciclo cadastrado para esta data");
        } else {

          api.post('ciclos', {
            dataInicial: moment(values.dataInicial).format('YYYY-MM-DD'),
            dataFinal: moment(values.dataInicial).add(6, 'day').format("YYYY-MM-DD"),
            semanaInicial: values.semanaInicial,
            ativo: 1
          }, {
            headers: {
              // "Authorization": `Bearer ${user.Token}`
            }
          })
            .then((response) => {
              setTimeout(() => {
                setCicloActive(true);
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
      .catch((error) => {
        console.log(error);
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
                  <IoTimerOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Ciclos</h1>
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
                onClick={() => navigate('/ciclos')}
                className="text-gray-600  hover:underline"
              >
                Ciclos
              </button>

            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>
        <div className="flex items-center justify-between mb-2">
          <div>
            <SBackButtom onClick={() => navigate('/ciclos')} />
          </div>

        </div>
        <Formik
          validationSchema={schema}
          onSubmit={onsubmit}
          initialValues={{
            dataInicial: moment().format("YYYY-MM-DD"),
            semanaInicial: '',
            ativo: 1
          }}
        >
          {({ errors, isValid }) => (
            <Form autoComplete="off">
              <div className="bg-white rounded-t-lg border overflow-auto py-8 px-2">
                {postMessageErro &&
                  <div>{<AMessageError className="rounded-lg">{postMessageErro}</AMessageError>}</div>
                }
                {postMessageSuccess &&
                  <div>{<AMessageSuccess className="rounded-lg">{postMessageSuccess}</AMessageSuccess>}</div>
                }

                <div className="mt-0 mb-6 py-2 pl-2 rounded-t-md border-b-2 border-white shadow bg-blue-500">
                  <h1 className="font-lg text-white font-medium uppercase">Cadastrar ciclo de produção</h1>
                </div>

                <div className="">
                  <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="dataInicial">Data inicial do ciclo</label>
                  <DatePickerField
                    className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 ${errors.dataInicial ? 'border-red-400' : 'border-gray-200'} rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                    id="dataInicial"
                    name="dataInicial"
                    dateFormat="dd/MM/yyyy"
                    onFocus={(e: any) => e.target.blur()}
                  />
                </div>
                <div className="mt-4">
                  <label className="w-full mt-2 text-blue-800 font-medium" htmlFor="semanaInicial">Semana Inicial do ciclo</label>
                  <Field
                    className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 focus:border-blue-400 ${errors.semanaInicial ? 'border-red-400' : 'border-gray-200'} rounded-md focus:ring-blue-300 focus:ring-opacity-40 focus:ring`}
                    id="semanaInicial"
                    name="semanaInicial"
                    type="text"
                    autoFocus
                  />
                  {errors.semanaInicial &&
                    <AMessageError className="rounded-b-lg">{errors.semanaInicial}</AMessageError>
                  }

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

export default AddCiclo;