import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/visualAni.json";

export default function VisualAni() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 700, height: 700, marginLeft: -120 }}
    />
  );
}
