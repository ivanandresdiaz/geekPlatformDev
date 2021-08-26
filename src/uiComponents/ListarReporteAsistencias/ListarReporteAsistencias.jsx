import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestoreReporteAsistencia } from '../../actions/classroomActions';
import { getReporteAsistencia } from '../../reducers/salonReducer';

const ListarReporteAsistencias = (props) => {
  const { corteId } = props;
  const dispatch = useDispatch();
  const reporteAsistencia = useSelector(getReporteAsistencia);
  useEffect(() => {
    if (!(reporteAsistencia.length > 0)) {
      dispatch(getFirestoreReporteAsistencia(corteId));
    }
  }, []);
  console.log('reporte Asistencia', reporteAsistencia);
  return (
    <div>
      <h1>Reporte de asistencias</h1>
      {reporteAsistencia.length > 0 && reporteAsistencia.map((item) => (
        <div key={item.id}>
          <p>
            salon :
            {item.classroom}
          </p>
          <p>
            Fecha :
            {item.date}
          </p>
          <div>
            <h4>Estudiantes que asistieron</h4>
            {item.studentsInClass.map((student) => <p key={student}>{student}</p>)}
          </div>
          <div>
            <h4>Estudiantes que No asistieron</h4>
            {item.studentsNoInClass.map((student) => <p key={student}>{student}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListarReporteAsistencias;
