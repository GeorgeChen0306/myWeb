import React, {createContext, useContext, useState} from "react";

const RoleContext = createContext();

export const RoleProvider = ({children}) => {
    const [role, setRole] = useState("public"); // Default public role
    const [username, setUsername] = useState(null); 
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const updateRole = (newRole) => setRole(newRole); // Update role
    const updateUsername = (user) => setUsername(user); // Update username
    const updateFirstName = (firstName) => setFirstName(firstName); // Update username
    const updateLastName = (lastName) => setLastName(lastName); // Update username

    const logout = () => {
        setFirstName(null);
        setLastName(null);
        setUsername(null);
        setRole("public");
        localStorage.removeItem("LoginToken")
    }

    const allVal = {role, username, firstName, lastName, updateRole, updateUsername, updateFirstName, updateLastName, logout}

    return (
        <RoleContext.Provider value={allVal}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => useContext(RoleContext);