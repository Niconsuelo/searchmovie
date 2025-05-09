// src/App.tsx
//define peliculas y pasa a componentes.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/page/Home";
import { ToastContainer } from "react-toastify";
import PageMovieDetails from "./page/PageMovieDetails";


//app es un componente de tipo funcion de reactx

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        theme="dark"
        
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<PageMovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
