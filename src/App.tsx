import { FunctionComponent, ReactElement } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login';
import Student from './Pages/Student/Student';
import Teacher from './Pages/Teacher/Teacher';
import Admin from './Pages/Admin/Admin';
import Exercise from './Pages/Student/ExercisePage/Exercise';

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


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/student' element={<PrivateComonent component={<Student />} role='SV' />}>
          <Route path ='exercise/:id' element = {<Exercise />}></Route>
        </Route>
        <Route path='/teacher' element={<PrivateComonent component={<Teacher />} role='GV' />}></Route>
        <Route path='/admin' element={<PrivateComonent component={<Admin />} role='AD' />}></Route>
        <Route path = '/notfound' element = {<h1>Not found</h1>}></Route>
        <Route path='*' element={<Navigate to='/login' replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
