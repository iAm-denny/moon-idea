import React, { useEffect, useRef, useState } from 'react';
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
import { IconPlus } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Title from '../../../components/Typography/Title';
import Modal from '../../../components/Modal/Modal';
import Text from '../../../components/Typography/Text';
import api from '../../../config/api';
import { fetchQuestionList } from '../../../redux/features/user/clientSlice';

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
    height: 150,
    overflow: 'hidden',
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
  const userState = useSelector((state) => state.user.user);
  const { questions, loaderQuestion } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestionList({ accessToken: userState.accessToken }));
  }, []);

  const handleClickAskQuestionBtn = () => setOpenAskQuestionForm(true);

  const questionForm = useForm({
    validate: yupResolver(questionSchema),
    initialValues: {
      title: '',
    },
  });

  const handlePostQuestion = (value) => {
    setLoaderPostQuestion(true);
    setBodyError('');
    const removedHTMLElement = questionRef.current.value.replace(
      /<\/?[^>]+(>|$)/g,
      ''
    );

    if (removedHTMLElement.length < 3) {
      return setBodyError('Body should have at least 3 letters');
    }
    const data = {
      title: value.title,
      body: questionRef.current.value,
    };
    api
      .post('/client/create-question', JSON.stringify(data), {
        accessToken: userState.accessToken,
        rftoken_id: localStorage.getItem('rftoken_id'),
      })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err));
    questionForm.reset();
    const textEdiotrVal = document.querySelector('.ql-editor p');
    textEdiotrVal.remove();
    setOpenAskQuestionForm(false);
    setBodyError('');

    return setLoaderPostQuestion(false);
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
          questionForm.reset();
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
            leftIcon={<IconPlus size={16} />}
            mb={15}
            radius="md"
            variant="filled"
            onClick={handleClickAskQuestionBtn}
          >
            Ask Question
          </Button>
        </Group>
        {!loaderQuestion &&
          questions?.data &&
          questions?.data.length > 0 &&
          questions?.data?.map((question) => (
            <Link
              // eslint-disable-next-line no-underscore-dangle
              to={`/client/community/${question._id}`}
              className={cx(classes.item)}
              // eslint-disable-next-line no-underscore-dangle
              key={question._id}
            >
              <div>
                <Title order={3}>{question.title}</Title>
                <div>
                  <Text
                    size="sm"
                    mt={8}
                    color="grey"
                    style={{
                      width: '85vw',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {question.created_by.fullname}:{' '}
                    {question.body.replace(/<\/?[^>]+(>|$)/g, '')}
                  </Text>
                </div>

                <Text color="dimmed" size="sm" mt={16}>
                  {moment(question.createdAt).fromNow()}
                </Text>
              </div>
            </Link>
          ))}
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
