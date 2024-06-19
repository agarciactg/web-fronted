import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { Image } from '@profabric/react-components';
import styled from 'styled-components';
import i18n from '@app/utils/i18n';
import './menuSidebar.css'

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU_ADMIN: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    path: '/',
  },
  {
    name: i18n.t('menusidebar.label.users'),
    icon: 'fa fa-list nav-icon',
    path: '/users',
  },
  {
    name: 'Asignaturas',
    icon: 'fa fa-book nav-icon',
    path: '/subjects',
  },
  {
    name: 'Grupos Academicos',
    icon: 'fa fa-sitemap nav-icon',
    path: '/academic-groups',
  },
  {
    name: i18n.t('menusidebar.label.enrollment'),
    icon: 'fa fa-users nav-icon',
    path: '/enrollment',
  },
];

export const MENU_TEACHER: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.mainMenu'),
    icon: 'far fa-caret-square-down nav-icon',
    children: [
      {
        name: i18n.t('menusidebar.label.subMenu'),
        icon: 'fas fa-hammer nav-icon',
        path: '/sub-menu-1',
      },

      {
        name: i18n.t('menusidebar.label.blank'),
        icon: 'fas fa-cogs nav-icon',
        path: '/sub-menu-2',
      },
    ],
  },
];

export const MENU_STUDENT: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.blank'),
    icon: 'fas fa-wrench nav-icon',
    path: '/blank',
  },
];

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar: React.FC = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  const [selectedMenu, setSelectedMenu] = useState<IMenuItem[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    const type = localStorage.getItem("type_user");
    if (type) {
      const normalizedType = JSON.parse(type).toLowerCase().trim();
      setUserType(normalizedType);

      switch (normalizedType) {
        case "administrador":
          setSelectedMenu(MENU_ADMIN);
          break;
        case "docente":
          setSelectedMenu(MENU_TEACHER);
          break;
        case "estudiante":
          setSelectedMenu(MENU_STUDENT);
          break;
        default:
          setSelectedMenu([]);
          break;
      }
    } else { 
      console.log("Tipo de usuario no encontrado.")
    }
  }, [authentication]);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text-font-weight-light">Software Matriculas</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        <nav className="mt-2 menu-container">
          <ul
            className={`nav nav-pills nav-sidebar flex-column${menuItemFlat ? ' nav-flat' : ''}${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {selectedMenu.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name + menuItem.path} menuItem={menuItem} />
            ))}
          </ul>
          <ul className="nav nav-pills nav-sidebar flex-column bottom-menu" role="menu">
            <MenuItem
              key="Configuracion"
              menuItem={{
                name: 'Configuración',
                icon: 'fa fa-cog nav-icon',
                path: '/settings',
              }}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
