import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Group,
  createStyles,
  TextInput,
  Space,
  LoadingOverlay,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import RichTextEditor from '@mantine/rte';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import Title from '../../../components/Typography/Title';
import Modal from '../../../components/Modal/Modal';
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

const questionSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required field.')
    .min(3, 'Title should have at least 3 letters'),
});

function Index(props) {
  const { title } = props;
  const [loaderPostQuestion, setLoaderPostQuestion] = useState(false);
  const { classes, cx } = useStyles();
  const questionRef = useRef();
  const [openAskQuestionForm, setOpenAskQuestionForm] = useState(false);
  const [bodyError, setBodyError] = useState('');

  const handleClickAskQuestionBtn = () => setOpenAskQuestionForm(true);

  const questionForm = useForm({
    validate: yupResolver(questionSchema),
    initialValues: {
      title: '',
    },
  });

  const handlePostQuestion = (value) => {
    setBodyError('');
    const removedHTMLElement = questionRef.current.value.replace(
      /<\/?[^>]+(>|$)/g,
      ''
    );

    if (removedHTMLElement.length < 3) {
      return setBodyError('Body should have at least 3 letters');
    }
    questionForm.reset();
    setBodyError('');
    setLoaderPostQuestion(true);
    return setTimeout(() => setLoaderPostQuestion(false), 3000);
  };
  return (
    <div>
      <Title order={1}>{title}</Title>
      <Modal
        opened={openAskQuestionForm}
        setopened={setOpenAskQuestionForm}
        title="Ask Question"
        closefun={() => {
          // questionRef = null;
          setBodyError('');
          questionRef.current.value = '';
        }}
      >
        <form
          onSubmit={questionForm.onSubmit(handlePostQuestion)}
          autoComplete="chrome-off"
        >
          <TextInput
            label="Title"
            size="sm"
            withAsterisk
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...questionForm.getInputProps('title')}
          />
          <Space h="md" />
          <Text size="sm" mb={3}>
            Body <span style={{ color: '#fa5252' }}>*</span>
          </Text>
          <RichTextEditor
            ref={questionRef}
            id="rte"
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['unorderedList'],
              ['sup', 'sub'],
              ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
            style={{ border: bodyError && '1px solid #fa5252' }}
            value={questionRef?.current?.value}
          />
          {bodyError && (
            <Text color="#fa5252" size="xs" mt={3}>
              {bodyError}
            </Text>
          )}

          <Space h="md" />
          <Group position="right" spacing="xs">
            <Button variant="filled" type="submit">
              {' '}
              {loaderPostQuestion ? (
                <LoadingOverlay
                  visible
                  overlayBlur={2}
                  loaderProps={{ size: 'xs' }}
                />
              ) : (
                'Post Your Question'
              )}
            </Button>
          </Group>
        </form>
      </Modal>
      <Box mt={25}>
        <Group position="right">
          <Button
            mb={15}
            radius="md"
            variant="filled"
            onClick={handleClickAskQuestionBtn}
          >
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
