import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import axios from 'axios';

const CELL_SIZE = 20;

function GameOfLife() {
  const [board, setBoard] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Get the initial game board from the server
    axios.get('/gameoflife/gameBoard')
      .then(response => {
        setBoard(response.data);
        setRows(response.data.length);
        setCols(response.data[0].length);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        // Step to the next generation
        axios.put('/gameoflife/nextGen')
          .then(() => {
            axios.get('/gameoflife/isGameOver')
              .then(response => {
                if (response.data)
                  setIsPlaying(false);
                axios.get('/gameoflife/gameBoard')
                  .then(response => {
                    setBoard(response.data);
                  }).catch(error => console.log(error));
              }).catch(error => console.log(error));
          }).catch(error => console.log(error));
      }, speed);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const reduceSpeed = () => {
    if (speed > 50) {
      setSpeed(speed - 50);
    }
  }

  const increaseSpeed = () => {
    setSpeed(speed + 50);
  }

  const getBoard = () => {
    axios.get('/gameoflife/gameBoard')
      .then(response => {
        setBoard(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }

  const handleUpdateGameBoard = () => {
    // Create a new game on the server
    axios.put('/gameoflife/editGameBoardSize', {
      rows: rows,
      cols: cols
    })
      .then(() => {
        // Get the updated game board from the server
        getBoard();
      })
      .catch(error => console.log(error));
  };

  const handleRandomGame = () => {
    // Create a new game on the server
    axios.put('/gameoflife/randomGame')
      .then(() => {
        // Get the updated game board from the server
        axios.get('/gameoflife/gameBoard')
          .then(response => {
            setBoard(response.data);
            console.log(response.data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const handleCellClick = (row, col) => {

    // Update the cell state on the server
    axios.put('/gameoflife/toggleCell', {
      row: row,
      col: col,
    })
      .then(() => {
        // Set the state of the clicked cell
        const updatedBoard = [...board];
        updatedBoard[row][col] = !updatedBoard[row][col];
        setBoard(updatedBoard);
      })
      .catch(error => console.log(error));
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleResetClick = () => {
    // Reset the game on the server
    axios.put('/gameoflife/resetGame')
      .then(() => {
        // Get the updated game board from the server
        axios.get('/gameoflife/gameBoard')
          .then(response => {
            setBoard(response.data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const renderGameBoard = () => {
    return (
      <div
        style={{
          width: board.length * CELL_SIZE,
          height: board[0].length * CELL_SIZE,
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: `repeat(${board[0].length}, ${CELL_SIZE + 4}px)`,
        }}
      >
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                // width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell ? 'black' : 'white',
                margin: '1px',
                border: '1px solid gray',
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Conway's Game of Life</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            Rows:
            <input type="text" value={rows} onChange={e => setRows(e.target.value)} />
          </label>
          <label>
            Columns:
            <input type="text" value={cols} onChange={e => setCols(e.target.value)} />
          </label>
          <Button onClick={handleUpdateGameBoard}>
            {'Create Board'}
          </Button>
          <Button onClick={handleRandomGame}>
            {'Random Game'}
          </Button>
          <Button color={isPlaying ? 'danger' : 'success'} onClick={handlePlayClick}>
            {isPlaying ? 'Stop' : 'Start'}
          </Button>
          <Button color="primary" onClick={handleResetClick}>Reset</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Speed:</label>
          <Button onClick={((reduceSpeed))}>-</Button>
          <input type="text" value={speed} onChange={e => setSpeed(e.target.value)} />
          <Button onClick={increaseSpeed}>+</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {renderGameBoard()}
        </Col>
      </Row>
    </Container>
  );
}

export default GameOfLife;