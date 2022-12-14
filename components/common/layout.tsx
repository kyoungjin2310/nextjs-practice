import React from "react";
import Footer from "./footer";
import Header from "./header";
type LayoutProps = {
  title?: string;
  children: JSX.Element;
};
const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="custom">
      <Header />
      <h1 className="text-3xl font-bold underline">{title}</h1>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
