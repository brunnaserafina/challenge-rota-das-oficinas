import { useEffect, useState } from "react";

export function TypeWritter(props) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  const typeOnScreen = (text, i = 0) => {
    if (i < text.length) {
      setShowCursor(true);

      setText(text.slice(0, i + 1));
      setTimeout(() => typeOnScreen(text, i + 1), 100);
    } else if (i >= text.length && props?.hideCursor) {
      setShowCursor(false);
    }
  };

  useEffect(() => {
    setTimeout(() => typeOnScreen(props.text), props?.delay ?? 200);
  }, []);

  return (
    <div>
      {text}
      {showCursor && <span>|</span>}
    </div>
  );
}
