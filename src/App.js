/* eslint-disable no-undef */
import React, { useState, useCallback, useEffect } from "react";
import { Box, Flex, Text, Button, useBreakpointValue } from "@chakra-ui/react";

const GRID_SIZE = 10;
const INITIAL_SNAKE = [
  { x: 2, y: 2 },
  { x: 2, y: 1 },
];
const INTIAL_DIRECTION = { x: 0, y: 1 };

const getRandomFoodPosition = (snake) => {
  let foodPosition;
  do {
    foodPosition = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some(
      (snakePosition) =>
        snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y
    )
  );
  return foodPosition;
};

const App = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INTIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFoodPosition(INITIAL_SNAKE));
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const cellSize = useBreakpointValue({ base: 8, md: 6 });

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    // check collide with wall
    if (
      newHead.x < 0 || // wall
      newHead.y < 0 || // wall
      newHead.x >= GRID_SIZE || // wall
      newHead.y >= GRID_SIZE 
      // || // wall
      // snake.some(
      //   (s = s.x === newHead.x && s.y === newHead.y) // self collision
      // )
    ) {
      setIsGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Eat food
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(getRandomFoodPosition(newSnake));
      setScore((prev) => prev + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <Flex align="center" direction="column" mt={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Snake Game
      </Text>

      <Box
        mt={4}
        border="2px solid gray"
        display="grid"
        gridTemplateColumns={`repeat(${GRID_SIZE}, ${cellSize}vmin)`}
        gridTemplateRows={`repeat(${GRID_SIZE}, ${cellSize}vmin)`}
        bg="gray.100"
      >
        {Array(GRID_SIZE * GRID_SIZE)
          .fill(null)
          .map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isSnake = snake.some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <Box
                key={idx}
                bg={isSnake ? "green.500" : isFood ? "red.500" : "white"}
                border="1px solid"
                borderColor="gray.300"
              />
            );
          })}
      </Box>
    </Flex>
  );
};

export default App;
