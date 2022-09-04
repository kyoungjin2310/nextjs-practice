import React from "react";
type VisualTitleProps = {
  txt: string;
  nextTxt: string;
};

const VisualTitle = ({ txt, nextTxt }: VisualTitleProps) => {
  return (
    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
      {txt}
      <br className="hidden lg:inline-block" />
      {nextTxt}
    </h1>
  );
};

export default VisualTitle;
