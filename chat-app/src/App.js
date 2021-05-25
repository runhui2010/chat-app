import ChatWindow from "./components/ChatWindow";
import SideWindow from "./components/SideWindow";
import io from 'socket.io-client'
import {useEffect} from 'react'

function App() {
  
  const socket = io("http://localhost:8000");
  useEffect(() => {
    
    socket.emit("msg","first msg")
    
  }, [])

  return (
    <div className="App">
        <SideWindow/>
        <ChatWindow/>
    </div>
  );
}

export default App;
