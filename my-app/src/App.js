import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Nav from "react-bootstrap/Nav";
import chat_img from "./Assets/icon/chat_img.svg";
import search from "./Assets/icon/search.svg";
import emoji from "./Assets/icon/emoji.svg";
import oldChat from "./Assets/icon/old-chat.png";
import notification from "./Assets/icon/notification.svg";
import send from "./Assets/icon/send.svg";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
        scrollToBottom();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <main>
      <div className="main__container">
        <div className="nav">
          <Nav defaultActiveKey="/home" as="ul" className="chat__nav">
            <Nav.Item as="li">
              <Nav.Link href="/home">
                <div className="logo">
                  <img src={chat_img} alt="" />
                  <div>ASK.me</div>
                </div>
              </Nav.Link>
            </Nav.Item>
            <div className="right__menu">
              <Nav.Item as="li">
                <Nav.Link>HOME</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1">FAQs</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1">SETTINGS</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1">TERM OF USE</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2">
                  <img src={search} alt="" className="nav__search" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2">
                  <img src={notification} alt="" />
                </Nav.Link>
              </Nav.Item>
            </div>
          </Nav>
        </div>
        <div className="aside">
          <div className="search">
            <div>search in old messages</div>
            <img src={search} alt="" className="aside__search" />
          </div>
          <div className="old__msg">
            <div className="old_chat_div">
              <img src={oldChat} alt="" />
              <div>Artificial Intelligence in Healthcare</div>
            </div>
            <div className="old_chat_div">
              <img src={oldChat} alt="" />
              <div>Renewable Energy Technologies and Sustainability</div>
            </div>
            <div className="old_chat_div">
              <img src={oldChat} alt="" />
              <div>Cybersecurity Threats and Measures for Protection</div>
            </div>
            <div className="old_chat_div">
              <img src={oldChat} alt="" />
              <div>Blockchain Technology and its Potential Applications</div>
            </div>
            <div className="old_chat_div">
              <img src={oldChat} alt="" />
              <div>Augmented Reality and Virtual Reality Applications</div>
            </div>
          </div>
        </div>
        <div className="chat__main" ref={chatContainerRef}>
          <div className={isTyping ? "" : "hide"}>
            <p>
              <i>{isTyping ? "Typing" : ""}</i>
            </p>
          </div>
          {chats && chats.length
            ? chats
                .slice(0)
                .reverse()
                .map((chat, index) => (
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : ""}
                  >
                    <span>
                      <b>{chat.role.toUpperCase()}</b>
                    </span>
                    <span>:</span>
                    <span>{chat.content}</span>
                  </p>
                ))
            : ""}
        </div>
        <form action="" onSubmit={(e) => chat(e, message)}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
            autocomplete="off"
          />

          <img src={emoji} alt="" className="emoji" />
          <img src={send} alt="" className="send" />
        </form>
      </div>
    </main>
  );
}

export default App;
