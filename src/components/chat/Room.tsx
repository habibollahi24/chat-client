import { useState } from "react";
// import { socket } from "../../socket";

interface Props {
  handleContext: (a: string, b: string) => void;
}

function Room({ handleContext }: Props) {
  const [username, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (username !== "" && roomId !== "") {
      handleContext(username, roomId);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-800">
      <form onSubmit={submitHandler} className="flex flex-col space-y-4 ">
        <h1 className="text-7xl w-80 font-bold justify-items-start font-title text-orange-500">
          Secret Chat For Meysam
        </h1>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
          className="border rounded-md px-6 py-4"
        />
        <input
          type="text"
          value={roomId}
          placeholder="Room ID"
          onChange={(e) => setRoomId(e.target.value)}
          className="border rounded-md px-6 py-4"
        />
        <button
          type="submit"
          className="bg-orange-500 rounded-md px-8 py-4 text-slate-800 text-2xl font-semibold"
        >
          {" "}
          Enter to Secret Chat{" "}
        </button>
      </form>
    </div>
  );
}

export default Room;
