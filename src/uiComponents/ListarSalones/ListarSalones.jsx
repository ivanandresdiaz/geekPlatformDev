import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { getFirestoreSalones } from '../../actions/adminActions';
import { getSalones } from '../../reducers/adminReducer';
import { ClassroomContent, ContainerClassrooms, ContainerIconsCorte, ContentTitle } from '../../containers/Corte/CorteStyles';

const ListarSalones = (props) => {
  const { corteId } = props;
  const dispatch = useDispatch();
  const salones = useSelector(getSalones);
  useEffect(() => {
    dispatch(getFirestoreSalones(corteId));
  }, []);

  // const color={
  //   background: ;
  // }

  return (
    <>
      <>
        {salones.length > 0 && salones.map((salon) => (
          // Aqui tiene que llegar el color!!!!!!!!!!!!!!!!!!!!!!!
          <ContainerClassrooms key={salon.salonId}>
            <motion.div whileHover={{ scale: 1.070 }}>
              <Link to={`/corte/${corteId}/${salon.salonId}`}>
                <ClassroomContent key={salon.salonId}>
                  <ContainerIconsCorte>
                    <img src={salon.salonImg} alt={salon.salonName} />
                  </ContainerIconsCorte>
                  <ContentTitle>
                    <h2>{salon.salonName}</h2>
                  </ContentTitle>
                </ClassroomContent>
              </Link>
            </motion.div>
          </ContainerClassrooms>
        ))}
      </>
    </>
  );
};

export default ListarSalones;
