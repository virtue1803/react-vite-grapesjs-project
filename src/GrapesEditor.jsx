import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import plugin1 from "grapesjs-tailwindcss-plugin";
import plugin2 from "grapesjs-tailwind";
import "./index.css";
import Blocks from "./utils/blocks";

const GrapesEditor = () => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    if (!editorInstanceRef.current) {
      const editor = grapesjs.init({
        container: editorRef.current,
        height: "auto",
        width: "100%",
        storageManager: false,
        plugins: [plugin1, plugin2],
        pluginsOpts: {
          [plugin1]: {},
        },
        blockManager: {
          appendTo: "",
        },
        panels: {},
      });

      editorInstanceRef.current = editor;

      // Thêm các block từ file Blocks
      Blocks.forEach((block) => {
        if (!editor.BlockManager.get(block.id)) {
          editor.BlockManager.add(block.id, block);
        }
      });
    }
  }, []);

  // Hàm lọc CSS chỉ lấy class đang dùng trong HTML
  const filterCSS = (fullCSS, classList) => {
    const blocks = fullCSS.split("}");
    const filtered = blocks
      .map((b) => b.trim())
      .filter((b) =>
        classList.some((cls) => {
          const escaped = cls.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
          return b.includes(`.${escaped}`);
        })
      )
      .map((b) => b + "}");
    return filtered.join("\n");
  };

  const handleExport = () => {
    const editor = editorInstanceRef.current;
    if (editor) {
      let html = editor.getHtml();

      // Chuyển HTML → JSX cơ bản
      html = html.replace(/class=/g, "className=").replace(/for=/g, "htmlFor=");

      // Lấy danh sách class duy nhất trong HTML
      const classList = Array.from(
        new Set(
          html.match(/className="([^"]+)"/g)?.flatMap((m) =>
            m
              .replace(/className="/, "")
              .replace(/"/, "")
              .split(/\s+/)
          ) || []
        )
      );

      // Lấy CSS đầy đủ từ GrapesJS
      const fullCSS = editor.getCss();
      const filteredCSS = filterCSS(fullCSS, classList);

      // Nhập tên component
      let componentName = prompt("Nhập tên component:", "ExportedComponent");
      if (!componentName) return;
      componentName =
        componentName.charAt(0).toUpperCase() + componentName.slice(1);

      const jsxCode = `
        import React from "react";

        const ${componentName} = () => (
          <>
            <style>{\`${filteredCSS}\`}</style>
            ${html}
          </>
        );

        export default ${componentName};
              `;

      console.log("JSX Export:\n", jsxCode);

      // Tải file JSX về máy
      const blob = new Blob([jsxCode], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${componentName}.jsx`;
      link.click();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div
          id="blocks"
          style={{
            width: "0px",
            height: "80vh",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            padding: "0px",
          }}
        ></div>
        <div
          ref={editorRef}
          style={{
            flex: 1,
            border: "1px solid #ccc",
            height: "80vh",
            overflow: "auto",
          }}
        ></div>
      </div>

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <button
          onClick={handleExport}
          style={{
            background: "linear-gradient(90deg, #4CAF50, #2E7D32)",
            color: "white",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            marginLeft: "30px",
          }}
          onMouseOver={(e) => {
            e.target.style.background =
              "linear-gradient(90deg, #66BB6A, #43A047)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.background =
              "linear-gradient(90deg, #4CAF50, #2E7D32)";
            e.target.style.transform = "scale(1)";
          }}
        >
          🚀 Export JSX
        </button>
      </div>
    </div>
  );
};

export default GrapesEditor;
