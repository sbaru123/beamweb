import './App.css';
import Login from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuildingDetails from './BuildingDetails';
import HomePage from './homePage';
import InfoPage from './infoPage';
import Utilization from './Utilization'; // New import
import Equipment from './Equipment'; // New import
import AnalysisPage from './AnalysisPage'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/buildingdetails' element={<BuildingDetails />} />
        <Route path='/users' element={<InfoPage />} />
        <Route path='/utilization' element={<Utilization />} />
        <Route path='/equipment' element={<Equipment />} /> 
        <Route path='/analysis' element={<AnalysisPage />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
