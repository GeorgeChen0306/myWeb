import { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import './styles/App.css';
import HomePage from "./Pages/WebHomePage";
import Users from "./Pages/AccountManagement";
import Pokemon from "./Pages/PokemonPage";
import UserHome from "./Pages/UserHome";
import Login from "./Pages/Login";
import AdminHome from "./Pages/AdminHome";
import MyProfile from "./Pages/Profile";
import Post from "./Pages/PostsPage";
import { useRole } from "./context/Role";

function App() {

  const { logout } = useRole();

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
  async function checkToken(token){
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
          if (data.isAuthorized){
            if (data.redirect === "user"){
              navigate("/user");
            }
            else if (data.redirect === "admin"){
              navigate("/admin");
            }
          }
          else {
            logout();
            //localStorage.removeItem("LoginToken");
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
  
          const data = await checkToken(token);
          setIsAuthorized(data.isAuthorized);
          setIsLoading(false);
        }
        catch(error){
          console.error(error)
        }
      }
      verify();
    },[])

    useEffect(() =>{
      if (!isLoading && !isAuthorized){
        navigate("/login");
      }
    },[isLoading, isAuthorized, navigate])

    if (isLoading){
      return <h1>Waiting....</h1>
    }
    return (isAuthorized ? <Outlet /> : null)

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
  
          const data = await checkToken(token);
          setIsAuthorized(data.isAuthorized);
          setIsLoading(false);
        }
        catch(error){
          console.error(error)
        }
      }
      verify();
    },[])

    useEffect(() =>{
      if (!isLoading && !isAuthorized){
        navigate("/login");
      }
    },[isLoading, isAuthorized, navigate])


    if (isLoading){
      return <h1>Waiting....</h1>
    }
    return (isAuthorized ? <Outlet /> : null)
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/pokemon" element={<Pokemon />}></Route>
            <Route path="/posts" element={<Post />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route element={<UserRoute />}>
              <Route path="/user" element={<UserHome />}></Route>
              <Route path="/user/profile" element={<MyProfile />}></Route>
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminHome />}></Route>
              <Route path="/admin/users" element={<Users />}></Route>
              <Route path="/admin/profile" element={<MyProfile />}></Route>
            </Route>
            <Route path="/*" element={<h1>ERROR 404: Page Not Found</h1>}></Route>
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
