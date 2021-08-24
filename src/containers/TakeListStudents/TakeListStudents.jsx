import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartStudent from '../../components/ChartStudent/ChartStudent';
import ListarStudentsCorte from '../../uiComponents/ListarStudentsCorte/ListarStudentsCorte';
import { getStudentsCorte } from '../../reducers/studentsReducer';

const TakeListStudents = (props) => {
  const { match: { params: { corteId } } } = props;
  const studentsCorte = useSelector(getStudentsCorte);
  const [profileSocialGeek, setProfileSocialGeek] = useState({
    fullName: '',
    html: [0],
    css: [0],
    javascript: [0],
    webpack: [0],
    reactJs: [0],
    reactHooks: [0],
    redux: [0],
    firebase: [0],
    testing: [0],
    sigloXXI: [0],
    designThinking: [0],
  });
  useEffect(() => {
    if (studentsCorte.length > 0) {
      studentsCorte.forEach((item) => {
        setProfileSocialGeek({
          fullName: 'Promedio Salon',
          html: [...profileSocialGeek.html, item.html],
          css: [...profileSocialGeek.css, item.css],
          javascript: [...profileSocialGeek.javascript, item.javascript],
          webpack: [...profileSocialGeek.webpack, item.webpack],
          reactJs: [...profileSocialGeek.reactJs, item.reactJs],
          reactHooks: [...profileSocialGeek.reactHooks, item.reactHooks],
          redux: [...profileSocialGeek.redux, item.redux],
          firebase: [...profileSocialGeek.firebase, item.firebase],
          testing: [...profileSocialGeek.testing, item.testing],
          sigloXXI: [...profileSocialGeek.sigloXXI, item.sigloXXI],
          designThinking: [...profileSocialGeek.designThinking, item.designThinking],
        });
      });
    }
  }, []);

  const handleShowDataStudent = (student) => {
    setProfileSocialGeek(student);
  };
  return (
    <div>
      Tomar lista de estudiantes
      <ListarStudentsCorte corteId={corteId} handleShowDataStudent={handleShowDataStudent} />
      <ChartStudent profileSocialGeek={profileSocialGeek} />
    </div>
  );
};

export default TakeListStudents;
