/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  createStyles,
  Divider,
  ScrollArea,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import Text from '../../../components/Typography/Text';
import Title from '../../../components/Typography/Title';
import {
  fetchAnswerList,
  fetchQuestionList,
} from '../../../redux/features/user/clientSlice';
import api from '../../../config/api';

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

function UserCard(dataprops = {}) {
  const { classes } = useStyles();
  const { data } = dataprops;

  return (
    <Box className={classes.user} mb={20}>
      {/* Profile */}
      <Box mr={16}>
        {data?.created_by?.profile ? (
          <Avatar radius="xl" size="md" src={data?.created_by?.profile} />
        ) : (
          <Avatar radius="xl" size="md" color="cyan">
            {data?.created_by?.fullname[0]}
          </Avatar>
        )}
      </Box>
      {/* info */}
      <div>
        <div className={classes.user_info}>
          <Text mr={8} weight="bold" size="sm">
            {data?.created_by?.fullname}
          </Text>
          <Text size="xs" color="grey">
            {moment(data?.createdAt).format('DD MMMM YYYY | HH:MM')}
          </Text>
        </div>
        <Box mt={8}>
          {data?.content ? (
            <Text size="sm" dangerHTML text={data?.content} />
          ) : (
            data?.body && <Text size="sm" dangerHTML text={data?.body} />
          )}
        </Box>
      </div>
    </Box>
  );
}

function Detail() {
  const answerRef = useRef();
  const [ownerCreatorId, setOwnerCreatorId] = useState(null);
  const params = useParams();
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { questions, loaderQuestion, answers } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    dispatch(
      fetchQuestionList({
        accessToken: userState.accessToken,
        post_id: params.id,
      })
    );

    dispatch(
      fetchAnswerList({
        accessToken: userState.accessToken,
        post_id: params.id,
      })
    );
  }, []);

  const handlePostAnswer = () => {
    const data = {
      content: answerRef.current.value,
      post_id: params.id,
      post_owner_id: ownerCreatorId,
    };
    api
      .post('/client/create-answer', JSON.stringify(data), {
        accessToken: userState.accessToken,
        rftoken_id: localStorage.getItem('rftoken_id'),
      })
      .then((res) => {
        dispatch(
          fetchAnswerList({
            accessToken: userState.accessToken,
            post_id: params.id,
          })
        );
      })
      .catch((err) => console.log('err', err));
    const textEdiotrVal = document.querySelector('.ql-editor p');
    textEdiotrVal.remove();
    answerRef.current.value = '';
  };

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    setOwnerCreatorId(questions?.data?.created_by?._id);
  }, [questions]);
  return (
    <div>
      <Title order={1}> {questions?.data?.title}</Title>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{questions.data.title ? `${questions.data.title}` : ''}</title>
        <link
          rel="canonical"
          // eslint-disable-next-line no-underscore-dangle
          href={`/client/community/${questions.data._id}`}
        />
      </Helmet>
      <Box mt={25}>
        {/* questioner  */}
        {!loaderQuestion && <UserCard data={questions.data} />}

        <Divider my={16} mb={25} />
        {/* end questioner  */}
        {answers && answers.data.length > 0 && (
          <Box>
            <Text mb={10}>Answer</Text>
            <ScrollArea style={{ height: answers.data.length > 3 && '50vh' }}>
              {answers.data.map((data) => (
                // eslint-disable-next-line no-underscore-dangle
                <div key={data._id}>
                  <UserCard data={data} />
                  <Divider mb={16} />
                </div>
              ))}
            </ScrollArea>
          </Box>
        )}
        <Box mt={35}>
          <Text mb={10}>Your answer</Text>
          <RichTextEditor
            ref={answerRef}
            id="answer-text-editor"
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['unorderedList'],
              ['sup', 'sub'],
              ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
            value={answerRef?.current?.value}
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
