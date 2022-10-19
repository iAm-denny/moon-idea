import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Group, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';
import Title from '../../../components/Typography/Title';
import Text from '../../../components/Typography/Text';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: 12,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
    cursor: 'pointer',
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.05)',
    },
  },
}));

function Index(props) {
  const { title } = props;
  const { classes, cx } = useStyles();
  return (
    <div>
      <Title order={1}>{title}</Title>
      <Box mt={25}>
        <Group position="right">
          <Button mb={15} radius="md" variant="filled">
            Ask Question
          </Button>
        </Group>
        <Link to="/client/community/123" className={cx(classes.item)}>
          <div>
            <Title order={3}>
              Is there a way to limit the number of characters in a TextInput
              component to just 1?
            </Title>
            <Text size="sm" mt={8} color="grey">
              Denny: Hey I cant provider a sandbox, the code is too large but
              the important part is this:
            </Text>
            <Text color="dimmed" size="sm" mt={16}>
              2h ago
            </Text>
          </div>
        </Link>
      </Box>
    </div>
  );
}

Index.propTypes = {
  title: PropTypes.string,
};

Index.defaultProps = {
  title: '',
};

export default Index;
