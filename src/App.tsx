import { useState } from "react";
import { useConnection } from "./hook/useConnection";
import Chat from "./components/chat/Chat";
import Room from "./components/chat/Room";
import { socket } from "./socket";

function App() {
  useConnection();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleContext = (name: string, id: string) => {
    setUsername(name);
    setUserId(id);
    socket.emit("submit", { name, id });
    setShowChat((prev) => !prev);
  };

  return (
    <div className="container max-w-md mx-auto border min-h-screen relative bg-slate-800">
      {!showChat ? (
        <Room handleContext={handleContext} />
      ) : (
        <Chat username={username} userId={userId} />
      )}
    </div>
  );
}

export default App;
