import React, { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRole, updateUsername, updateFirstName, updateLastName, logoutUser } from "../store/UserSlices.js";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { role, username, firstName, lastName } = useSelector((state) => state.user);

  const updateRoleContext = (newRole) => dispatch(updateRole(newRole));
  const updateUsernameContext = (user) => dispatch(updateUsername(user));
  const updateFirstNameContext = (name) => dispatch(updateFirstName(name));
  const updateLastNameContext = (name) => dispatch(updateLastName(name));

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("LoginToken");
  };

  const allVal = {
    role,
    username,
    firstName,
    lastName,
    updateRole: updateRoleContext,
    updateUsername: updateUsernameContext,
    updateFirstName: updateFirstNameContext,
    updateLastName: updateLastNameContext,
    logout,
  };

  return <RoleContext.Provider value={allVal}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);