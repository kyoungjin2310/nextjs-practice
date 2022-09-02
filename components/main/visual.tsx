import React from "react";
import VisualAni from "../styled/visualIcon";

const Visual = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Everything you need for
            <br className="hidden lg:inline-block" />
            Process automation
          </h1>
          <p className="mb-8 leading-relaxed">
            One size doesn’t fit all. Do your workloads require upfront
            capacity? Spikes for seasonal workloads? Extra resources for
            migration projects? With our cloud-like consumption models for
            on-premises infrastructure, you can pay for what you need as you
            need it, reducing capital expenditures.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              See the tech behind the tournament
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <VisualAni />
        </div>
      </div>
    </section>
  );
};

export default Visual;
