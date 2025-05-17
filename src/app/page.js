"use client";
import StickyNote from "@/components/stickynote";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [Sticky, setSticky] = useState([
    "bg-green-300",
    "bg-yellow-300",
    "bg-pink-300",
    "bg-blue-300",
    "bg-purple-300"
  ])

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    setNotes(storedNotes);
  }, [])

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes])


  const addNote = (colorVal) => {
    const result = colorVal.slice(3, -4)
    const newNote = { id: uuidv4(), color: result, title: "Note", content: "Your content goes here..." }
    setNotes(prevNote => [...prevNote, newNote]);
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <ul className="w-[95vw] m-auto mt-10 flex justify-evenly gap-5 flex-wrap">
        {notes.map((object, index) =>
        (
          <li key={index} className="">
            <StickyNote color={object.color} title={object.title} content={object.content}
              onDelete={() => deleteNote(object.id)}
              onUpdate={(updatedNote) =>
                setNotes(
                  notes.map((n) => (n.id === object.id ? { ...n, ...updatedNote } : n))
                )
              }
            />
          </li>
        )
        )}
      </ul>
      <div className="fixed flex items-center justify-evenly left-1/2 bottom-10 -translate-1/2 bg-gray-200 border w-1/2 h-14 rounded-2xl">
        {Sticky.map((color, index) =>
          (<div key={index} className={`h-8 w-8 ${color} cursor-pointer hover:scale-150 transition-all ease-in-out duration-100`} onClick={() => addNote(color)} />))}
      </div>
    </div>
  );
}
