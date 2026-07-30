import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  return (
    <div className="App">
    <h1> Student Management System</h1>
    <StudentForm/>
    {/* <StudentList/> */}
    </div>
  );
}

export default App;