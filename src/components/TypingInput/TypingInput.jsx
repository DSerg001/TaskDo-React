import { useState, useEffect } from "react";
import { useTaskStore } from "../../store/store";
import "./TypingInput.css";

const TypingInput = () => {
  const placeholderText = "Search task...";
  const [displayedText, setDisplayedText] = useState("");
  const [typingForward, setTypingForward] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const { searchQuery, setSearchQuery } = useTaskStore();

  // Typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (typingForward) {
          if (prev.length < placeholderText.length) {
            return placeholderText.slice(0, prev.length + 1);
          } else {
            setTypingForward(false);
            return prev;
          }
        } else {
          if (prev.length > 0) {
            return prev.slice(0, prev.length - 2);
          } else {
            setTypingForward(true);
            return prev;
          }
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, [typingForward]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <input
      type="text"
      className="typing-input"
      value={searchQuery}
      placeholder={displayedText + (showCursor ? "|" : "")}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default TypingInput;
