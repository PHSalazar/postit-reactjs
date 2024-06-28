/* eslint-disable react/prop-types */
import IconAddNote from "../../assets/iconAddNote.svg";

const NewCard = ({ addCardNote }) => {
  return (
    <div className="w-16 h-60 bg-transparent flex items-center justify-center">
      <img
        src={IconAddNote}
        alt="Icone para Adicionar nova note"
        className="w-12 h-12  hover:opacity-80 cursor-pointer"
        title="Clique para adicionar uma nova nota"
        onClick={addCardNote}
      />
    </div>
  );
};

export default NewCard;
