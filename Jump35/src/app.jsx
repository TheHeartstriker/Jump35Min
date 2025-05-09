import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html-to-pdf-js";

function App() {
  const [markdown, setMarkdown] = useState("");

  const handleExportPDF = () => {
    const content = document.getElementById("renderedMarkdown");
    html2pdf().from(content).save("markdown.pdf");
  };

  const handleCopyToClipboard = async () => {
    try {
      const contentElement = document.getElementById("renderedMarkdown");
      const htmlContent = contentElement.innerHTML; // HTML version
      const plainText = contentElement.textContent; // Plain text fallback

      // Create a clipboard item with both HTML and plain text
      const clipboardItem = new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
        "text/plain": new Blob([plainText], { type: "text/plain" }),
      });

      // Write to clipboard
      await navigator.clipboard.write([clipboardItem]);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy to clipboard.");
    }
  };
  return (
    <div style={{ display: "flex", height: "100vh" }} className="App">
      {/* Left Pane: Markdown Input */}
      <textarea
        style={{
          width: "50%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          resize: "none",
          backgroundColor: "#1b1b1b",
          color: "#f8f8f2",
          borderRadius: "10px",
        }}
        className="markdown-input"
        placeholder="Type your Markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      {/* Right Pane: Rendered Markdown */}
      <div
        className="markdown-output"
        style={{
          width: "50%",
          padding: "10px",
          border: "1px solid #ccc",
          overflowY: "auto",
          backgroundColor: "#1b1b1b",
          color: "#f8f8f2",
          borderRadius: "10px",
        }}
      >
        <div id="renderedMarkdown">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleExportPDF}
            style={{
              marginRight: "10px",
              border: "none",
              borderRadius: "10px",
              width: "100px",
              padding: "10px",
            }}
          >
            Export
          </button>
          <button
            onClick={handleCopyToClipboard}
            style={{
              border: "none",
              borderRadius: "10px",
              width: "100px",
              padding: "10px",
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
