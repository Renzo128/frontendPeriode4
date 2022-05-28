import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login/login";
import Chat from "./component/chat/chat";
import Register from "./component/register/register";
function App() {
    // Links aangemaakt om niet te hoeven herladen
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/chat/:id" element={<Chat />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
