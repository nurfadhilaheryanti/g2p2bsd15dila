import mic from "../assets/icons/mic.svg";
import cam from "../assets/icons/cam.svg";
import closedCaption from "../assets/icons/closedcaption.svg";
import more from "../assets/icons/more.svg";
import end from "../assets/icons/end.svg";
import chat from "../assets/icons/chat.svg";
import info from "../assets/icons/info.svg";
import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "simple-peer";

export default function MainPage({ url, socket }) {
  //video
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const navigate = useNavigate();

  //call
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);

  //video function
  useEffect(() => {
    socket.connect();
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
      userVideo.current.srcObject = stream
    });

    return () => {
        socket.disconnect()
    }
  }, []);


  //chat function
  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message:new", messageSent);
  }
  console.log(localStorage.fullName);

  useEffect(() => {
    // ngeset auth buat socketnya
    socket.auth = {
      fullName: localStorage.fullName,
    };

    // kenapa butuh connect manual? supaya bisa set auth dlu sblm connect
    socket.connect();

    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  function leaveCall() {
    navigate("/home");
  };

  return (
    <>
      <div className="flex">
        <div className="flex justify-center w-screen h-screen ">
          <div className="mb-8 grid grid-cols-2 gap-4 p-32 w-full justify-center">
            <div className="flex video-container">
              <div className="video">
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  style={{ width: "300px" }}
                />
              </div>
              <div className="video">
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  style={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 w-1/3 p-2">
          <div className="overflow-auto h-3/5 pr-5">
            {messages.map((msg) => {
              return (
                <div
                  className={
                    msg.from === localStorage.fullName
                      ? "flex items-end justify-end gap-2.5 mb-5"
                      : "flex items-start gap-2.5 mb-5"
                  }
                >
                  <div
                    className={
                      msg.from === localStorage.fullName
                        ? "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-green-600 bg-green-600 rounded-s-xl rounded-se-xl"
                        : "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl"
                    }
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span
                        className={
                          msg.from === localStorage.fullName
                            ? "text-sm font-semibold text-white"
                            : "text-sm font-semibold text-gray-800"
                        }
                      >
                        {msg.from === localStorage.fullName ? "You" : msg.from}
                      </span>
                    </div>
                    <p
                      className={
                        msg.from === localStorage.fullName
                          ? "text-sm font-normal py-2.5 text-white"
                          : "text-sm font-normal py-2.5 text-gray-800"
                      }
                    >
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex items-end justify-end gap-2.5 mb-5"></div>
          </div>

          <div className="mt-5">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 "
                  placeholder=""
                  required
                  onChange={(e) => setMessageSent(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed w-screen bg-zinc-800 p-8 bottom-0 flex items-center justify-between h-auto">
        <div className="flex">
          <p className="text-white">5:50 | asd-zxc-qwe</p>
        </div>
        <div className="flex gap-4">
          <div className="w-20 h-12 flex items-center justify-center rounded-full hover:bg-zinc-900">
            <img src={mic} alt="" srcSet="" />
          </div>
          <div className="w-20 h-12 flex items-center justify-center rounded-full hover:bg-zinc-900">
            <img src={cam} alt="" srcSet="" />
          </div>
          <div className="w-20 h-12 flex items-center justify-center rounded-full hover:bg-zinc-900">
            <img src={closedCaption} alt="" srcSet="" />
          </div>
          <div className="w-20 h-12 flex items-center justify-center rounded-full hover:bg-zinc-900">
            <img src={more} alt="" srcSet="" />
          </div>
          <div
            onClick={leaveCall}
            className="w-24 h-12 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-800"
          >
            <img src={end} alt="" srcSet="" />
          </div>
        </div>
        <div className="flex">
          <div className="w-24 h-12 flex items-center justify-center rounded-full hover:bg-zinc-900">
            <img src={chat} alt="" srcSet="" />
          </div>
          <div className="w-24 h-12 flex items-center justify-center rounded-full hover:bg-zinc-900">
            <img src={info} alt="" srcSet="" />
          </div>
        </div>
      </div>
    </>
  );
}
