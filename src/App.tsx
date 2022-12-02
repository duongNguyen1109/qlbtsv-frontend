import { FunctionComponent, ReactElement } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login';
import Student from './Pages/Student/Student';
import Teacher from './Pages/Teacher/Teacher';
import Admin from './Pages/Admin/Admin';
import Exercise from './Pages/Student/ExercisePage/Exercise';
import Notfound from './Pages/Notfound';
import HomeStudent from './Pages/Student/HomePage/HomeStudent';
import ClassStudent from './Pages/Student/ClassPage/ClassStudent';
import Assigment from './Pages/Student/ClassPage/Assigment';

interface PrivateComonentProps {
  role: string,
  component: ReactElement
}

const PrivateComonent: FunctionComponent<PrivateComonentProps> = ({ role, component }) => {
  const groupID = localStorage.getItem('groupID') ?? '';
  if (!(groupID === role)) {
    return <Navigate to='/login' />
  } else {
    return component;
  }
}

const HomeNavigate: FunctionComponent<{}> = () => {
  const groupID = localStorage.getItem('groupID') ?? '';
  switch (groupID) {
    case 'SV': return <Navigate to = '/student' />;
    case 'GV': return <Navigate to = '/teacher' />;
    case 'AD': return <Navigate to = '/admin' />;
    default: return <Navigate to = "/login" /> 
  }
}




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<HomeNavigate />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/student' element={<PrivateComonent component={<Student />} role='SV' />}>
          <Route path='' element = {<HomeStudent />}></Route>
          <Route path ='exercise/:id' element = {<Exercise />}></Route>
          <Route path = 'class/:id' element = {<ClassStudent />}>
            <Route path='assigment' element = {<Assigment />}></Route>
            <Route path='member' element = {<h1>Mem</h1>}></Route>
            <Route path='group' element = {<h1>Group</h1>}></Route>
          </Route>
        </Route>
        <Route path='/teacher' element={<PrivateComonent component={<Teacher />} role='GV' />}></Route>
        <Route path='/admin' element={<PrivateComonent component={<Admin />} role='AD' />}></Route>
        <Route path = '/notfound' element = {<Notfound />}></Route>
        {/* <Route path='*' element={<Navigate to='/notfound' replace />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
