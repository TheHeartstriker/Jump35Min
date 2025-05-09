import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html-to-pdf-js";

function App() {
  const [markdown, setMarkdown] = useState("");

  const handleExportPDF = () => {
    const content = document.getElementById("renderedMarkdown");
    html2pdf().from(content).save("markdown.pdf");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Pane: Markdown Input */}
      <textarea
        style={{
          width: "50%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          resize: "none",
        }}
        placeholder="Type your Markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      {/* Right Pane: Rendered Markdown */}
      <div
        style={{
          width: "50%",
          padding: "10px",
          border: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <div id="renderedMarkdown">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleExportPDF} style={{ marginRight: "10px" }}>
            Export
          </button>
          <button onClick={handleCopyToClipboard}>Copy</button>
        </div>
      </div>
    </div>
  );
}

export default App;
