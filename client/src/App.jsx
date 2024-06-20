// import React, { useEffect, useRef, useState } from "react";
// import Peer from "simple-peer";
import {RouterProvider } from 'react-router-dom'
import router from './router';
// import io from "socket.io-client";
import "./App.css";

// const socket = io.connect("http://localhost:5001");

function App() {
  return (
    <>
      <RouterProvider  router={router}></RouterProvider >
    </>
  )
  
}

export default App;
