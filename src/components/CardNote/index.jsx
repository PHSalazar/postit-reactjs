/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import IconPin from "../../assets/pin.png";
import IconEdit from "../../assets/iconEdit.svg";
import IconDelete from "../../assets/iconDelete.svg";
import IconDone from "../../assets/iconDone.svg";
import { toast } from "react-toastify";

const CardNote = ({ idNote, textDefault, removeNote, done, Notes }) => {
  const inputNote = useRef(null);

  useEffect(() => {
    if (textDefault.trim() === "") {
      inputNote.current.focus();
    } else {
      inputNote.current.focus();
      inputNote.current.blur();
    }
  }, []);

  useEffect(() => {
    if (done) {
      const parentNote = inputNote.current.parentNode;
      parentNote.classList.remove("bg-yellow-300");
      parentNote.classList.add("bg-lime-500", "opacity-50");
      inputNote.current.classList.add("text-gray-700", "italic");
    }
  }, [done]);

  const setReadOnly = (element) => {
    if (element.target.value.trim() === "") {
      removeNote(idNote);
      toast.error(
        <>
          A tarefa foi excluída automaticamente, pois seu texto era vazio.
          <br />
          <br />
          <strong>DICA:</strong> DIGITE O TEXTO ANTES DE TIRAR O FOCO DA NOTA.
        </>,
        {
          position: "bottom-center",
          autoClose: 13000,
          draggable: true,
        }
      );
    }

    const existsNote = Notes.some(
      (note) =>
        note.text.trim().toLowerCase() ===
          element.target.value.trim().toLowerCase() && note.id !== idNote
    );

    if (!existsNote) {
      Notes[idNote].text = element.target.value.trim();
    } else {
      toast.error(
        <>
          Já existe uma nota com o mesmo texto: <b>{element.target.value}</b>.
          <br />A última nota foi cancelada.
        </>,
        { position: "bottom-center", autoClose: 6000 }
      );
      removeNote(idNote);
      return;
    }

    Notes[idNote].text = element.target.value.trim();
    localStorage.setItem("notes", JSON.stringify(Notes));

    element.target.setAttribute("disabled", "");
    element.target.classList.add("text-lg", "font-light");
  };

  const editNote = () => {
    const parentNote = inputNote.current.parentNode;
    if (parentNote.classList.contains("bg-lime-500")) {
      toast.info(
        <>
          Não é permitido editar uma nota que já está marcada como{" "}
          <strong>concluída</strong>.
        </>,
        { autoClose: 6000 }
      );
      return;
    }

    const textoCampoNota = inputNote.current;
    textoCampoNota.removeAttribute("disabled");
    textoCampoNota.focus();
    textoCampoNota.classList.remove("font-light");
  };

  const doneNote = () => {
    const parentNote = inputNote.current.parentNode;
    parentNote.classList.toggle("bg-yellow-300");
    parentNote.classList.toggle("bg-lime-500");
    parentNote.classList.toggle("opacity-50");
    parentNote.classList.toggle("hover:opacity-80");
    // parentNote.querySelector("#buttonsAction").classList.add("hidden");
    parentNote.removeAttribute("title");
    inputNote.current.classList.toggle("text-gray-700", "italic");

    Notes[idNote].done = !Notes[idNote].done;
    localStorage.setItem("notes", JSON.stringify(Notes));
  };

  return (
    <div className="w-60 h-60 bg-yellow-300 p-2 text-left font-sans text-black text-sm hover:opacity-80 relative flex flex-col justify-end items-end">
      <textarea
        ref={inputNote}
        className="w-full flex-1 border-0 bg-transparent outline-none resize-none text-lg placeholder:italic"
        placeholder="Escreva aqui a sua nota"
        onBlur={(element) => setReadOnly(element)}
        defaultValue={textDefault}
      ></textarea>
      <img src={IconPin} className="w-8 absolute -top-5 -right-5" />

      <div
        id="buttonsAction"
        className="w-full p-3 flex flex-row gap-1 justify-between"
      >
        <img
          src={IconDone}
          className="w-5 opacity-50 hover:opacity-100 cursor-pointer"
          alt="Icone para deletar Nota"
          title="Clique para DELETAR essa nota"
          onClick={doneNote}
        />

        <img
          src={IconEdit}
          className="w-5 opacity-50 hover:opacity-100 cursor-pointer"
          alt="Icone para editar Nota"
          title="Clique para EDITAR essa nota"
          onClick={editNote}
        />

        <img
          src={IconDelete}
          className="w-5 opacity-50 hover:opacity-100 cursor-pointer"
          alt="Icone para deletar Nota"
          title="Clique para DELETAR essa nota"
          onClick={() => removeNote(idNote)}
        />
      </div>
    </div>
  );
};

export default CardNote;
