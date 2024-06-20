import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import BaseLayout from "../views/BaseLayout";
import LoginPage from "../views/LoginPage";
import MainPage from "../views/MainPage";
import RegisterPage from "../views/RegisterPage";
import io from "socket.io-client";
import Toastify from "toastify-js"

const socket = io("http://localhost:5001", {
  autoConnect: false,
});

const url = "http://localhost:5001";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage url={url} socket={socket} />,
  },
  {
    path: "/login",
    element: <LoginPage url={url} socket={socket} />,
    loader: () => {
        if(localStorage.token){
          Toastify({
            text: "You are already logged in",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#EF4C54",
              color: "#17202A",
              boxShadow: "0 5px 10px black",
              fontWeight: "bold",
            },
          }).showToast();
          return redirect('/home')
        }
        return null
      }
  },
  {
    element: <BaseLayout />,
    loader: () => {
        if(!localStorage.token){
          Toastify({
            text: "Please login first",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "#EF4C54",
              color: "#17202A",
              boxShadow: "0 5px 10px black",
              fontWeight: "bold",
            },
          }).showToast();
          return redirect('/login')
        }
        return null
      },
    children: [
      {
        path: "/home",
        element: <LandingPage url={url} socket={socket} />,
      },
      {
        path: "/meet",
        element: <MainPage url={url} socket={socket} />,
      },
    ],
  },
]);

export default router;
