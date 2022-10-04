import React, { ChangeEvent } from "react";
import Layout from "../../components/common/layout";
import { atom, useRecoilState } from "recoil";

const textState = atom({
  key: "textState",
  default: "",
});

const OtherList = () => {
  const [text, setText] = useRecoilState(textState);
  const onChange = (event: ChangeEvent) => {
    setText((event.target as HTMLTextAreaElement).value);
  };

  return (
    <Layout title={"Other List"}>
      <>
        <h1>blabla</h1>
        <div>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="input change event"
            type="text"
            value={text}
            onChange={onChange}
          />
          <br />
          Echo: {text}
        </div>
      </>
    </Layout>
  );
};

export default OtherList;
