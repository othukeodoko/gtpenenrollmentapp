
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import './App.css';
//import './App.css';
import Home from './Pages/Home';
import RegistrationIndex from './Pages/RegistrationIndex';
import MultiStepForm2 from './Pages/MultiStepForm2';
import RegistrationForm from './Pages/RegistrationForm';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegistrationIndex />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/form" element={<MultiStepForm2 />} />
                <Route path="/registration" element={<RegistrationForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;