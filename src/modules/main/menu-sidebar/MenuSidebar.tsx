import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { Image } from '@profabric/react-components';
import styled from 'styled-components';
import { SidebarSearch } from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';

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
    name: i18n.t('menusidebar.label.enrollment'),
    icon: 'fa fa-users nav-icon',
    path: '/enrollment',
  },
  {
    name: i18n.t('menusidebar.label.users'),
    icon: 'fa fa-list nav-icon',
    path: '/users',
  },
  // {
  //   name: i18n.t('menusidebar.label.mainMenu'),
  //   icon: 'far fa-caret-square-down nav-icon',
  //   children: [
  //     {
  //       name: i18n.t('menusidebar.label.subMenu'),
  //       icon: 'fas fa-hammer nav-icon',
  //       path: '/sub-menu-1',
  //     },

  //     {
  //       name: i18n.t('menusidebar.label.blank'),
  //       icon: 'fas fa-cogs nav-icon',
  //       path: '/sub-menu-2',
  //     },
  //   ],
  // },
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
  // Otros ítems para el estudiante...
];

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar: React.FC = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  // Define el tipo de usuario y selecciona el menú correspondiente
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
  }, [authentication]); // Considera actualizar esta dependencia si es necesario

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
        <span className="brand-text font-weight-light">AdminLTE 3</span>
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
        
        {/* 
        <div className="form-inline">
          <SidebarSearch />
        </div> 
        */}

        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${menuItemFlat ? ' nav-flat' : ''}${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {selectedMenu.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name + menuItem.path} menuItem={menuItem} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
