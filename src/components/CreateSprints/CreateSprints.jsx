/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { firebase as firebaseBackend } from '../../firebase/firebaseConfig';
import useForm from '../../hooks/useForm';
import { createNewSprint } from '../../actions/classroomActions';
import { FormInput, FormModalSalon, FormTextArea } from '../../uiComponents/Modal/ModalStyles';
import { Button4 } from '../../globalStyles';

const CreateSprints = (props) => {
  const { corteId, salonId } = props;
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const htmlInput = useRef(null);
  const cssInput = useRef(null);
  const webpackInput = useRef(null);
  const reactJsInput = useRef(null);
  const javascriptInput = useRef(null);
  const reactHooksInput = useRef(null);
  const reduxInput = useRef(null);
  const firebaseInput = useRef(null);
  const testingInput = useRef(null);
  const [formValues, handleInputChange, reset] = useForm({
    title: '',
    description: '',
    salonId: '',
    start: '',
    end: '',
    deliveryLink: '',
    html: false,
    css: false,
    javascript: false,
    webpack: false,
    reactJs: false,
    reactHooks: false,
    redux: false,
    firebase: false,
    testing: false,
    supportLink1: '',
    supportLink2: '',
    supportLink3: '',
    supportLink4: '',
    image: '',
    resourcePDF: '',
  });
  const {
    title,
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
    reactJs,
    reactHooks,
    redux,
    firebase,
    testing,
    image,
    resourcePDF, javascript } = formValues;
  const handleUploadImgSprint = (event) => {
    const file = event.target.files[0];
    const refStorage = firebaseBackend.storage().ref(`socialGeek/personalProjects/${file.name}`);
    const task = refStorage.put(file);
    task.on(
      'state_changed',
      (snapshot) => {
        const porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        toast.error(`Error subiendo archivo = > ${err.message}`);
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            const evento = {
              target: {
                value: url,
                name: 'image',
              },
            };
            handleInputChange(evento);
            setDisabled(false);
            // sessionStorage.setItem('imgNewPost', url);
          })
          .catch((err) => {
            toast.error(`Error obteniendo downloadURL = > ${err}`);
          });
      },
    );
  };
  const handleUploadSprintPDF = (event) => {
    const file = event.target.files[0];
    const refStorage = firebaseBackend.storage().ref(`socialGeek/personalProjects/${file.name}`);
    const task = refStorage.put(file);
    task.on(
      'state_changed',
      (snapshot) => {
        const porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        toast.error(`Error subiendo archivo = > ${err.message}`);
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            const evento = {
              target: {
                value: url,
                name: 'resourcePDF',
              },
            };
            handleInputChange(evento);
            setDisabled(false);
            // sessionStorage.setItem('imgNewPost', url);
          })
          .catch((err) => {
            toast.error(`Error obteniendo downloadURL = > ${err}`);
          });
      },
    );
  };
  const handleSubmit = (evento) => {
    evento.preventDefault();
    console.log(formValues);
    if (Date.parse(start) > Date.parse(end)) {
      alert('la fecha de entrega no puede ser menor a la fechan inicial');
    } else {
      if (image.length > 0) {
        if (resourcePDF.length > 0) {
          dispatch(createNewSprint(formValues, corteId, salonId));
          reset();
          htmlInput.current.checked = false;
          cssInput.current.checked = false;
          javascriptInput.current.checked = false;
          webpackInput.current.checked = false;
          reactJsInput.current.checked = false;
          reactHooksInput.current.checked = false;
          reduxInput.current.checked = false;
          firebaseInput.current.checked = false;
          testingInput.current.checked = false;
        } else {
          alert('el PDF aun no ha sido cargado');
        }
      } else {
        alert('la imagen aun no ha sido cargado');
      }
    }

  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Crear Nuevo Sprint</h1>
        <FormModalSalon onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
            <FormInput
              type='text'
              placeholder='Título del Sprint'
              name='title'
              value={title}
              onChange={handleInputChange}
              required
            />
            <FormTextArea style={{ width: '400px', height: '120px' }} name='description' cols='30' rows='10' value={description} placeholder='Descripción del Sprint' onChange={handleInputChange} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: 'auto', alignContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: '#FF3B53', marginBottom: '1px', fontWeight: '600' }}>Empieza el</p>
              <FormInput
                style={{ marginLeft: '8px', width: 'auto' }}
                type='date'
                name='start'
                value={start}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: '#FF3B53', marginBottom: '1px', fontWeight: '600' }}>Termina el</p>
              <FormInput
                style={{ marginLeft: '8px', width: 'auto' }}
                type='date'
                name='end'
                value={end}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: '#FF3B53', marginBottom: '1px', fontWeight: '600' }}>Formulario</p>
              <FormInput
                style={{ marginLeft: '8px', width: 'auto' }}
                type='text'
                placeholder='Link de entrega'
                name='deliveryLink'
                value={deliveryLink}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: 'auto', marginBottom: '20px', alignContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0px, 25px', alignItems: 'start' }}>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={htmlInput}
                  type='checkbox'
                  name='html'
                  value={html}
                  onChange={handleInputChange}
                />
                HTML
              </label>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={cssInput}
                  type='checkbox'
                  name='css'
                  value={css}
                  onChange={handleInputChange}
                />
                Css
              </label>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={javascriptInput}
                  type='checkbox'
                  name='javascript'
                  value={javascript}
                  onChange={handleInputChange}
                />
                Css
              </label>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={webpackInput}
                  type='checkbox'
                  name='webpack'
                  value={webpack}
                  onChange={handleInputChange}
                />
                Webpack
              </label>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={reactJsInput}
                  type='checkbox'
                  name='reactJs'
                  value={reactJs}
                  onChange={handleInputChange}
                />
                React Js
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 25px', alignItems: 'start' }}>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={reactHooksInput}
                  type='checkbox'
                  name='reactHooks'
                  value={reactHooks}
                  onChange={handleInputChange}
                />
                React Hooks
              </label>

              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={reduxInput}
                  type='checkbox'
                  name='redux'
                  value={redux}
                  onChange={handleInputChange}
                />
                Redux
              </label>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={firebaseInput}
                  type='checkbox'
                  name='firebase'
                  value={firebase}
                  onChange={handleInputChange}
                />
                Firebase
              </label>
              <label>
                <input
                  style={{ marginRight: '10px' }}
                  ref={testingInput}
                  type='checkbox'
                  name='testing'
                  value={testing}
                  onChange={handleInputChange}
                />
                Testing
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: 'auto', alignContent: 'center' }}>
            <FormInput
              style={{ width: '150px', marginRight: '10px', marginTop: '0px' }}
              type='text'
              placeholder='Link de apoyo 1'
              name='supportLink1'
              value={supportLink1}
              onChange={handleInputChange}
            />
            <FormInput
              style={{ width: '150px', marginRight: '10px', marginTop: '0px' }}
              type='text'
              placeholder='Link de apoyo 2'
              name='supportLink2'
              value={supportLink2}
              onChange={handleInputChange}
            />
            <FormInput
              style={{ width: '150px', marginRight: '10px', marginTop: '0px' }}
              type='text'
              placeholder='Link de apoyo 3'
              name='supportLink3'
              value={supportLink3}
              onChange={handleInputChange}
            />
            <FormInput
              style={{ width: '150px', marginRight: '10px', marginTop: '0px' }}
              type='text'
              placeholder='Link de apoyo 4'
              name='supportLink4'
              value={supportLink4}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '745px', alignContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
              <p style={{ color: '#FF3B53', marginBottom: '1px', fontWeight: '600' }}>Subir PDF</p>
              <input type='file' name='archivosubido' onChange={handleUploadSprintPDF} required />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: '#FF3B53', marginBottom: '1px', fontWeight: '600' }}>Subir imagen</p>
                <input type='file' name='imgSprint' onChange={handleUploadImgSprint} required />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', margin: 'auto' }}>
            <Button4 type='submit'>Añadir Nuevo Sprint</Button4>
          </div>

        </FormModalSalon>

      </div>
    </div>
  );
};

export default CreateSprints;
