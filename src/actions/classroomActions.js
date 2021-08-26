/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';
import {
  firebase,
  googleAuthProvider,
  db,
  functions,
} from '../firebase/firebaseConfig';

export const getFirestoreSalon = (corteId, salonId) => (dispatch, getState) => {
  db.collection(`cortes/${corteId}/classrooms`)
    .doc(salonId)
    .get()
    .then((doc) => {
      dispatch({ type: 'getFirestoreSalon', payload: doc.data() });
    })
    .catch((err) => console.log(err));
};

export const createNewSprint = ({ title, description, start, end, deliveryLink, supportLink1, supportLink2, supportLink3, supportLink4, html, css, javascript, webpack, reactJs, reactHooks, redux, firebase, testing, image, resourcePDF }, corteId, salonId) => async (dispatch, getState) => {
  try {
    const createSprint = functions.httpsCallable('createSprint');
    const data = { corteId,
      salonId,
      title,
      resourcePDF,
      description,
      start,
      end,
      deliveryLink,
      supportLink1,
      supportLink2,
      supportLink3,
      supportLink4,
      html,
      css,
      javascript,
      webpack,
      reactJs,
      reactHooks,
      redux,
      firebase,
      testing,
      image };
    await createSprint(data);
    toast.success('sprint agregado');
    dispatch({ type: 'newSprintCreated', payload: { ...data, id: ` ${title} ` } });// no eliminar espacio, es importante para la logica

  } catch (error) {
    toast.error('Sucedió un error');
    console.log(error);
  }
};;

export const assignedFirestoreSprint = ({ resourcePDF, corteId, salonId, title, description, start, end, deliveryLink, supportLink1, supportLink2, supportLink3, supportLink4, html, css, javascript, webpack, reactJs, reactHooks, redux, firebase, testing, image }) => async (dispatch, getState) => {
  try {
    if (Date.parse(start) > Date.parse(end)) {
      toast.error(
        'La fecha de entrega no puede ser menor a la fechan inicial',
      );
    } else {
      const createSprint = functions.httpsCallable('createSprint');
      const data = {
        corteId,
        salonId,
        title,
        resourcePDF,
        description,
        start,
        end,
        deliveryLink,
        supportLink1,
        supportLink2,
        supportLink3,
        supportLink4,
        html,
        css,
        webpack,
        javascript,
        reactJs,
        reactHooks,
        redux,
        firebase,
        testing,
        image,
      };
      await createSprint(data);
      toast.success('sprint agregado');
      dispatch({ type: 'newSprintCreated', payload: { ...data, calificados: [], id: title } });
    }
  } catch (error) {
    toast.error('Algo sucedió');
    console.log(error);
  }
};
export const getFirestoreSprints = (corteId, salonId) => async (dispatch, getState) => {
  db.collection(`/cortes/${corteId}/sprints`)
    .where('salonId', '==', salonId)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const dataDocument = doc.data();
        return { ...dataDocument, id: doc.id };
      });
      dispatch({ type: 'getFirestoreSprints', payload: data });
    })
    .catch((err) => console.log(err));
};

export const deleteSprint = (id, corteId) => async (dispatch) => {
  try {
    await db.collection(`/cortes/${corteId}/sprints`).doc(id).delete();
    toast.error('Sprint eliminado');
    dispatch({ type: 'deleteSprint', payload: id });
  } catch (error) {
    toast.error('Sucedió un error');
    console.log(error);
  }
};
export const sendMySprint = (sprintId, linkGithub, linkDespliegue) => async (dispatch, getState) => {
  const { uid, sprintsEnviados } = getState().auth;
  const mySprintToSend = {
    sprintId,
    linkGithub,
    linkDespliegue,
  };
  const nuevosSprintsEnviados = [...sprintsEnviados, mySprintToSend];
  db.collection('students').doc(uid).set({
    sprintsEnviados: nuevosSprintsEnviados,
  }, { merge: true })
    .then(() => {
      toast.success('Se ha enviado tu sprint con exito.');
      dispatch({ type: 'sendMySprint', payload: { ...mySprintToSend, id: nuevosSprintsEnviados } });
    })
    .catch((error) => {
      console.log(error.message);
      // toast.error('No se puedo agregar, intente de nuevo.');
    });
};

export const getFirestoreAllSprints = (corteId) => async (dispatch, getState) => {
  db.collection('cortes')
    .doc(corteId)
    .collection('sprints')
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const dataDocument = doc.data();
        return { ...dataDocument, id: doc.id };
      });
      dispatch({ type: 'getFirestoreAllSprints', payload: data });
    })
    .catch((err) => console.log(err));
};

// Crear grupos

export const createWorkGroups = (corteId, salonId, title, newGroup) => async (dispatch, getState) => {
  try {
    const initialData = {
      ...newGroup,
      title,
      salonId,
    };
    await db.collection('cortes').doc(corteId).collection('groups').add(initialData);

    const plantillaCreatingGroups = {
      title: 'Default plantilla grupos',
      id: 'defaultPlantillaGrupos',
      tasks: {
        task111: { id: 'task111', content: 'Estudiante 1' },
        task2: { id: 'task2', content: 'Estudiante 2' },
        task3: { id: 'task3', content: 'Estudiante 3' },
        task4: { id: 'task4', content: 'Estudiante 4' },
      },
      columns: {
        column1: {
          id: 'column1',
          title: 'Estudiantes',
          taskIds: ['task111', 'task2', 'task3', 'task4'],
        },
        column2: {
          id: 'column2',
          title: 'Grupo 1',
          taskIds: [],
        },
        column3: {
          id: 'column3',
          title: 'Grupo 2',
          taskIds: [],
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ['column1', 'column2', 'column3'],
    };
    dispatch({ type: 'generateTemplateGroups', payload: plantillaCreatingGroups });
    toast.success('Se ha creado los nuevos grupos');
  } catch (error) {
    alert('ha habido un error');
    console.log(error);
  }
};

export const generateTemplateGroups = (title, cantidad) => async (dispatch, getState) => {
  try {
    const students = getState().students.studentsCorte;
    const studentsDataTransform = students.map((student) => ({
      id: student.uid,
      content: student.fullName,
    }));
    let tasks = {};
    let taskIds = [];
    studentsDataTransform.forEach((element) => {
      tasks = {
        ...tasks,
        [element.id]: element,
      };
      taskIds = [...taskIds, element.id];
    });
    const groupsNumber = parseInt(cantidad) + 1;
    let columns = {
      column0: {
        id: 'column0',
        title: 'Estudiantes',
        taskIds,
      },
    };
    let columnOrder = ['column0'];
    for (let index = 1; index < groupsNumber; index++) {
      columns = {
        ...columns,
        [`column${index}`]: {
          id: `column${index}`,
          title: `Grupo ${index}`,
          taskIds: [],
        },
      };
      columnOrder = [...columnOrder, `column${index}`];

    }

    const initialData = {
      id: 'readyToSend',
      title,
      tasks,
      columns,
      columnOrder,
    };
    dispatch({ type: 'generateTemplateGroups', payload: initialData });
  } catch (error) {
    toast.error('Sucedió un error');
    console.log(error);
  }
};

export const getFirestoreWorkGroups = (corteId, salonId) => async (dispatch, getState) => {
  db.collection(`/cortes/${corteId}/groups`)
    .where('salonId', '==', salonId)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const dataDocument = doc.data();
        return { ...dataDocument, id: doc.id };
      });
      dispatch({ type: 'getFirestoreWorkGroups', payload: data });
    })
    .catch((err) => console.log(err));
};

export const deleteFirestoreGroups = (corteId, salonId, id) => async (dispatch) => {
  console.log(corteId, salonId, id);
  await db.collection(`/cortes/${corteId}/groups`).doc(id).delete();
  toast.error('Se ha eliminado el grupo');
  dispatch({ type: 'deleteFirestoreGroups', payload: id });
};
export const enviarFirestoreLista = (corteId, listaEnviar, classroom, date, studentsInClass, studentsNoInClass) => (dispatch, getState) => {
  const batch = db.batch();
  listaEnviar.forEach((student) => {
    batch.update(db.collection('students').doc(student.uid), { assistance: student.assistance, geekyPuntos: student.geekyPuntos });
  });
  batch
    .commit()
    .then(() => {
      const initialData = {
        corteId,
        date,
        classroom,
        studentsInClass,
        studentsNoInClass,
      };
      db.collection('cortes').doc(corteId).collection('listas').add(initialData)
        .then(() => {
          toast.success('Se ha tomado lista');
          // dispatch({ type: 'enviarFirestoreLista' });
        });

    })
    .catch((error) => console.error(error));
};
export const getFirestoreReporteAsistencia = (corteId) => async (dispatch, getState) => {
  db.collection('cortes')
    .doc(corteId)
    .collection('listas')
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const dataDocument = doc.data();
        return { ...dataDocument, id: doc.id };
      });
      dispatch({ type: 'getFirestoreReporteAsistencia', payload: data });
    })
    .catch((err) => console.log(err));
};

export const calificarSprintStudent = (sprintId, uid, values, calificacion, corteId, salonId, title) => async (dispatch, getState) => {
  try {
    const { studentsCorte } = getState().students;
    const studentArrayFiltered = studentsCorte.filter((student) => student.uid === uid);
    const student = studentArrayFiltered[0];
    await db.collection('students').doc(student.uid).set({ mySprints: { ...student.mySprints, [sprintId]: { sprintId, calificacion, title } } }, { merge: true });
    //agregar a calificados de sprint el uid
    const { allSprints } = getState().salon;
    const sprintArray = allSprints.filter((item) => item.id === sprintId);
    const sprint = sprintArray[0];
    let nuevosCalificados;
    if (sprint.calificados.includes(uid)) {
      nuevosCalificados = [...sprint.calificados];
    } else {
      nuevosCalificados = [...sprint.calificados, uid];
    }
    await db.collection('cortes').doc(corteId).collection('sprints').doc(sprintId)
      .update({ calificados: nuevosCalificados });

    // dispatch({ type: 'nuevaCalificacion', payload: { nuevosCalificados, sprintId } });
    // ya esta agregado al atributos del sprint :{calificados :[ uid ...uid..]}
    const batch = db.batch();
    const valuesArray = Object.entries(values);
    valuesArray.forEach((item) => {
      const notaNumber = parseInt(item[1]);
      const studentArray = Object.entries(student);
      const findAtributoArray = studentArray.filter((atributo) => atributo[0] === item[0]);
      const findAtributo = findAtributoArray[0];
      batch.update(db.collection('students').doc(uid), { [item[0]]: [...findAtributo[1], notaNumber] });
    });
    await batch.commit();
    const sumaGeekyPuntos = Math.round(calificacion / 10);
    await db.collection('students').doc(uid).update({ geekyPuntos: student.geekyPuntos + sumaGeekyPuntos });
    toast.success(`calificado ${student.fullName}`);
    //por el momento tuve que ahorrarme mucha logica de redux volviendo a llamar todos los sprints para que se renderize el view con el llamado a la api
    dispatch(getFirestoreAllSprints(student.corteId));
  } catch (error) {
    toast.error('algo salio mal');
    console.log(error);
    console.log(error.message);
  }

};
