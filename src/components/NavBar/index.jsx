/* eslint-disable react/prop-types */
import IconLogo from "/favicon.png";
import IconProfile from "../../assets/iconProfile.svg";

const NavBar = ({ numNotes }) => {
  return (
    <nav className="bg-white sticky top-0 z-50 w-screen h-12 flex items-center justify-between p-9">
      <img src={IconLogo} alt="Logo" className="w-8 h-8" />
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-end">
          <p className="font-bold font-sans">Visitante</p>
          <p className="font-thin text-right text-sm font-sans">
            {numNotes} notas
          </p>
        </div>
        <img
          src={IconProfile}
          alt="Icone de Menu"
          className="w-9 h-9 bg-gray-600 p-1 rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavBar;
