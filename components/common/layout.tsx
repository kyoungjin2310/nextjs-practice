import React from "react";
import Footer from "./footer";
import Header from "./header";
type LayoutProps = {
  title: string;
  children: JSX.Element;
};
const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Header />
      <h1>{title}</h1>
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
