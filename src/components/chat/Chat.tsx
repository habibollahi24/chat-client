import { useEffect, useState } from "react";
import { socket } from "../../socket";

interface Message {
  userId: string;
  username: string;
  message: string;
  time: string;
}

function Chat({
  username,
  userId,
}: // socket,
{
  username: string;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // socket: any;
}) {
  const [currentValue, setCurrentValue] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const addMessageHandler = async () => {
    if (currentValue !== "") {
      const messageData = {
        userId,
        username,
        message: currentValue,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentValue("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: Message) =>
      setMessageList((prevMessage) => [...prevMessage, data])
    );
  }, []);

  return (
    <div className="">
      <div>
        <h2 className="bg-slate-700 p-4 text-gray-200 text-xl ">{username}</h2>
        <div className="p-2 h-[calc(100vh-140px)]  overflow-auto flex flex-col ">
          {messageList.map((message) => {
            return (
              <div
                key={message.time}
                className="bg-gray-400 mb-4 pt-1 pl-2 pr-4 pb-8 rounded-lg max-w-max relative text-xl self-start"
              >
                <p>{message.message}</p>
                <p className="absolute bottom-0 right-1 text-sm text-slate-800">
                  {message.time}
                </p>
                <p className="absolute text-gray-500 left-full translate-x-2 bottom-0 text-sm">
                  {message.username}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex absolute bottom-0 w-full h-14 p-1 space-x-2">
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          className="border rounded-md px-4 py-2 flex-1"
        />
        <button
          type="button"
          className="bg-orange-500 rounded-md px-4 py-2 text-slate-800 text-xl font-semibold"
          onClick={addMessageHandler}
        >
          send
        </button>
      </div>
    </div>
  );
}

export default Chat;
