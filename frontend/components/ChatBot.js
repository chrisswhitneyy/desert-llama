import React, { useState } from "react";
import axios from "axios";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [promptType, setPromptType] = useState("Question");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (prompt) => {
    const formatResponse = (response) => response.replace(prompt, "");

    try {
      setIsLoading(true);
      const response = await axios.post("http://0.0.0.0:8000/complete", {
        prompt,
      });
      console.log(response.data.data.choices);
      const botReply = {
        text: formatResponse(response?.data?.data?.choices[0].text),
        isBot: true,
      };
      return botReply;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const messageText = e.target.elements.message.value;
    if (messageText.trim() !== "") {
      const newMessage = {
        text: messageText,
        isBot: false,
      };
      setMessages([...messages, newMessage]);
      const botReply = await sendMessage(messageText);
      setMessages([...messages, newMessage, botReply]);
      e.target.elements.message.value = "";
    }
  };

  const handlePromptTypeChange = (e) => {
    setPromptType(e.target.value);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={"desert-llama-log.png"} alt="Logo" className={styles.logo} />{" "}
        {/* Add the logo image */}
        <div>
          <h1 className={styles.title}>Desert Llama</h1>
          <p>A simple interface for the Lllama LLM ggml-model-Q4_0 </p>
        </div>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message?.isBot ? styles.botMessage : styles.userMessage
              }`}
            >
              {message?.text}
            </div>
          ))}
          {isLoading && (
            <div className={styles.loadingIndicator}>Loading...</div>
          )}
        </div>
        <form onSubmit={handleMessageSubmit} >
          <select
            value={promptType}
            onChange={handlePromptTypeChange}
            className={styles.promptTypeDropdown}
          >
            <option value="Question">Question</option>
            <option value="Instruction">Instruction</option>
          </select>
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            defaultValue={"Question: What is the capital of Arizona? Answer:"}
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
