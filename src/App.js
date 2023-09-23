import './App.css';
import Home from './components/Home';
import SingleProduct from './components/SingleProduct';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<SingleProduct />}></Route>
      </Routes>
    </div>
  );
}

export default App;
