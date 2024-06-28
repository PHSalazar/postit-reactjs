import NavBar from "../../components/NavBar";
import CardNote from "../../components/CardNote";
import NewCard from "../../components/NewCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [Notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const addCardNote = () => {
    setNotes([...Notes, { id: Notes.length, text: "", done: false }]);
  };

  const removeNote = (keyID) => {
    setNotes(Notes.filter((note) => note.id !== keyID));
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(Notes));
  }, [Notes]);

  return (
    <div>
      <NavBar numNotes={Notes.length} />

      <div className="flex flex-wrap gap-5 p-9 flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start">
        {Notes.map((note) => (
          <CardNote
            key={note.id}
            idNote={note.id}
            removeNote={removeNote}
            Notes={Notes}
            textDefault={note.text}
            done={note.done}
          ></CardNote>
        ))}
        <NewCard addCardNote={addCardNote} />
      </div>
    </div>
  );
};

export default Home;
