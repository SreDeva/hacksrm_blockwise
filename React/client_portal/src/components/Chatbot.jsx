import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, sender:"user"}),
      });

      const data = await response.json();
      console.log(data)
      const botMessage = { text: data.message, sender: "bot" };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to server. Try again.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="w-80 bg-white border border-green-500 shadow-lg rounded-lg">
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between">
            <span>Chatbot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="h-60 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-green-500 flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-green-600 text-white p-2 rounded-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
