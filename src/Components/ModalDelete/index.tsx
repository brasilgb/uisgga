import React, { Fragment } from 'react'
import { IconContext } from 'react-icons';
import { IoAlertCircleOutline, IoCheckboxOutline, IoCheckmarkCircle, IoClose } from 'react-icons/io5';

interface DeleteModal {
    closemodal: any;
    deleterow?: any;
    info: string;
}
export const ModalDelete = ({ closemodal, deleterow, info }: DeleteModal) => {
    return (
        <Fragment>
            <div className="bg-gray-900 bg-opacity-80 flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-md shadow">
                        <button onClick={closemodal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <IconContext.Provider value={{ color: "#888", className: "font-bold text-2xl" }}>
                                <div>
                                    <IoClose />
                                </div>
                            </IconContext.Provider><span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <IconContext.Provider value={{ color: "", className: "font-bold text-6xl text-red-400" }}>
                                <div className="flex items-center justify-center">
                                    <IoAlertCircleOutline />
                                </div>
                            </IconContext.Provider>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 py-4">
                                Tem certeza de que deseja excluir {info}?
                            </h3>
                            <button onClick={deleterow} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Sim, tenho certeza
                            </button>
                            <button onClick={closemodal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                                Não, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
export const ModalConfirm = ({ closemodal, info }: DeleteModal) => {
    return (
        <Fragment>
            <div className="bg-gray-900 bg-opacity-80 flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-md shadow">
                        <button onClick={closemodal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <IconContext.Provider value={{ color: "#888", className: "font-bold text-2xl" }}>
                                <div>
                                    <IoClose />
                                </div>
                            </IconContext.Provider><span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <IconContext.Provider value={{ color: "", className: "font-bold text-6xl text-green-400" }}>
                                <div className="flex items-center justify-center">
                                    <IoCheckmarkCircle />
                                </div>
                            </IconContext.Provider>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 py-4">
                                {info} excluido com sucesso.
                            </h3>
                            <button onClick={closemodal} type="button" className="rounded-lg text-sm font-medium px-5 py-2.5 bg-blue-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80 shadow-md">
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
