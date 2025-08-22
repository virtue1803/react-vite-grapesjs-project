const Blocks = [
  // ====== Container Elements ======
  {
    id: "div",
    label: "Div",
    content: {
      tagName: "div",
      droppable: true,
      attributes: { class: "p-4 border border-gray-400 min-h-[50px]" },
    },
  },
  {
    id: "section",
    label: "Section",
    content: {
      tagName: "section",
      droppable: true,
      attributes: { class: "p-6 bg-gray-100 min-h-[50px]" },
    },
  },
  {
    id: "header",
    label: "Header",
    content: {
      tagName: "header",
      droppable: true,
      attributes: { class: "p-4 bg-blue-500 text-white min-h-[50px]" },
    },
  },
  {
    id: "footer",
    label: "Footer",
    content: {
      tagName: "footer",
      droppable: true,
      attributes: { class: "p-4 bg-gray-800 text-white min-h-[50px]" },
    },
  },
  {
    id: "main",
    label: "Main",
    content: {
      tagName: "main",
      droppable: true,
      attributes: { class: "p-6 min-h-[50px]" },
    },
  },
  {
    id: "nav",
    label: "Nav",
    content: {
      tagName: "nav",
      droppable: true,
      attributes: { class: "flex space-x-4 p-2 bg-gray-200" },
    },
  },
  {
    id: "article",
    label: "Article",
    content: {
      tagName: "article",
      droppable: true,
      attributes: { class: "p-4 border rounded min-h-[50px]" },
    },
  },
  {
    id: "aside",
    label: "Aside",
    content: {
      tagName: "aside",
      droppable: true,
      attributes: { class: "p-4 bg-gray-50 border min-h-[50px]" },
    },
  },

  // ====== Text Elements ======
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    id: `h${n}`,
    label: `H${n}`,
    content: {
      tagName: `h${n}`,
      droppable: false,
      attributes: { class: `text-${7 - n}xl font-bold` },
      content: `Heading ${n}`,
    },
  })),
  {
    id: "p",
    label: "Paragraph",
    content: {
      tagName: "p",
      droppable: false,
      attributes: { class: "text-base" },
      content: "This is a paragraph",
    },
  },
  {
    id: "span",
    label: "Span",
    content: {
      tagName: "span",
      droppable: false,
      attributes: { class: "text-sm text-gray-700" },
      content: "Inline text",
    },
  },
  {
    id: "strong",
    label: "Bold",
    content: {
      tagName: "strong",
      droppable: false,
      content: "Bold text",
    },
  },
  {
    id: "em",
    label: "Italic",
    content: {
      tagName: "em",
      droppable: false,
      content: "Italic text",
    },
  },
  {
    id: "blockquote",
    label: "Blockquote",
    content: {
      tagName: "blockquote",
      droppable: true,
      attributes: { class: "border-l-4 pl-4 italic text-gray-600" },
      content: "Quoted text",
    },
  },
  {
    id: "code",
    label: "Code",
    content: {
      tagName: "code",
      droppable: false,
      attributes: { class: "bg-gray-200 px-1 rounded" },
      content: "inline code",
    },
  },
  {
    id: "pre",
    label: "Preformatted",
    content: {
      tagName: "pre",
      droppable: true,
      attributes: { class: "bg-gray-900 text-white p-2 rounded" },
      content: "Preformatted text",
    },
  },

  // ====== Form Elements ======
  {
    id: "form",
    label: "Form",
    content: {
      tagName: "form",
      droppable: true,
      attributes: { class: "p-4 border rounded space-y-2" },
      content:
        '<input type="text" placeholder="Enter text" class="border p-2 w-full" /><button class="bg-green-500 text-white px-4 py-2 rounded">Submit</button>',
    },
  },
  {
    id: "input",
    label: "Input",
    content: {
      tagName: "input",
      droppable: false,
      attributes: {
        type: "text",
        class: "border p-2 w-full",
        placeholder: "Enter text",
      },
    },
  },
  {
    id: "textarea",
    label: "Textarea",
    content: {
      tagName: "textarea",
      droppable: false,
      attributes: { class: "border p-2 w-full", rows: 3 },
      content: "Textarea content",
    },
  },
  {
    id: "select",
    label: "Select",
    content: {
      tagName: "select",
      droppable: true,
      attributes: { class: "border p-2" },
      content: "<option>Option 1</option><option>Option 2</option>",
    },
  },
  {
    id: "label",
    label: "Label",
    content: {
      tagName: "label",
      droppable: true,
      content: "Label text",
    },
  },
  {
    id: "button",
    label: "Button",
    content: {
      tagName: "button",
      droppable: false,
      attributes: { class: "px-4 py-2 bg-blue-500 text-white rounded" },
      content: "Click me",
    },
  },

  // ====== List Elements ======
  {
    id: "ul",
    label: "List (ul)",
    content: {
      tagName: "ul",
      droppable: true,
      attributes: { class: "list-disc list-inside" },
      content: "<li>Item 1</li><li>Item 2</li>",
    },
  },
  {
    id: "ol",
    label: "List (ol)",
    content: {
      tagName: "ol",
      droppable: true,
      attributes: { class: "list-decimal list-inside" },
      content: "<li>Item 1</li><li>Item 2</li>",
    },
  },
  {
    id: "li",
    label: "List Item",
    content: {
      tagName: "li",
      droppable: true,
      content: "List item",
    },
  },
  {
    id: "dl",
    label: "Description List",
    content: {
      tagName: "dl",
      droppable: true,
      content: "<dt>Term</dt><dd>Definition</dd>",
    },
  },

  // ====== Media Elements ======
  {
    id: "img",
    label: "Image",
    content: {
      type: "image",
      droppable: false,
      attributes: {
        src: "https://via.placeholder.com/150",
        class: "rounded",
      },
    },
  },
  {
    id: "video",
    label: "Video",
    content: {
      tagName: "video",
      droppable: false,
      attributes: {
        controls: true,
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        class: "w-full",
      },
    },
  },
  {
    id: "audio",
    label: "Audio",
    content: {
      tagName: "audio",
      droppable: false,
      attributes: {
        controls: true,
        src: "https://www.w3schools.com/html/horse.mp3",
      },
    },
  },
  {
    id: "iframe",
    label: "iFrame",
    content: {
      tagName: "iframe",
      droppable: false,
      attributes: {
        src: "https://example.com",
        class: "w-full h-64 border",
      },
    },
  },

  // ====== Table Elements ======
  {
    id: "table",
    label: "Table",
    content: {
      type: "default",
      tagName: "table",
      droppable: true,
      attributes: {
        class:
          "table-auto border-collapse border border-gray-400 w-full text-left",
      },
      content: `
        <thead>
          <tr>
            <th class="border border-gray-400 px-4 py-2">Header 1</th>
            <th class="border border-gray-400 px-4 py-2">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Row 1, Col 1</td>
            <td class="border border-gray-400 px-4 py-2">Row 1, Col 2</td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Row 2, Col 1</td>
            <td class="border border-gray-400 px-4 py-2">Row 2, Col 2</td>
          </tr>
        </tbody>
      `,
    },
  },

  { id: "tr", label: "Table Row", content: { tagName: "tr", droppable: true } },
  {
    id: "th",
    label: "Table Header Cell",
    content: { tagName: "th", droppable: true, content: "Head" },
  },
  {
    id: "td",
    label: "Table Cell",
    content: { tagName: "td", droppable: true, content: "Cell" },
  },
];

export default Blocks;
