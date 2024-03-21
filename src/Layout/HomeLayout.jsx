import React from "react";
import { Outlet } from "react-router-dom";
import Head from "../Components/Head";
import Footer from "../Components/Footer";

function HomeLayout() {
  return (
    <div>
      <Head />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
