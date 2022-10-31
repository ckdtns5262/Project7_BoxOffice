import BoxOffice from './boxOffice/BoxOffice';
import BoxMovie from './boxOffice/BoxMovie';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<BoxOffice />}/>
      <Route path='mv' element={<BoxMovie/>}/>
    </Routes>
    </>
  );
}

export default App;
