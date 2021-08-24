/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/authActions';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Home from '../containers/Home/Home';
import Corte from '../containers/Corte/Corte';
import GlobalStyle from '../globalStyles';
import '../images/other/landing-5.png';
import Salon from '../containers/Salon/Salon';
import CreateGroups from '../containers/CreateGroups/CreateGroups';
import BancoRecursos from '../containers/BancoRecursos/BancoRecursos';
import SocialGeek from '../containers/SocialGeek/SocialGeek';
import EditProfileSocialGeek from '../components/EditProfileSocialGeek/EditProfileSocialGeek';
import ProfileGeek from '../containers/ProfileGeek/ProfileGeek';
import ScoreSprints from '../containers/ScoreSprints/ScoreSprints';
import AcercaDeProgramadores from '../containers/AcercaDeProgramadores/AcercaDeProgramadores';
import CodelingoTeacher from '../containers/CodelingoTeacher/CodelingoTeacher';
import CreateBlog from '../containers/CreateBlog/CreateBlog';
import BlogRead from '../containers/BlogRead/BlogRead';
import DeliverSprint from '../containers/DeliverSprint/DeliverSprint';
import TakeListStudents from '../containers/TakeListStudents/TakeListStudents';

const App = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {

          if (idTokenResult.claims.admin) {
            dispatch(login(user.uid, user.displayName, 'admin'));
          } else if (idTokenResult.claims.teacher) {
            dispatch(login(user.uid, user.displayName, 'teacher'));
          } else if (idTokenResult.claims.student) {
            dispatch(login(user.uid, user.displayName, 'student'));
          }
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

      }
    });
  }, [setIsLoggedIn, dispatch]);

  return (

    <HashRouter>
      <Toaster
        style={{ textAlign: 'center' }}
        position='top-center'
        reverseOrder={false}
      />
      <GlobalStyle />
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/'
            component={Home}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/corte/:corteId'
            component={Corte}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/corte/:corteId/:salon'
            component={Salon}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/takeListStudents/:corteId'
            component={TakeListStudents}
            isAuthenticated={isLoggedIn}
          />

          <PrivateRoute
            exact
            path='/corte/:corteId/:salon/createGroups'
            component={CreateGroups}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/bancoRecursosAcademicos'
            component={BancoRecursos}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/socialGeek/:corteId'
            component={SocialGeek}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/socialGeek/:corteId/:profileUid'
            component={ProfileGeek}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/socialGeek/:corteId/:profileUid/edit'
            component={EditProfileSocialGeek}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/scoreSprints/:corteId/:sprintId'
            component={ScoreSprints}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/deliverSprint/:corteId/:sprintId'
            component={DeliverSprint}
            isAuthenticated={isLoggedIn}
          />
          <PublicRoute
            exact
            path='/acercaDeProgramadores'
            component={AcercaDeProgramadores}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/codelingoTeacher'
            component={CodelingoTeacher}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/createBlog/:corteId/:profileUid'
            component={CreateBlog}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/blog/:corteId/:uid/:idBlog'
            component={BlogRead}
            isAuthenticated={isLoggedIn}
          />

          <Redirect to='/auth/landingPage' />
        </Switch>
      </div>
    </HashRouter>
  );
};
export default App;

