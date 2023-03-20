import React from 'react';

interface PropsTable {
    children: React.ReactNode;
    bgColor?: string;
    colorRow?: any;
    head?: boolean;
}

export const STable = ({ children }: PropsTable) => {
    return (
        <table className='min-w-full'>
            {children}
        </table>
    )
};

export const STr = ({ head, colorRow, children }: PropsTable) => {
    return (
        <tr className={`${head ? 'bg-gradient-to-b from-gray-100 to-transparent' : 'hover:bg-blue-50'} ${!head && colorRow > 0 ? 'bg-gray-50' : 'bg-white'} border-b transition duration-300 ease-in-out`}>
            {children}
        </tr>
    )
};

export const STh = ({ children }: PropsTable) => {
    return (
        <th className='text-base text-gray-900 px-2 py-4 text-left'>
            {children}
        </th>
    )
};

export const STd = ({ children }: PropsTable) => {
    return (
        <td className='text-base font-normal text-gray-900 px-2 py-2'>
            <div className=''>
                {children}
            </div>
        </td>
    )
};