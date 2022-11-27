import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import './App.css';
import NewProfile from './pages/new_profile';
import Profiles from './pages/profiles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profiles/new" element={<NewProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
