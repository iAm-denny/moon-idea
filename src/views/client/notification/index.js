import React, { useEffect } from 'react';
import { Avatar, Box, createStyles, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Text from '../../../components/Typography/Text';
import Title from '../../../components/Typography/Title';
import { fetchNotificationList } from '../../../redux/features/user/clientSlice';
import api from '../../../config/api';

const useStyles = createStyles((theme) => ({
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: 8,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
    cursor: 'pointer',
    color: '#000',
    textDecoration: 'none',
    paddingLeft: 13,
    transition: '0.5s ease',
    '&:hover': {
      transform: 'translateX(-5px)',
    },
  },
  active: {
    '::before': {
      content: '""',
      position: 'absolute',
      width: 5,
      height: '100%',
      background: 'rgba(161, 153, 255, 1)',
      top: 0,
      left: 0,
    },
  },
}));

function index(props) {
  const { title } = props;
  const { classes, cx } = useStyles();
  const userState = useSelector((state) => state.user.user);
  const { notification, loaderNotification } = useSelector(
    (state) => state.client
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationList({ accessToken: userState.accessToken }));
  }, []);

  const convertText = (type) => {
    let text = '';
    switch (type) {
      case 'comment':
        text = 'has commented to your post.';
        break;
      default:
        text = '';
    }
    return text;
  };
  return (
    <div>
      <Title order={1}>{title}</Title>
      <Box mt={25}>
        {notification &&
          notification.data &&
          notification.data.length > 0 &&
          notification.data.map(
            (data, i) =>
              data.post_id && (
                <Link
                  // eslint-disable-next-line no-underscore-dangle
                  key={data._id}
                  // eslint-disable-next-line no-underscore-dangle
                  to={`/client/community/${data.post_id._id}`}
                  className={cx(classes.item, {
                    [classes.active]: !data.has_read,
                  })}
                  // eslint-disable-next-line no-underscore-dangle
                >
                  <div>
                    <Group position="left">
                      {data?.sender_id?.profile ? (
                        <Avatar
                          radius="xl"
                          size="md"
                          src={data?.sender_id?.profile}
                        />
                      ) : (
                        <Avatar radius="xl" size="md" color="cyan">
                          {data?.sender_id?.fullname[0]}
                        </Avatar>
                      )}
                      {/* <Avatar radius="xl" size="md" color="cyan">
                    D
                  </Avatar> */}
                      <Box>
                        <div style={{ display: 'flex' }}>
                          <Text weight="bold" mr={5}>
                            {data?.sender_id?.fullname}
                          </Text>
                          <Text>{convertText(data.noti_type)} </Text>
                        </div>
                        <Text size="sm" color="grey">
                          {data?.post_id?.title}
                        </Text>
                      </Box>
                    </Group>

                    <Text color="dimmed" size="sm" mt={16} ml={6}>
                      {moment(data.createdAt).fromNow()}
                    </Text>
                  </div>
                </Link>
              )
          )}
      </Box>
    </div>
  );
}

export default index;
