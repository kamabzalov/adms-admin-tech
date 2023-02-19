import React from "react";
//import "../styles/table.css"

interface LayoutProps {
    number: string;
    fullName: string;
    role: string;
}

export const UsersTableBody: React.FC<LayoutProps> = ({ number, fullName, role }) => {
    return(
        <>
        <tr>
            <th className="NumberOfString">{number}</th>
            <td>{fullName}</td>
            <td>{role}</td>
        </tr>
        </>
    )
}
