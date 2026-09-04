import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArchive,
  faFolder,
  faPager,
  faNewspaper,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/Context";




import style from "./style.module.css";

import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { activeRoute, setActiveRoute } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const route = location.pathname.split("/").filter(Boolean)[0] || "dashboard";

    setActiveRoute(route);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>

      <main className={style.container}>
        <div className={`${style.containerMenu} ${isMenuOpen ? style.open : style.closed}`}>
          <button className={style.toggleBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
          <aside className={style.menuSide}>
            <div>
              {/* <img src={logo} alt="Lite Notes" className={style.logo} /> */}
            </div>
            <div className={style.linksMenu}>
              <div className={style.linksMenuNote}>
                <ul>
                  <li>
                    <Link
                      to="dashboard"
                      className={
                        activeRoute === "dashboard" ? style.active : ""
                      }
                      onClick={() => setActiveRoute("dashboard")}
                    >
                      <FontAwesomeIcon icon={faHome} className={style.icon} />
                      <span>Dashboard</span>
                    </Link>
                    
                  </li>

                   <li>
                    <Link
                      to="editais"
                      className={
                        activeRoute === "editais" ? style.active : ""
                      }
                      onClick={() => setActiveRoute("editais")}
                    >
                      <FontAwesomeIcon icon={faNewspaper} className={style.icon} />
                      <span>Editais</span>
                    </Link>
                    
                  </li>
                </ul>
              </div>

            </div>

            <div className={style.containerProfile}>
              <div className={style.imgProfile}>
                {/* <FontAwesomeIcon icon={faUser} color="#fff" size="1x" /> */}
              </div>
              <div className={style.infoProfile}>
                {/* <h3>{user.nome}</h3> */}
                <p>email@example.com</p>
              </div>
            </div>
            <div className={style.btnLogout}>
              <button onClick={logout}>
                {/* <FontAwesomeIcon icon={faSignOutAlt} className={style.icon} /> */}
              </button>
            </div>
          </aside>
        </div>

        <div className={`${style.containerContent} ${isMenuOpen ? style.contentOpen : style.contentClosed}`}>
          {/* <div className={style.headerContent}>
            <p>👋 Bem-vindo, {user.nome.split(" ")[0]}!</p>
            <p>👋 Bem-vindo!</p>
          </div> */}
          <div className={style.titlePage}>
            <h1>
              {activeRoute === "dashboard"
                ? "Dashboard"
                : activeRoute === 'editais' ? 'Editais' :''}
            </h1>
          </div>
          {/* <div className={style.containerSearch}>
            <div className={style.search}>
              <div className={style.containerIcon}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input type="text" placeholder="Pesquisar nota..." />
            </div>

            <button
              className={style.btnNoteNew}
              onClick={() => setModalVisible(true)}
            >
              + Adicionar nota
            </button>
          </div> */}
          <Outlet />
        </div>
      </main>
      {/* 
      <header className={style.headerHome}>
        <h1>Lite Notes</h1>

        <button
          className={style.btnNote}
          onClick={() => setModalVisible(true)}
        >
          Nova Nota +
        </button>
      </header>

      <main className={style.container}>
        <section className={style.sectionNotes}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={notes}
              strategy={verticalListSortingStrategy}
            >
              <div className={style.cardsNotes}>
                {notes.map((note) => (
                  <SortableCard
                    key={note.id}
                    note={note}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </section>
      </main> */}
    </>
  );
};

export default Layout;