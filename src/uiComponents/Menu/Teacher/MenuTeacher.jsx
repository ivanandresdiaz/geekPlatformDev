import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCode, FaFolder, FaShieldAlt, FaUserCircle, FaUserFriends, FaWrench } from 'react-icons/fa';
import { VscColorMode } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { getFullName } from '../../../reducers/authReducer';
import { singOutAuth } from '../../../actions/authActions';
import { Dropdown, IconButton, IconMenu, MenuItems, Welcome } from './MenuTeacherStyles';
import menu from '../../../images/other/menu.png';
import { Button3 } from '../../../globalStyles';

export const MenuTeacher = (props) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <IconMenu src={menu} onClick={() => setOpen(!open)} />
      {open && props.children}
    </>

  );
};

export const TeacherDropdown = () => {
  const dispatch = useDispatch();
  const fullName = useSelector(getFullName);
  const userDataLogged = useSelector((state) => state.auth);

  const handleCerrarSesion = () => {
    dispatch(singOutAuth());
  };
  const TeacherDropdownItem = (props) => {
    return (
      <>
        <MenuItems>
          <IconButton>{props.leftIcon}</IconButton>
          {props.children}
        </MenuItems>
      </>
    );

  };

  return (
    <Dropdown>
      <Welcome>
        Bienvenido
        {' '}
        {fullName}
      </Welcome>
      {
        userDataLogged.uid && (
          <Link to={`/socialGeek/Frontend0/${userDataLogged.uid}`}>
            <TeacherDropdownItem leftIcon={<FaUserCircle />}>Mi perfil</TeacherDropdownItem>
          </Link>
        )
      }

      <Link to='/bancoRecursosAcademicos'>
        <TeacherDropdownItem leftIcon={<FaFolder />}>Recursos</TeacherDropdownItem>
      </Link>
      <Link to='/'>
        <TeacherDropdownItem leftIcon={<FaShieldAlt />}>Panel Teacher</TeacherDropdownItem>
      </Link>
      <Link to='/codelingoTeacher'>
        <TeacherDropdownItem leftIcon={<FaCode />}>Codelingo</TeacherDropdownItem>
      </Link>
      <TeacherDropdownItem leftIcon={<FaWrench />}>Configuración</TeacherDropdownItem>
      <TeacherDropdownItem leftIcon={<VscColorMode />}>Darkmode</TeacherDropdownItem>
      <Button3 type='button' onClick={handleCerrarSesion} primary>Cerrar sesión</Button3>

    </Dropdown>
  );
};

