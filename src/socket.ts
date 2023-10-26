import { io } from "socket.io-client";

const URL = "https://server-chat-ch90.onrender.com/";
// process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL as string);
