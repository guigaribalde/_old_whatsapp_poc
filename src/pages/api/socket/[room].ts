/* eslint-disable import/no-extraneous-dependencies */
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

const SocketHandler = (req: NextApiRequest, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    return res.end();
  }
  console.log("Socket is initializing");
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const users: any = {};
  io.on("connection", (socket) => {
    socket.on(`join`, (user: any) => {
      console.log("user", user);
    });

    res.end();
  });
};

export default SocketHandler;
