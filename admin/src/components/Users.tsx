import React from "react";
import { TableHead } from "./small-components/TableHeads";
import { UsersTableBody } from "./small-components/TableBody";
import "./styles/table.css"

const Users: React.FC = () => {
    return(
        <>
            <table>
                <TableHead firstRow="Full Name" secondRow="Role" />
                <UsersTableBody number="1" fullName="Zeratul" role="Admin" />
                <UsersTableBody number="2" fullName="Artanis" role="Admin" />
                <UsersTableBody number="3" fullName="Reynor" role="Admin" />
            </table>
        </>
    )
}

export default Users;