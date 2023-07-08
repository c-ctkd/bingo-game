import { FC, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';

export const BingoBoard: FC = () => {
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getNumber = () => {
    var picked = false;
    var updatedUsedN = usedNumbers;
    do {
      var number = Math.floor(Math.random() * 90) + 1;
      if (!usedNumbers.has(number)) {
        updatedUsedN.add(number);
        picked = true;
      }
      setUsedNumbers(updatedUsedN);
    } while (!picked);
  };

  useEffect(() => {
    if (usedNumbers.size === 90) {
      setGameOver(true);
    }
  }, [usedNumbers]);

  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < 90; i++) {
      const className = usedNumbers.has(i + 1)
        ? 'number-cell used'
        : 'number-cell';
      board.push(<div className={className}>{i + 1}</div>);
    }
    return board;
  };

  const getSequence = () => {
    const last8N = Array.from(usedNumbers.values()).slice(-7);

    if (last8N.length < 7) {
      do {
        last8N.push(0);
      } while (last8N.length < 7);
    }

    return (
      <div className="sequence-container">
        {last8N.map((n, index) => {
          if (index === 6) {
            return <div className="sequence-item last">{n}</div>;
          }
          return <div className="sequence-item">{n}</div>;
        })}
      </div>
    );
  };

  const handleReset = () => {
    setGameOver(false);
    setUsedNumbers(new Set<number>());
  };

  if (gameOver) {
    return <div>Game Over</div>;
  }

  return (
    <div className="main-content">
      <h2>Bingo Game</h2>
      {getSequence()}
      <div className="bingo-number-container">{generateBoard()}</div>
      <div className="action-buttons">
        <button className="action-button" onClick={handleReset}>
          pick number!
        </button>
        <button className="action-button" onClick={handleReset}>
          Reset!
        </button>
      </div>
      <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)}>
        <div className="modal-content">
          <h2>Game Over!</h2>
          <button
            className="action-button"
            onClick={() => {
              setOpenModal(false);
              handleReset();
            }}
          >
            Play Again!
          </button>
        </div>
      </Modal>
    </div>
  );
};
