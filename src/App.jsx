import './App.css';
import { Cell } from './components/cell';
import Position from './position.json';
import { useCallback, useState } from 'react';

function App() {
  const [openCells, setOpenCells] = useState({});

  const toggleCell = useCallback((cellId, level) => {
    setOpenCells((prevOpenCells) => {
      return {
        ...prevOpenCells,
        [level]: prevOpenCells[level] === cellId ? null : cellId,
      };
    });
  }, []);

  return (
    <>
      <div className='table-main'>
        {Position.main.map((pos, i) => (
          <Cell key={`main-${i}`} cellData={pos} cellId={`main-${i}`} openCells={openCells} toggleCell={toggleCell} level={0} />
        ))}
      </div>
      <div className='table-sub'>
        {Position.sub.map((pos, i) => (
          <Cell key={`sub-${i}`} cellData={pos} cellId={`sub-${i}`} openCells={openCells} toggleCell={toggleCell} level={0} />
        ))}
      </div>
    </>
  );
}

export default App;
