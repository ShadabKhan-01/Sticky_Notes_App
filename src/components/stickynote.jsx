"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react"; // Optional: icon from lucide-react
import { Handlee } from "next/font/google";

const handlee = Handlee({
  subsets:['latin'],
  weight:'400',
  display:'swap'
})

const colorMap = {
  green: {
    bg: "bg-green-200",
    border: "border-green-300",
    text: "text-green-900",
  },
  yellow: {
    bg: "bg-yellow-200",
    border: "border-yellow-300",
    text: "text-yellow-900",
  },
  pink: {
    bg: "bg-pink-200",
    border: "border-pink-300",
    text: "text-pink-900",
  },
  blue: {
    bg: "bg-blue-200",
    border: "border-blue-300",
    text: "text-blue-900",
  },
  purple: {
    bg: "bg-purple-200",
    border: "border-purple-300",
    text: "text-purple-900",
  },
};

export default function StickyNote({
  color = "green",
  title = "Note",
  content = "Click to edit...",
  onDelete = () => {},
  onUpdate = () => {},
}) {
  const styles = colorMap[color] || colorMap.green;

  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  const handleDone = (e) => {
    e.stopPropagation();
    onUpdate({ title: noteTitle, content: noteContent });
    setIsEditing(false);
  };

  return (
    <div
      className={`relative w-64 h-64 p-4 shadow-xl rounded-md rotate-[-2deg] 
        ${styles.bg} ${styles.border} ${styles.text} border cursor-pointer overflow-y-auto overflow-x-clip custom-scrollbar`}
      onClick={() => setIsEditing(true)}
    >
      {/* Tape */}
      <div className="absolute top-0 left-0 w-12 h-4 bg-yellow-300 rotate-[-10deg] shadow-md"></div>
      <div className="absolute top-0 right-0 w-12 h-4 bg-yellow-300 rotate-[10deg] shadow-md"></div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
        aria-label="Delete note"
      >
        <Trash2 size={18}/>
      </button>

      {isEditing ? (
        <div className="flex flex-col gap-2 h-full">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="bg-transparent outline-none font-bold text-lg"
            autoFocus
          />
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="bg-transparent outline-none resize-none h-32 custom-scrollbar"
          />
          <button onClick={handleDone} className="mt-auto text-sm text-right underline cursor-pointer">
            Done
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-2">{noteTitle}</h2>
          <p className={`${handlee.style.fontFamily} font-[handlee] text-justify`}>{noteContent}</p>
        </>
      )}
    </div>
  );
}