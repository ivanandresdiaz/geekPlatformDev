import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFirestoreStudentsCorte } from '../../actions/studentsActions';
import { getStudentsCorte } from '../../reducers/studentsReducer';
import { DivContainerList, DivRowList, ImgStudent, ContainerPorcentajeAsistencia, PorcentajeAsistencia, ContainerPActivo, ContainerPInactivo, DivFullName, DivContainerInputCheckBox, ContainerGeekyPuntos } from './styledListarStudentsCorte.js';
import { enviarFirestoreLista } from '../../actions/classroomActions';
import { Button4, Button5 } from '../../globalStyles';
import { ModalEstudiantes } from '../Modal/Modal';
import { getRole } from '../../reducers/authReducer';
import useForm from '../../hooks/useForm';

const ListarStudentsCorte = (props) => {
  const { corteId, handleShowDataStudent } = props;
  const role = useSelector(getRole);
  const [showModalE, setShowModalE] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const OpenModalE = () => { setShowModalE((prevE) => !prevE); };
  const [formValues, handleInputChange, reset] = useForm({
    date: '',
    classroom: '',
  });
  const { date, classroom } = formValues;
  const studentsCorte = useSelector(getStudentsCorte);
  let dataListStudents = {};
  studentsCorte.forEach((student) => {
    dataListStudents = {
      ...dataListStudents,
      [student.uid]: {
        assistance: [...student.assistance, 0],
        uid: student.uid,
        geekyPuntos: student.geekyPuntos,
      },
    };
  });

  const dispatch = useDispatch();
  const [state, setState] = useState({});
  useEffect(() => {
    if (!(studentsCorte.length > 0)) {
      dispatch(getFirestoreStudentsCorte(corteId));
    }
  }, []);
  const handleInputChangeCheckbox = (evento, uid, assistance, geekyPuntos) => {
    if (evento.target.checked) {
      setState({
        ...state,
        [uid]: {
          [evento.target.name]: [...assistance, 1],
          uid,
          geekyPuntos: geekyPuntos + 1,
        },
      });
    } else {
      setState({
        ...state,
        [uid]: {
          [evento.target.name]: [...assistance, 0],
          uid,
          geekyPuntos: geekyPuntos - 1,
        },
      });
    }

  };
  const handleEnviarLista = (event) => {
    event.preventDefault();
    const preparacionLista = { ...dataListStudents, ...state };// mezclo todos los estudiantes, los que vinieron y los que no vinieron. ademas incluyen unos datos de suma de geekyPuntos y asistencia
    if (Object.keys(state).length > 0) { // valido si ha seleccionado algun estudiante, de lo contrario lanzara una alerta
      const studentsInClass = Object.keys(state); // seleccion los estudiantes que estuvieron presentes en clase
      const allStudents = Object.keys(dataListStudents);
      const studentsNoInClass = allStudents.filter((item) => {
        if (!(studentsInClass.includes(item))) {
          return item;
        }
      });
      const listaEnviar = Object.entries(preparacionLista).map((item) => item[1]);
      if (classroom.length > 0) {
        if (date.length > 0) {
          dispatch(enviarFirestoreLista(corteId, listaEnviar, classroom, date, studentsInClass, studentsNoInClass));
        } else {
          alert('no has seleccionado fecha');
        }
      } else {
        alert('No has seleccionado el salon');
      }
    } else {
      alert('No has seleccionado a ningun estudiante');
    }

  };
  return (
    <div style={{ width: '100%' }}>
      <DivContainerList>
        <DivRowList>
          {role === 'teacher' ? (
            <DivContainerInputCheckBox>
              <p>Asistencia</p>
            </DivContainerInputCheckBox>
          ) : (
            <DivContainerInputCheckBox>
              <p>Indice</p>
            </DivContainerInputCheckBox>
          )}
          <div>
            <p>Nombre Completo</p>
          </div>
          <ContainerGeekyPuntos>
            <p>GeekyPuntos</p>
          </ContainerGeekyPuntos>

          <p>Estado</p>
          <p>Voto</p>
          <p>Porcentaje de asistencia</p>
        </DivRowList>
        <form>
          {studentsCorte.length > 0 && studentsCorte.map((student, index) => {
            let porcentajeAsistencia;
            if (student.assistance.length > 0) {
              porcentajeAsistencia = Math.round((student.assistance.reduce((a, b) => a + b, 0) / student.assistance.length) * 100);
            } else {
              porcentajeAsistencia = 0;
            }
            return (
              <DivRowList key={student.uid} onClick={() => handleShowDataStudent(student)}>
                {role === 'teacher' ? (
                  <DivContainerInputCheckBox>
                    <input type='checkbox' name='assistance' onChange={(evento) => handleInputChangeCheckbox(evento, student.uid, student.assistance, student.geekyPuntos)} />
                  </DivContainerInputCheckBox>
                ) : (
                  <DivContainerInputCheckBox>
                    <p>{index}</p>
                  </DivContainerInputCheckBox>
                )}
                <DivFullName>
                  {student.photoURL ? <ImgStudent src={student.photoURL} alt={student.fullName} /> : <ImgStudent src='https://firebasestorage.googleapis.com/v0/b/geekplatform-dc705.appspot.com/o/default-profile.png?alt=media&token=0f8bf7f6-acc2-451c-be86-c7800e3ca059' alt={student.fullName} />}
                  <p>
                    {student.fullName}
                  </p>
                </DivFullName>
                <ContainerGeekyPuntos>
                  <p>{student.geekyPuntos}</p>
                </ContainerGeekyPuntos>
                {student.active ? (<ContainerPActivo><p>Activo</p></ContainerPActivo>) : <ContainerPInactivo><p>Inactivo</p></ContainerPInactivo>}
                {student.voted ? <p>Votó</p> : <p>No ha votado</p>}
                {porcentajeAsistencia && (
                  <ContainerPorcentajeAsistencia>
                    <PorcentajeAsistencia porcentajeAsistencia={porcentajeAsistencia}>
                      <p>
                        {porcentajeAsistencia}
                        %
                      </p>
                    </PorcentajeAsistencia>
                  </ContainerPorcentajeAsistencia>
                )}
              </DivRowList>
            );
          })}
          <label>
            Salon
            <select placeholder='' name='classroom' onChange={handleInputChange} required>
              <option value=''>seleccione Salon</option>
              <option value='designThinking'>Design thinking</option>
              <option value='tecnico'>Tecnico</option>
              <option value='sigloxxl'>Siglo XXl</option>
              <option value='empleabilidad'>Empleabilidad</option>
            </select>
          </label>
          <label>
            <input
              type='date'
              name='date'
              value={date}
              onChange={handleInputChange}
              required
            />
          </label>

          {role === 'teacher' && (
            <Button4 type='submit' onClick={handleEnviarLista} disabled={enviado}>{enviado ? 'Lista enviada' : 'Enviar asistencia'}</Button4>
          )}

        </form>

        {role === 'teacher' && (
          <Button4 primary animate={{}} onClick={OpenModalE}>Agregar estudiante</Button4>
        )}
        {/*
        {role === 'admin' && (
          <Button4 type='button' onClick={handleEnviarLista}>Enviar asistencia</Button4>
        )} */}
        {role === 'admin' && (
          <Button4 primary animate={{}} onClick={OpenModalE}>Agregar estudiante</Button4>
        )}
        <ModalEstudiantes corteId={corteId} showModalE={showModalE} setShowModalE={setShowModalE} />
      </DivContainerList>

    </div>
  );
};

export default ListarStudentsCorte;
