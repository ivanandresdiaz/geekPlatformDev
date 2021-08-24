import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import CreateNewsSocialGeek from '../../components/CreateNewsSocialGeek/CreateNewsSocialGeek';
import NewsFeedCategories from '../../components/NewsFeedCategories/NewsFeedCategories';
import ListarNews from '../../uiComponents/ListarNews/ListarNews';
import { getFirestoreNewsCategory, getFirestoreNewsCategoryBlogs } from '../../actions/socialGeekActions';
import { getNewsCategory } from '../../reducers/socialGeekReducer';
import RankingGeekyPuntos from '../../uiComponents/RankingGeekyPuntos/RankingGeekyPuntos';
import ListarStudentsSocialGeek from '../../uiComponents/ListarStudentsSocialGeek/ListarStudentsSocialGeek';
import { getRole } from '../../reducers/authReducer';
import NavbarTeacher from '../../components/Structure/NavbarTeacher';
import NavbarAdmin from '../../components/Structure/NavbarAdmin';
import NavbarStudent from '../../components/Structure/NavbarStudent';
import Footer from '../../components/Structure/Footer';
import ListarCodelingoChallenges from '../../uiComponents/ListarCodelingoChallenges/ListarCodelingoChallenges';
import { Sidebar } from './SocialGeekStyles';
import ListarTeachersSocialGeek from '../../uiComponents/ListarTeachersSocialGeek/ListarTeachersSocialGeek';

const SocialGeek = (props) => {
  const role = useSelector(getRole);
  const { match: { params: { corteId } } } = props;
  const userDataLogged = useSelector((state) => state.auth);
  const news = useSelector(getNewsCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDataLogged) {
      dispatch(getFirestoreNewsCategoryBlogs(corteId));
    } else {
      toast.error('No estás autenticado');
    }
  }, []);
  const handleGetNews = useCallback(
    (category) => {
      if (category === 'blogs') {
        dispatch(getFirestoreNewsCategoryBlogs(corteId));
      } else {
        dispatch(getFirestoreNewsCategory(corteId, category));
      }

    }, [],
  );

  return (
    <>
      <div style={{ background: '#F2F2F2' }}>
        {role === 'teacher' && (
          <NavbarTeacher />
        )}
        {role === 'admin' && (
          <NavbarAdmin />
        )}
        {role === 'student' && (
          <NavbarStudent />
        )}
        <div style={{ display: 'flex', width: '100', background: '#F2F2F2' }}>
          <Sidebar>
            <RankingGeekyPuntos corteId={corteId} />
            <div>
              <ListarCodelingoChallenges />
            </div>
          </Sidebar>
          <div style={{ flex: '5', margin: '30px 120px' }}>
            <CreateNewsSocialGeek corteId={corteId} uid={userDataLogged.uid} />
            <NewsFeedCategories handleGetNews={handleGetNews} />
            <ListarNews news={news} corteId={corteId} uid={userDataLogged.uid} />
          </div>
          <div style={{ flex: '3.5' }}>
            <ListarStudentsSocialGeek corteId={corteId} />
            <ListarTeachersSocialGeek corteId={corteId} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SocialGeek;
