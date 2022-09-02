import React from "react";
type LayoutProps = {
  title: string;
  children: JSX.Element;
};
const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{children}</div>
    </>
  );
};

export default Layout;
