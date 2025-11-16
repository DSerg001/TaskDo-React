import { useState, useEffect } from "react";
import { useTaskStore } from "../../store/store";
import "./TypingInput.css";

const TypingInput = () => {
  const placeholderText = "Search task...";
  const [displayedText, setDisplayedText] = useState("");
  const [typingForward, setTypingForward] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const { searchQuery, setSearchQuery } = useTaskStore();

  // Typing animation (միայն երբ input-ը դատարկ է և focus-ի մեջ չէ)
  useEffect(() => {
    if (searchQuery !== "" || isFocused) return;

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
  }, [typingForward, searchQuery, isFocused]);

  // Cursor blinking
  useEffect(() => {
    if (searchQuery !== "" || isFocused) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [searchQuery, isFocused]);

  return (
    <input
      type="text"
      className="typing-input"
      value={searchQuery}
      placeholder={
        isFocused
          ? "" // focus-ի ժամանակ placeholder չլինի
          : searchQuery === ""
          ? displayedText + (showCursor ? "|" : "")
          : ""
      }
      onFocus={() => {
        setIsFocused(true);
        setDisplayedText(placeholderText); // focus-ի պահին անմիջապես ամբողջ տեքստը ցույց չտա
      }}
      onBlur={() => {
        setIsFocused(false);
        setDisplayedText(placeholderText); // focus-ից դուրս գալիս՝ ցույց տա ամբողջ “Search task...”
      }}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default TypingInput;
