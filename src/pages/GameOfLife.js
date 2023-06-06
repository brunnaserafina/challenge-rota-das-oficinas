import React, { useState, useRef, useCallback } from "react";
import produce from "immer";
import styled from "styled-components";
import Header from "../components/Header/Header";

const numRows = 50;
const numCols = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

export default function GameOfLife() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <Wrapper>
      <Header />
      <ButtonContainer>
        <Button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </Button>

        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          Random
        </Button>

        <Button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          Clear
        </Button>
      </ButtonContainer>
      <GridContainer>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <Cell
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              alive={grid[i][k]}
            />
          ))
        )}
      </GridContainer>
    </Wrapper>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  background-color: #7e7e7e;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #3a5a53;
  color: white;
  border: none;
  height: 25px;
  border-radius: 5px;
  margin: 5px 5px 5px 0;
  cursor: pointer;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 20px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(35, 20px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(18, 20px);
  }
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ alive }) => (alive ? "var(--green)" : undefined)};
  border: solid 0.5px #999999;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;
