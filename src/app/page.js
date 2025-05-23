"use client";
import StickyNote from "@/components/stickynote";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2 } from "lucide-react";

export default function Home() {

  // For Animating AddNotes Bar
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [Sticky, setSticky] = useState([
    "bg-green-300",
    "bg-yellow-300",
    "bg-pink-300",
    "bg-blue-300",
    "bg-purple-300"
  ])

  // collection of Notes
  const [notes, setNotes] = useState([])

  // Getting data from local storage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    setNotes(storedNotes);
  }, [])

  // setting data to local storage
  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes])


  // handling AddNotes Bar animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, move it out of view
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Add a new note
  const addNote = (colorVal) => {
    const result = colorVal.slice(3, -4)
    const newNote = { id: uuidv4(), color: result, title: "Note", content: "Your content goes here..." }
    setNotes(prevNote => [...prevNote, newNote]);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // optional: 'auto' or 'smooth'
      });
    }, 50);
    toast.success('Added Successfully!')
  }

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setTimeout(() => {
      toast('Deleted!', {
        icon: <Trash2 stroke="red" />,
      });
    }, 50);
  };

  return (
    <div>
      <div><Toaster /></div>
      <ul className="w-[95vw] m-auto mt-10 flex justify-evenly gap-5 flex-wrap">
        {notes.map((object, index) =>
        (
          <li key={index} className="">
            <StickyNote color={object.color} title={object.title} content={object.content}
              onDelete={() => deleteNote(object.id)}
              onUpdate={(updatedNote) =>{
                setNotes(
                  notes.map((n) => (n.id === object.id ? { ...n, ...updatedNote } : n))
                );
                toast.success('Saved!');
              }}
            />
          </li>
        )
        )}
      </ul>
      <div className="fixed top-0 left-0 -z-10 h-screen w-screen flex justify-center items-center flex-col gap-3">
        <p className="text-3xl font-semibold text-center">Click on any note icon below to add a new note.</p>
        <p className="text-2xl font-semibold">Click on any note to edit it.</p>
      </div>
      <div className={`fixed flex items-center justify-evenly left-1/2 bottom-10 -translate-1/2 bg-gray-200 border w-3/4 sm:w-1/2 h-14 rounded-2xl transition-transform duration-300 ease-in-out ${!isVisible && 'translate-y-[100vh]'}`}>
        {Sticky.map((color, index) =>
          (<div key={index} className={`h-8 w-8 ${color} cursor-pointer hover:scale-150 hover:-translate-y-3 transition-all ease-in-out duration-100`} onClick={() => addNote(color)} />))}
      </div>
    </div>
  );
}
