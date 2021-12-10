import { useState } from "react";

export default function ChatInput(props) {
  const [value, setValue] = useState("");

  return (
    <div className="flex space-x-2">
      <input className="bg-gray-400 p-2 rounded-lg w-full" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="bg-gray-500 rounded-lg px-20 font-bold text-white" onClick={() => props.send(value)}> Send </button>    
    </div>
  );
}