import Head from 'next/head'
import { useContext, useState, useEffect } from "react";
import { MenuIcon } from '@heroicons/react/outline'
import { SocketContext } from "../context/socket"
import Sidebar from "../components/sidebar"
import ChatInput from "../components/ChatInput"
function slugify(string) {
  return [...string]
    .map((letter, index) => {
      const code = letter.charCodeAt(0)
      if ((code >= 65 && code <= 90) && string[index - 1]) {
        return `-${letter.toLowerCase()}`
      }

      return letter.toLowerCase()
    })
    .join('')
}

export default function Home() {
  const room = ['room: 1']
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [roomSelect, setRoomSelect] = useState(room[0]);
  //const [rooms, setRooms] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    socket.on("room::message::send", ({ message, time }) => {
      setMessages((messages) => [...messages, {message, time}])
    })

    // socket.on("room::join", ({ room }) => {
    //   setRooms((rooms) => [...rooms, room])
    // })

    socket.on("hello", (arg) => {
      console.log(arg); // world
    })

  }, []);
  function join(room) {
    console.log("HAHAHHAHAjjj");
    socket.emit("room::join", room)

  }
  function send(message) {
    console.log(roomSelect)
    socket.emit("room::message::send", { room: roomSelect, message: message, time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()});
  }
  function privateRoom() {
    console.log("test")
    socket.emit("private::message", socket.id, messages)
  }
  console.log("test1", messages.map((m) => (m, m[3])))
  return (
    <>
      <div>
        <Sidebar join={join} setRoomSelect={setRoomSelect} />
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            {/* <a onClick={() => updateRoom(room)}>
              <p>Room 1 test</p>
            </a> */}
            <div className="py-4 px-20 h-screen flex flex-col justify-between">
              <div className="flex flex-col space-y-2">
                {messages.map((m, i) => <p key={i}>{m.message},{m.time}</p>)}
              </div>
              <ChatInput send={send} />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}