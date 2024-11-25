import { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import './styles/App.css';
import HomePage from "./Pages/WebHomePage";
import Users from "./Pages/UsersPage";
import Pokemon from "./Pages/PokemonPage";
import UserHome from "./Pages/UserHome";
import Login from "./Pages/Login";
import AdminHome from "./Pages/AdminHome";

//TODO: Finish Protected Route
//      Finish Admin Routes
//      Finish User Routes

function App() {

  // Check for redirect
  async function checkExisitingToken(token){
    try{
      const response = await fetch("/api/authRedirect", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })

      if (!response.ok){
        console.error("Error verifying token");
        return ({isAuthorized: false})
      }

      const data = await response.json();
      return data;
    }
    catch(error){
      console.error(error);
    }

  }

  // Check for user routes token
  async function checkUserToken(token){
    try{
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })

      if (!response.ok){
        console.error("Error verifying token");
        return ({isAuthorized: false})
      }

      const data = await response.json();
      return data;
    }
    catch (error){
      console.error(error)
      return ({isAuthorized: false})
    }
  }

  // Check for admin routes token
  async function checkAdminToken(token){
    try{

    }
    catch(error){

    }
  }

  // Triggers when the users land on the login page
  const ProtectedRoute = () => {
    const token = localStorage.getItem("LoginToken");

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const verify = async() =>{
        try{
          if (!token){
            setIsLoading(false);
            return;
          }

          const data = await checkExisitingToken(token);
          console.log(data);
          if (data.isAuthorized){
            if (data.redirect === "user"){
              navigate("/user");
            }
            else if (data.redirect === "admin"){
              navigate("/admin");
            }
            else{
              //
            }
          }
          else {
            console.log("Expired")
            localStorage.removeItem("LoginToken");
            setIsLoading(false);
          }
        }
        catch(error){
          console.error(error)
        }
      }
      verify()
    },[])

    if (isLoading){
      return <h1>Waiting....</h1>
    }

    return <Outlet />
  }

  // Logic to handle admin routes
  const AdminRoute = () => {

  }

  // Logic to handle normal user routes
  const UserRoute = () => {
    
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const verify = async() =>{
        try{
          const token = localStorage.getItem("LoginToken");
          if (!token){
            setIsLoading(false);
            return;
          }
  
          const data = await checkUserToken(token);
          console.log(data);
          setIsAuthorized(data.isAuthorized);
          setIsLoading(false);
        }
        catch(error){
          console.error(error)
        }
      }
      verify();
  },[])

    if (isLoading){
      return <h1>Waiting....</h1>
    }
    return (isAuthorized ? <Outlet /> : navigate("/login"))
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/pokemon" element={<Pokemon />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route element={<UserRoute />}>
              <Route path="/user" element={<UserHome />}></Route>
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminHome />}></Route>
            </Route>
            <Route path="/*" element={<h1>ERROR 404: Page Not Found</h1>}></Route>
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
