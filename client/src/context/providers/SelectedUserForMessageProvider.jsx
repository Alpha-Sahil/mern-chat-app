import React from "react";
import selectUserForMessageContext from "../selectUserForMessageContext";

export default function SelectedUserForMessageProvider({ children }) {
    const [selectedUser, setSelectedUser] = React.useState('')

    return(
        <selectUserForMessageContext.Provider value={{ selectedUser, setSelectedUser }}>
            { children }
        </selectUserForMessageContext.Provider>
    )
}