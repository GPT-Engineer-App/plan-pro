import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast, Flex, Heading, Text } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={8}>
      <Flex direction="column" align="center" justify="center">
        <Heading mb={6}>Todo List</Heading>
        <Flex mb={4}>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        </Flex>
        <List spacing={3} w="100%" maxW="500px">
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Flex align="center" justify="space-between">
                <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
                <Flex>
                  <IconButton
                    icon={<FaCheck />}
                    onClick={() => toggleTaskCompletion(task.id)}
                    colorScheme={task.isCompleted ? 'pink' : 'green'}
                    aria-label="Complete task"
                    mr={2}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    onClick={() => deleteTask(task.id)}
                    colorScheme="red"
                    aria-label="Delete task"
                  />
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default Index;