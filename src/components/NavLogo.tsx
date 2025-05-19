import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavLogo.css";  

interface NavBarProps {
  brandName?: string;
  imageSrcPath: string;
  navItems: string[];
}

function NavBarLogo({ brandName, imageSrcPath, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const handleClick = (item: string, index: number) => {
    setSelectedIndex(index);

    // Aquí revisas el nombre del item y navegas
    if (item.toLowerCase() === "contacto") {
      navigate("/contactme");
    }

    // Si quieres agregar más rutas para otros items, aquí puedes agregar más condiciones
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar__brand">
        <img src={imageSrcPath} width={140} height={50} alt="logo1" />
        {brandName && <span className="navbar__brandName">{brandName}</span>}
      </a>

      <ul className="navbar__list">
        {navItems.map((item, index) => (
          <li key={item} className="navbar__item">
            <button
              onClick={() => handleClick(item, index)}
              className={
                selectedIndex === index
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <form className="navbar__search" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder="" aria-label="Search" className="input-search"/>
        <button type="submit" className="button-search">Búsqueda</button>
      </form>
    </nav>
  );
}

export default NavBarLogo;
