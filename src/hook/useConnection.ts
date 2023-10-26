import { useEffect, useState } from "react";
import { socket } from "../socket";

export const useConnection = () => {
  //   const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    //cutsom
    // function onMessage() {
    //   setMessage("salam");
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("foo", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      //   socket.off("foo", onMessage);
    };
  }, []);

  return { isConnected };
};
