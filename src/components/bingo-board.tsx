import { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import './bingo-board.scss';
export const BingoBoard: FC = () => {
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [current, setCurrent] = useState<number | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getNumber = () => {
    //debugger;
    let picked = false;
    let updatedUsedN = new Set(usedNumbers.values());
    let curr = 0;
    do {
      let number = Math.floor(Math.random() * 75) + 1;
      if (!usedNumbers.has(number)) {
        curr = number;
        updatedUsedN.add(number);
        picked = true;
      }
    } while (!picked);
    setCurrent(curr);
    setUsedNumbers(updatedUsedN);
  };

  useEffect(() => {
    if (usedNumbers.size === 75) {
      setGameOver(true);
    }
  }, [usedNumbers]);

  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < 75; i++) {
      const className = usedNumbers.has(i + 1)
        ? 'number-cell used'
        : 'number-cell';
      board.push(
        <div className={className} key={i}>
          <p>{i + 1}</p>
        </div>
      );
    }
    return board;
  };

  const handleReset = () => {
    setGameOver(false);
    setUsedNumbers(new Set<number>());
    setCurrent(undefined);
  };

  useEffect(() => {
    if (gameOver) {
      setOpenModal(true);
    }
  }, [gameOver]);
  console.log(current);
  return (
    <div className="main-content">
      {/*getSequence()*/}
      <div className="score-container">
        <div className="bingo-number-container">{generateBoard()}</div>
        <div className="display-current">{current || '-'}</div>
        <div className="action-buttons">
          <button className="action-button" onClick={getNumber}>
            pick number!
          </button>
          <button className="action-button" onClick={handleReset}>
            reset!
          </button>
        </div>
      </div>
      <div className="second-half">
        <div className="separator"></div>
        <div className="logo-container"></div>
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
