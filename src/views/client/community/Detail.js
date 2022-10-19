import {
  Avatar,
  Box,
  Button,
  createStyles,
  Divider,
  ScrollArea,
} from '@mantine/core';
import React, { useRef } from 'react';
import { RichTextEditor } from '@mantine/rte';
import Text from '../../../components/Typography/Text';
import Title from '../../../components/Typography/Title';

const useStyles = createStyles(() => ({
  user: {
    display: 'flex',
    alignItems: 'top',
  },
  user_info: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function UserCard() {
  const { classes } = useStyles();
  return (
    <Box className={classes.user} mb={20}>
      {/* Profile */}
      <Box mr={16}>
        <Avatar radius="xl" size="md" color="cyan">
          D
        </Avatar>
      </Box>
      {/* info */}
      <div>
        <div className={classes.user_info}>
          <Text mr={8} weight="bold" size="sm">
            Denny
          </Text>
          <Text size="xs" color="grey">
            Today at 11:04 AM
          </Text>
        </div>
        <Box mt={8}>
          <Text size="sm">
            Howdy! Ughhh I have kind of a dumb CSS question. Check this code:
            https://codesandbox.io/s/relaxed-dan-6pkvbw?file=/src/App.tsx I like
            how it works below 1000px, but once it goes above that I want the
            card to center instead of sticking to the right. Basically how
            Mantine.Dev site works when you go above 1200px (i think), it
            centers the content, but below that it fits snug in the window.
            Whats the trick?! Thanks,{' '}
          </Text>
        </Box>
      </div>
    </Box>
  );
}

function Detail() {
  const answerRef = useRef();

  const handlePostAnswer = () => {
    console.log('answerRef', answerRef.current.value);
  };
  return (
    <div>
      <Title order={1}>
        {' '}
        Is there a way to limit the number of characters in a TextInput
        component to just 1?
      </Title>

      <Box mt={25}>
        {/* questioner  */}
        <UserCard />
        <Divider my={16} mb={25} />
        {/* end questioner  */}

        <Box>
          <Text mb={10}>Answer</Text>
          <ScrollArea style={{ height: '50vh' }}>
            {[0, 1, 2, 3, 4, 5].map(() => (
              <>
                <UserCard />
                <Divider mb={16} />
              </>
            ))}
          </ScrollArea>
        </Box>

        <Box mt={35}>
          <Text mb={10}>Your answer</Text>
          <RichTextEditor
            ref={answerRef}
            id="rte"
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['unorderedList'],
              ['sup', 'sub'],
              ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
          />
        </Box>
        <Button mt={15} radius="md" variant="filled" onClick={handlePostAnswer}>
          Post Your Answer
        </Button>
      </Box>
    </div>
  );
}

export default Detail;
