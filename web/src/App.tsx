import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import './App.css';
import NewProfile from './pages/new_profile/NewProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="newProfile" element={<NewProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
