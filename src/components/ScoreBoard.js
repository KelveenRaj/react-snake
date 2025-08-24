import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { streamTopScores } from "../services/scoreService";

const ScoreBoard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsub = streamTopScores(setScores);
    return () => unsub();
  }, []);

  return (
    <Box
      p={4}
      borderRadius="md"
      maxW="400px"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Heading size="md" mb={3} textAlign="center">
        Top 5 Scores
      </Heading>

      <List spacing={2} mb={4}>
        {scores.map((score, index) => (
          <ListItem key={score.id}>
            <Text>
              <strong>{index + 1}.</strong> {score.name} - {score.score}{" "}
              <Text as="span" fontSize="sm" color="gray.500">
                {score.createdAt?.toDate().toLocaleString() || ""}
              </Text>
            </Text>
          </ListItem>
        ))}
        {scores.length === 0 && (
          <Text textAlign="center" color="gray.500">
            No scores yet. Be the first to play!
          </Text>
        )}
      </List>

      <Box bg="yellow.100" p={3} borderRadius="md">
        <Heading size="sm" mb={2}>
          Instructions
        </Heading>
        <Text>🍏 Eat apples to grow (+1 point).</Text>
        <Text>⭐ Golden apple appears every 5 points (+5 points).</Text>
        <Text>🖥️ Desktop: Use arrow keys or W A S D.</Text>
        <Text>📱 Mobile: Swipe up / down / left / right.</Text>
        <Text>⚠️ Avoid hitting walls or yourself!</Text>
      </Box>
    </Box>
  );
};

export default ScoreBoard;
