import React, { useEffect, useState } from "react";
import { arr } from "./data";

const App = () => {
  const [audioClip, setAudioClip] = useState("");
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function handleKeyPress(e) {
    console.log(e.key);
    const updatedkey = e.key.toUpperCase();

    setAudioClip(updatedkey);

    playAudio(updatedkey);
  }

  const playAudio = async (elementId) => {
    try {
      const audio = document.getElementById(elementId);

      if (audio) {
        setAudioClip(elementId);

        await audio.play();
      } else {
        console.warn(`Audio element with ID ${elementId} not found.`);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const audioText =
    audioClip === "Q"
      ? "Heater-1"
      : audioClip === "W"
      ? "Heater-2"
      : audioClip === "E"
      ? "Heater-3"
      : audioClip === "A"
      ? "Heater-4"
      : audioClip === "S"
      ? "Clap"
      : audioClip === "D"
      ? "Open-HH"
      : audioClip === "Z"
      ? "Kick-n'-Hat"
      : audioClip === "X"
      ? "Kick"
      : audioClip === "C"
      ? "Closed-HH"
      : "";

  return (
    <div className="h-screen bg-[#8d8d8d] flex justify-center items-center p-4">
      <div
        id="drum-machine"
        className="border-4 border-solid border-[orange] w-[500px] p-2"
      >
        <div id="display" className="bg-gray-300 p-10 mb-2 text-center">
          {audioText}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {arr.map((obj) => {
            return (
              <div
                className="drum-pad bg-[#b3b3b3]  p-10 flex items-center justify-center rounded-2xl font-bold hover:cursor-pointer hover:bg-gray-200"
                id={`${obj.src}`}
                onClick={() => playAudio(obj.text)}
                key={obj.src}
              >
                {obj.text}
                <audio
                  src={`${obj.src}`}
                  className="clip"
                  id={`${obj.text}`}
                ></audio>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
