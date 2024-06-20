import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import io from "socket.io-client";

export default function LandingPage({url, socket}) {
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [name, setName] = useState("");
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        socket.connect();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
          setStream(stream);
          myVideo.current.srcObject = stream;
        });
    
        socket.on("me", (id) => {
          setMe(id);
        });
    
        socket.on("callUser", (data) => {
          setReceivingCall(true);
          setCaller(data.from);
          setName(localStorage.fullName                                                                           );
          setCallerSignal(data.signal);
        });

        return () => {
            socket.off("me")
            socket.off("callUser")
            socket.disconnect()
        }
      }, []);
    

    const callUser = (id) => {

        if (!stream) {
            console.error('Stream is not available.');
            return;
        }
        
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
    
        connectionRef.current = peer;
         navigate('/meet')
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
    
        peer.signal(callerSignal);
        connectionRef.current = peer;

        navigate('/meet')
    };
    

    return(
        <>
            <div className="bg-white text-gray-900 noto-sans">
                <div className="flex">
                    <main className="w-1/2 flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
                        <div className="w-full justify-start">
                            <h1 className="text-6xl font-semibold mb-4">Video calls and meetings for everyone</h1>
                            <p className="text-gray-700 mb-6">Connect, collaborate, and celebrate from anywhere with Google Meet</p>
                        </div>
                        
                        <div className="lg:flex lg:items-center lgspace-x-4 mb-4 sm:block sm:w-full">
                            {/* <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2">
                                <span>New meeting</span>
                            </button> */}
                            <button
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 lg:w-auto sm:w-full w-full"
                                onClick={() => navigator.clipboard.writeText(me)}
                            >
                                <img src="./icons/videoCall.svg" alt=""/>
                                Copy Meeting ID
                            </button>
                            <div>
                                <input 
                                    id="filled-basic"
                                    type="text"
                                    value={idToCall}
                                    onChange={(e) => setIdToCall(e.target.value)}
                                    placeholder="Enter a code or link"
                                    className="border border-gray-300 rounded-lg py-2 px-4 lg:w-auto sm:w-full w-full"/>
                            </div>
                            
                            <button
                                onClick={() => callUser(idToCall)}
                                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 lg:w-auto sm:w-full w-full">
                                    Join</button>
                        </div>
                        <p className="text-gray-600">
                            {/* <a href="#" className="text-blue-600">Learn more</a> about Google Meet */}
                            <div>
                            {receivingCall && !callAccepted ? (
                                <div className="caller">
                                    <h1>{name} is calling...</h1>
                                    <button onClick={answerCall} style={{ padding: "10px", backgroundColor: "blue", color: "white" }}>
                                        Answer
                                    </button>
                                </div>
                            ) : null}
                            </div>
                        </p>
                    </main>
                    <main className="flex items-center justify-center h-screen text-center p-4">
                        <div className="flex justify-center w-full">
                            <img className="lg:w-72 md:w-52 sm:w-28 w-14"
                                src="https://www.gstatic.com/meet/premium_carousel_03_4f42ed34b9d0637ce38be87ecd8d1ca0.gif" alt=""/>
                            <img className="lg:w-72 md:w-52 sm:w-28 w-14"
                                src="https://www.gstatic.com/meet/premium_carousel_02_174e55774263506d1280ce6552233189.gif" alt=""/>
                        </div>
                    </main>
                </div>
            </div> 
        </>
    )
}