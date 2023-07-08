import { FC, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import './bingo-board.scss';
export const BingoBoard: FC = () => {
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getNumber = () => {
    //debugger;
    let picked = false;
    let updatedUsedN = new Set(usedNumbers.values());
    do {
      let number = Math.floor(Math.random() * 90) + 1;
      if (!usedNumbers.has(number)) {
        updatedUsedN.add(number);
        picked = true;
      }
    } while (!picked);

    setUsedNumbers(updatedUsedN);
  };

  useEffect(() => {
    if (usedNumbers.size === 90) {
      setGameOver(true);
    }
  }, [usedNumbers]);

  const generateBoard = () => {
    console.log('generating board');
    const board = [];
    for (let i = 0; i < 90; i++) {
      const className = usedNumbers.has(i + 1)
        ? 'number-cell used'
        : 'number-cell';
      board.push(
        <div className={className} key={i}>
          {i + 1}
        </div>
      );
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
            return (
              <div className="sequence-item last" key={index}>
                {n}
              </div>
            );
          }
          return (
            <div className="sequence-item" key={index}>
              {n}
            </div>
          );
        })}
      </div>
    );
  };

  const handleReset = () => {
    setGameOver(false);
    setUsedNumbers(new Set<number>());
  };

  useEffect(() => {
    if (gameOver) {
      setOpenModal(true);
    }
  }, [gameOver]);
  console.log(usedNumbers);
  return (
    <div className="main-content">
      <h2>Bingo Game</h2>
      {getSequence()}
      <div className="bingo-number-container">{generateBoard()}</div>
      <div className="action-buttons">
        <button className="action-button" onClick={getNumber}>
          pick number!
        </button>
        <button className="action-button" onClick={handleReset}>
          Reset!
        </button>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        onAfterClose={() => handleReset()}
        className="modal"
      >
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
      </Modal>
    </div>
  );
};
