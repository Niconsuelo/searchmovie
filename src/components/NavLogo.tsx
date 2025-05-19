// NavBarLogo.tsx
import { useState } from "react";
import "../styles/NavLogo.css";   // mantén tu css aquí

interface NavBarProps {
  brandName?: string;
  imageSrcPath: string;
  navItems: string[];
}

function NavBarLogo({ brandName, imageSrcPath, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="navbar">
      {/* --- Brand ------------------------------------------------------ */}
      <a href="#" className="navbar__brand">
        <img src={imageSrcPath} width={140} height={50} alt="logo1" />
        {brandName && <span className="navbar__brandName">{brandName}</span>}
      </a>

      {/* --- Navigation items (flex-row) -------------------------------- */}
      <ul className="navbar__list">
        {navItems.map((item, index) => (
          <li key={item} className="navbar__item">
            <button
              onClick={() => setSelectedIndex(index)}
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

      {/* --- Search ----------------------------------------------------- */}
      <form className="navbar__search" onSubmit={e => e.preventDefault()}>
        <input type="search" placeholder="" aria-label="Search" className="input-search"/>
        <button type="submit" className="button-search">Búsqueda</button>
      </form>
    </nav>
  );
}

export default NavBarLogo;
