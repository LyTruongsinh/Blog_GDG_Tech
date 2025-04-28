// Layout.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Header />
      <br />
      <br />
      <br/>
      <div>{children}</div>
      <Footer />
      <br />
      <br />
    </div>
  );
};

export default Layout;
