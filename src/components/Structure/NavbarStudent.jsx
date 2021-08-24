import React from 'react';
import { IconContext } from 'react-icons/lib';
import { useSelector } from 'react-redux';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavMenu,
  NavItemBtn,
  NavIcon,
  NavItem,
  NavLinks,
} from '../../styles/NavbarStyles';
import logo from '../../images/brand/logo.png';
import { MenuStudent, StudentDropdown } from '../../uiComponents/Menu/Student/MenuStudent';

const NavbarStudent = () => {
  const userDataLogged = useSelector((state) => state.auth);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to='/inicio'>
              <NavIcon src={logo} />
              Geek Platform
            </NavLogo>
            <NavMenu>
              <NavItem>
                <NavLinks to={`/socialGeek/${userDataLogged.corteId}`}>
                  Social Geek
                </NavLinks>
              </NavItem>
              <NavItemBtn>
                <MenuStudent>
                  <StudentDropdown />
                </MenuStudent>
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default NavbarStudent;
