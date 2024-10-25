import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.css";

const toolbarButtons = [
  {
    label: "Bold",
    command: "toggleBold",
    isActive: "bold",
  },
  {
    label: "Italic",
    command: "toggleItalic",
    isActive: "italic",
  },
  {
    label: "Strike",
    command: "toggleStrike",
    isActive: "strike",
  },
  {
    label: "Code",
    command: "toggleCode",
    isActive: "code",
  },
  {
    label: "Clear marks",
    command: "unsetAllMarks",
  },
  {
    label: "Clear nodes",
    command: "clearNodes",
  },
  {
    label: "Paragraph",
    command: "setParagraph",
    isActive: "paragraph",
  },
  {
    label: "H1",
    command: "toggleHeading",
    level: 1,
    isActive: "heading",
  },
  {
    label: "H2",
    command: "toggleHeading",
    level: 2,
    isActive: "heading",
  },
  {
    label: "H3",
    command: "toggleHeading",
    level: 3,
    isActive: "heading",
  },
  {
    label: "H4",
    command: "toggleHeading",
    level: 4,
    isActive: "heading",
  },
  {
    label: "H5",
    command: "toggleHeading",
    level: 5,
    isActive: "heading",
  },
  {
    label: "H6",
    command: "toggleHeading",
    level: 6,
    isActive: "heading",
  },
  {
    label: "Bullet list",
    command: "toggleBulletList",
    isActive: "bulletList",
  },
  {
    label: "Ordered list",
    command: "toggleOrderedList",
    isActive: "orderedList",
  },
  {
    label: "Code block",
    command: "toggleCodeBlock",
    isActive: "codeBlock",
  },
  {
    label: "Blockquote",
    command: "toggleBlockquote",
    isActive: "blockquote",
  },
  {
    label: "Horizontal rule",
    command: "setHorizontalRule",
  },
  {
    label: "Hard break",
    command: "setHardBreak",
  },
  {
    label: "Undo",
    command: "undo",
  },
  {
    label: "Redo",
    command: "redo",
  },
  {
    label: "Purple",
    command: "setColor",
    color: "#958DF1",
    isActive: "textStyle",
  },
];

const ToolbarButton = ({
  label,
  command,
  level,
  color,
  isActive,
  editor,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const handleClick = () => {
    if (command === "toggleHeading") {
      editor.chain().focus().toggleHeading({ level }).run();
    } else if (command === "setColor") {
      editor.chain().focus().setColor(color).run();
    } else {
      editor.chain().focus()[command]().run();
    }
  };

  const isDisabled = () => {
    if (command === "undo" || command === "redo") {
      return !editor.can().chain().focus()[command]().run();
    }
    return false;
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled()}
      className={`${
        isActive && editor.isActive(isActive, { level, color })
          ? "is-active"
          : "  bg-gray-200 "
      } p-1 px-2  rounded-md`}
    >
      {label}
    </button>
  );
};

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group w-full bg-blue-50 p-2">
      <div className="button-group w-full flex gap-1 gap-x-2 flex-grow flex-wrap">
        {toolbarButtons.map((button, index) => (
          <ToolbarButton key={index} {...button} editor={editor} />
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="control-group w-full bg-blue-50">
  //     <div className="button-group w-full flex gap-3 flex-grow flex-wrap">
  //       <button
  //         onClick={() => editor.chain().focus().toggleBold().run()}
  //         disabled={!editor.can().chain().focus().toggleBold().run()}
  //         className={`${editor.isActive("bold") ? "is-active" : ""} `}
  //       >
  //         Bold
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleItalic().run()}
  //         disabled={!editor.can().chain().focus().toggleItalic().run()}
  //         className={editor.isActive("italic") ? "is-active" : ""}
  //       >
  //         Italic
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleStrike().run()}
  //         disabled={!editor.can().chain().focus().toggleStrike().run()}
  //         className={editor.isActive("strike") ? "is-active" : ""}
  //       >
  //         Strike
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleCode().run()}
  //         disabled={!editor.can().chain().focus().toggleCode().run()}
  //         className={editor.isActive("code") ? "is-active" : ""}
  //       >
  //         Code
  //       </button>
  //       <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
  //         Clear marks
  //       </button>
  //       <button onClick={() => editor.chain().focus().clearNodes().run()}>
  //         Clear nodes
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().setParagraph().run()}
  //         className={editor.isActive("paragraph") ? "is-active" : ""}
  //       >
  //         Paragraph
  //       </button>
  //       <button
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 1 }).run()
  //         }
  //         className={
  //           editor.isActive("heading", { level: 1 }) ? "is-active" : ""
  //         }
  //       >
  //         H1
  //       </button>
  //       <button
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 2 }).run()
  //         }
  //         className={
  //           editor.isActive("heading", { level: 2 }) ? "is-active" : ""
  //         }
  //       >
  //         H2
  //       </button>
  //       <button
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 3 }).run()
  //         }
  //         className={
  //           editor.isActive("heading", { level: 3 }) ? "is-active" : ""
  //         }
  //       >
  //         H3
  //       </button>
  //       <button
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 4 }).run()
  //         }
  //         className={
  //           editor.isActive("heading", { level: 4 }) ? "is-active" : ""
  //         }
  //       >
  //         H4
  //       </button>
  //       <button
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 5 }).run()
  //         }
  //         className={
  //           editor.isActive("heading", { level: 5 }) ? "is-active" : ""
  //         }
  //       >
  //         H5
  //       </button>
  //       <button
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 6 }).run()
  //         }
  //         className={
  //           editor.isActive("heading", { level: 6 }) ? "is-active" : ""
  //         }
  //       >
  //         H6
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleBulletList().run()}
  //         className={editor.isActive("bulletList") ? "is-active" : ""}
  //       >
  //         Bullet list
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleOrderedList().run()}
  //         className={editor.isActive("orderedList") ? "is-active" : ""}
  //       >
  //         Ordered list
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
  //         className={editor.isActive("codeBlock") ? "is-active" : ""}
  //       >
  //         Code block
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().toggleBlockquote().run()}
  //         className={editor.isActive("blockquote") ? "is-active" : ""}
  //       >
  //         Blockquote
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().setHorizontalRule().run()}
  //       >
  //         Horizontal rule
  //       </button>
  //       <button onClick={() => editor.chain().focus().setHardBreak().run()}>
  //         Hard break
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().undo().run()}
  //         disabled={!editor.can().chain().focus().undo().run()}
  //       >
  //         Undo
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().redo().run()}
  //         disabled={!editor.can().chain().focus().redo().run()}
  //       >
  //         Redo
  //       </button>
  //       <button
  //         onClick={() => editor.chain().focus().setColor("#958DF1").run()}
  //         className={
  //           editor.isActive("textStyle", { color: "#958DF1" })
  //             ? "is-active"
  //             : ""
  //         }
  //       >
  //         Purple
  //       </button>
  //     </div>
  //   </div>
  // );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export default () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};
