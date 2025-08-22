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
          [plugin2]: {
            config: {
              // Cấu hình cho Tailwind plugin
              purgeCSS: false,
            }
          }
        },
        blockManager: {
          appendTo: "#blocks",
        },
        panels: {
          defaults: [
            {
              id: 'layers',
              el: '.panel__right',
              resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0,
                cl: 1,
                cr: 0,
                bc: 0,
                keyWidth: 'flex-basis',
              },
            },
            {
              id: 'panel-switcher',
              el: '.panel__switcher',
              buttons: [
                {
                  id: 'show-layers',
                  active: true,
                  label: 'Layers',
                  command: 'show-layers',
                  togglable: false,
                },
                {
                  id: 'show-style',
                  active: true,
                  label: 'Styles',
                  command: 'show-styles',
                  togglable: false,
                }
              ],
            }
          ]
        },
        layerManager: {
          appendTo: '.layers-container'
        },
        selectorManager: {
          appendTo: '.styles-container'
        },
        styleManager: {
          appendTo: '.styles-container',
          sectors: [
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'min-height', 'padding'],
              properties: [
                {
                  type: 'integer',
                  name: 'The width',
                  property: 'width',
                  units: ['px', '%'],
                  defaults: 'auto',
                  min: 0,
                }
              ]
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['background-color', 'box-shadow', 'custom-prop'],
              properties: [
                {
                  id: 'custom-prop',
                  name: 'Custom Label',
                  property: 'font-size',
                  type: 'select',
                  defaults: '32px',
                  options: [
                    { value: '12px', name: 'Tiny' },
                    { value: '18px', name: 'Medium' },
                    { value: '32px', name: 'Big' },
                  ],
                }
              ]
            }
          ]
        }
      });

      editorInstanceRef.current = editor;

      // Thêm các block từ file Blocks
      Blocks.forEach((block) => {
        if (!editor.BlockManager.get(block.id)) {
          editor.BlockManager.add(block.id, block);
        }
      });

      // Thêm commands cho panels
      editor.Commands.add('show-layers', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row) { return row.querySelector('.layers-container') },

        run(editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = '';
        },
        stop(editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = 'none';
        },
      });

      editor.Commands.add('show-styles', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getStyleEl(row) { return row.querySelector('.styles-container') },

        run(editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = '';
        },
        stop(editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = 'none';
        },
      });
    }
  }, []);

  // Hàm lọc CSS chỉ lấy class và id đang dùng trong HTML
  const filterCSS = (fullCSS, classList, idList) => {
    const blocks = fullCSS.split("}");
    const filtered = blocks
      .map((b) => b.trim())
      .filter(
        (b) =>
          classList.some((cls) => {
            const escapedCls = cls.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
            return b.includes(`.${escapedCls}`);
          }) || idList.some((id) => b.includes(`#${id}`))
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

      // Lấy danh sách id duy nhất trong HTML
      const idList = Array.from(
        new Set(
          html
            .match(/id="([^"]+)"/g)
            ?.map((m) => m.replace(/id="/, "").replace(/"/, "")) || []
        )
      );

      // Lấy CSS đầy đủ từ GrapesJS
      const fullCSS = editor.getCss();
      const filteredCSS = filterCSS(fullCSS, classList, idList);

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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="editor-row" style={{ display: "flex", flex: 1 }}>
        <div
          id="blocks"
          style={{
            width: "250px",
            height: "100%",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            padding: "10px",
            backgroundColor: "#f8f9fa"
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold" }}>
            Blocks
          </h3>
        </div>
        <div
          ref={editorRef}
          style={{
            flex: 1,
            border: "1px solid #ccc",
            height: "100%",
            overflow: "auto",
          }}
        />
        <div className="panel__right" style={{ width: "300px", display: "flex", flexDirection: "column" }}>
          <div className="panel__switcher" style={{ 
            display: "flex", 
            borderBottom: "1px solid #ddd",
            backgroundColor: "#f8f9fa"
          }}>
            <button 
              style={{ 
                flex: 1, 
                padding: "10px", 
                border: "none", 
                backgroundColor: "transparent",
                cursor: "pointer"
              }}
              onClick={() => {
                const editor = editorInstanceRef.current;
                if (editor) editor.runCommand('show-layers');
              }}
            >
              Layers
            </button>
            <button 
              style={{ 
                flex: 1, 
                padding: "10px", 
                border: "none", 
                backgroundColor: "transparent",
                cursor: "pointer"
              }}
              onClick={() => {
                const editor = editorInstanceRef.current;
                if (editor) editor.runCommand('show-styles');
              }}
            >
              Styles
            </button>
          </div>
          <div className="layers-container" style={{ 
            flex: 1, 
            padding: "10px",
            overflowY: "auto",
            backgroundColor: "white"
          }}></div>
          <div className="styles-container" style={{ 
            flex: 1, 
            padding: "10px",
            overflowY: "auto",
            backgroundColor: "white",
            display: "none"
          }}></div>
        </div>
      </div>

      <div style={{ 
        padding: "10px", 
        borderTop: "1px solid #ddd",
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center"
      }}>
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
