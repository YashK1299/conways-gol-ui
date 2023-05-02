import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import axios from 'axios';


function GameOfLife() {
  const CELL_SIZE = 20;
  const [board, setBoard] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [isPlaying, setIsPlaying] = useState(false);

  // Step to next generation
  const handleNextGeneration = useCallback(() =>
    axios.put('/gameoflife/nextGen')
      .then(() => {
        axios.get('/gameoflife/isGameOver')
          .then(response => {
            if (response.data)
              setIsPlaying(false);
            getBoard();
          }).catch(error => console.log(error));
      }).catch(error => console.log(error)), []);

  // Play the game when started
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(handleNextGeneration, speed);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [handleNextGeneration, isPlaying, speed]);

  // Get the updated game board from the server
  const getBoard = () => {
    axios.get('/gameoflife/gameBoard')
      .then(response => {
        setRows(response.data.length);
        setCols(response.data[0].length);
        setBoard(response.data);
      })
      .catch(error => console.log(error));
  }

  // Get the initial game board from the server
  useEffect(getBoard, []);

  // Update the game board size
  const handleUpdateGameBoard = () => {
    axios.put('/gameoflife/editGameBoardSize', {
      rows: rows,
      cols: cols
    })
      .then(getBoard)
      .catch(error => console.log(error));
  };

  // Create a random civilization in the game board
  const handleRandomGame = () => {
    axios.put('/gameoflife/randomGame')
      .then(getBoard)
      .catch(error => console.log(error));
  };

  // Toggle the state of the clicked cell from live to dead and vice-versa
  const handleCellClick = (row, col) => {
    axios.put('/gameoflife/toggleCell', {
      row: row,
      col: col,
    })
      .then(() => {
        const updatedBoard = [...board];
        updatedBoard[row][col] = !updatedBoard[row][col];
        setBoard(updatedBoard);
      })
      .catch(error => console.log(error));
  };

  // Toggle between game start and stop
  const handlePlayClick = () => setIsPlaying(!isPlaying);

  // Reset the game board with an empty civilization
  const handleResetClick = () => {
    axios.put('/gameoflife/resetGame')
      .then(getBoard)
      .catch(error => console.log(error));
  };

  const renderGameBoard = () => {
    return (board && board.length !== 0) ? (
      <div
        style={{
          width: board[0].length * CELL_SIZE,
          height: board.length * CELL_SIZE,
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
    ) : null;
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
            <Button style={{ margin: '0 1px 0 10px' }} onClick={() => setRows(rows - 1)}>-</Button>
            <input type="text" value={rows} onChange={e => setRows(e.target.value)} />
            <Button style={{ margin: '0 10px 0 1px' }} onClick={() => setRows(rows + 1)}>+</Button>
          </label>
          <label>
            Columns:
            <Button style={{ margin: '0 1px 0 10px' }} onClick={() => setCols(cols - 1)}>-</Button>
            <input type="text" value={cols} onChange={e => setCols(e.target.value)} />
            <Button style={{ margin: '0 10px 0 1px' }} onClick={() => setCols(cols + 1)}>+</Button>
          </label>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          <Button style={{ margin: '0 10px' }} onClick={handleUpdateGameBoard}>
            {'Create Board'}
          </Button>
          <Button style={{ margin: '0 10px' }} onClick={handleRandomGame}>
            {'Random Game'}
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          <Button style={{ margin: '0 10px' }} color="primary" onClick={handleNextGeneration}>
            Next Step
          </Button>
          <Button style={{ margin: '0 10px' }} color={isPlaying ? 'danger' : 'success'} onClick={handlePlayClick}>
            {isPlaying ? 'Stop' : 'Start'}
          </Button>
          <Button style={{ margin: '0 10px' }} color="primary" onClick={handleResetClick}>Reset</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          <label>Delay:</label>
          <Button style={{ margin: '0 1px 0 10px' }} onClick={() => setSpeed(speed - 50)}>-</Button>
          <input type="text" value={speed} onChange={e => setSpeed(e.target.value)} />
          <Button style={{ margin: '0 10px 0 1px' }} onClick={() => setSpeed(speed + 50)}>+</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          {renderGameBoard()}
        </Col>
      </Row>
    </Container>
  );
}

export default GameOfLife;