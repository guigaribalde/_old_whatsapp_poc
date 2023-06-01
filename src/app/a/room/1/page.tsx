"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Message {
  origin_type: "me" | "user" | "system";
  origin_header?: string;
  content: string;
}

let socket;

const defaultMessage: Message[] = [
  {
    origin_type: "user",
    origin_header: "Tarefa 01",
    content: "Olá, tudo bem?",
  },
];

export default function One() {
  const [messages, setMessages] = useState<Message[]>(defaultMessage);

  const socketInitializer = async () => {
    await fetch(`/api/socket/1`);
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("connected_users", (res) => {
      console.log(res);
    });
    socket.emit("join", { room: 1 });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input) {
      setMessages([
        ...messages,
        {
          origin_type: "me",
          content: input.value,
        },
      ]);
      input.value = "";
    }
  }

  return (
    <div className="flex justify-center items-center p-4 w-full h-full">
      <div className="flex flex-col gap-4 justify-between my-5 w-full max-w-xl h-full">
        <div className="flex overflow-auto flex-col gap-2 p-3 w-full h-full rounded-lg border border-slate-200">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`p-3 max-w-xs rounded-md ${
                  message.origin_type === "me"
                    ? "ml-auto bg-stone-200"
                    : "bg-green-200"
                }`}
              >
                <span className="flex flex-col">
                  {message.origin_header && (
                    <strong>{message.origin_header}</strong>
                  )}
                  <text>{message.content}</text>
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <div className="w-full form-control">
            <form onSubmit={submitMessage} className="w-full input-group">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="w-full input input-bordered"
              />
              <button type="submit" className="btn btn-square btn-primary">
                📨
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
