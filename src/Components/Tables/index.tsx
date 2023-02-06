import React from 'react';

interface PropsTable {
    children: JSX.Element;
}

export const STable = ({ children }: PropsTable) => {
    return (
        <table>
            { children }
        </table>
    )
};

export const SThead = ({ children }: PropsTable) => {
    return (
        <thead>
            { children }
        </thead>
    )
};
export const STbody = ({ children }: PropsTable) => {
    return (
        <tbody>
            { children }
        </tbody>
    )
};

export const STfoot = ({ children }: PropsTable) => {
    return (
        <tfoot>
            { children }
        </tfoot>
    )
};
export const STr = ({ children }: PropsTable) => {
    return (
        <tr>
            { children }
        </tr>
    )
};


export const STh = ({ children }: PropsTable) => {
    return (
        <th>
            { children }
        </th>
    )
};

export const STd = ({ children }: PropsTable) => {
    return (
        <td>
            { children }
        </td>
    )
};