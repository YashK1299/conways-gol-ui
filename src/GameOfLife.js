import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import axios from 'axios';

const CELL_SIZE = 20;
const INTERVAL_MS = 100;

function GameOfLife() {
  const [grid, setGrid] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Get the initial grid from the server
    axios.get('/gameoflife/grid')
      .then(response => {
        setGrid(response.data);
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
        axios.post('/gameoflife/step')
          .then(() => {
            // Get the updated grid from the server
            axios.get('/gameoflife/grid')
              .then(response => {
                setGrid(response.data);
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      }, INTERVAL_MS);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handleCellClick = (row, col) => {
    // Set the state of the clicked cell
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);

    // Update the cell state on the server
    axios.post('/gameoflife/cell', {
      row: row,
      col: col,
      state: newGrid[row][col]
    })
      .catch(error => console.log(error));
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleResetClick = () => {
    // Reset the game on the server
    axios.post('/gameoflife/reset')
      .then(() => {
        // Get the updated grid from the server
        axios.get('/gameoflife/grid')
          .then(response => {
            setGrid(response.data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const renderGrid = () => {
    return (
      <div
        style={{
          width: cols * CELL_SIZE,
          height: rows * CELL_SIZE,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`
        }}
      >
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell ? 'black' : 'white',
                border: '1px solid gray'
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
                <input type="text" value={this.state.rows} onChange={this.handleRowsChange} />
            </label>
        </Col>
        <Col>
            <label>
                Columns: 
                <input type="text" value={this.state.cols} onChange={this.handleColsChange} />
            </label>
        </Col>
      </Row>
      <Row>
        <Col>
          {renderGrid()}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color={isPlaying ? 'danger' : 'success'} onClick={handlePlayClick}>
            {isPlaying ? 'Stop' : 'Start'}
          </Button>
          <Button color="primary" onClick={handleResetClick}>Reset</Button>
        </Col>
      </Row>
    </Container>
  );
}
 
export default GameOfLife;