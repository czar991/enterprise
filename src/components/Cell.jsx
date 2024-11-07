import React, { memo, useState, useEffect } from 'react';
import './cell.css';
import employees from '../employee.json';
export const Cell = memo(({ cellData, cellId, openCells, toggleCell, level }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const isExpanded = openCells[level] === cellId;
  const subCellsClass = `sub-cells level-${level}`;

  const handleCellClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setIsModalActive(true), 10);
    }
  }, [isModalOpen]);

  return (
    <div className='cell-wrapper'>
      <div className='cell' onClick={handleCellClick}>
        {cellData.name || cellData}
        {cellData.subCells && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCell(cellId, level);
            }}
            className='toggle-button'
          >
            {isExpanded ? '-' : '+'}
          </button>
        )}
      </div>
      {isExpanded && cellData.subCells && (
        <div className={subCellsClass}>
          {cellData.subCells.map((subCell, i) => (
            <Cell
              key={`${cellId}-${i}`}
              cellData={typeof subCell === 'string' ? { name: subCell } : subCell}
              cellId={`${cellId}-${i}`}
              openCells={openCells}
              toggleCell={toggleCell}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className={`modal-overlay ${isModalActive ? 'active' : ''}`} onClick={closeModal}>
          <div className={`modal-content ${isModalActive ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={closeModal}>
              ✕
            </button>
            <h3>{cellData.name || cellData}</h3>
            <ul>
              {employees.map((employee, index) => (
                <li key={index}>
                  {employee.lastName} {employee.firstName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});
