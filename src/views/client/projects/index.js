import React, { useState, useRef, useEffect } from 'react';
import {
  Box, createStyles, Button, Group, TextInput, Space, Chip, LoadingOverlay, Skeleton,
} from '@mantine/core';
import PropTypes from 'prop-types';
import {
  IconPlus, IconBriefcase, IconUser, IconGrain,
} from '@tabler/icons';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Title from '../../../components/Typography/Title';
import Text from '../../../components/Typography/Text';
import Modal from '../../../components/Modal/Modal';
import api from '../../../config/api';
import { addNewProject, fetchProjectList } from '../../../redux/features/user/clientSlice';

const useStyles = createStyles((theme, _params, getRef) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
    cursor: 'pointer',
    color: '#000',
    textDecoration: 'none',
  },
  chipBox: {
    width: '100%',
    minHeight: 36,
    borderRadius: 4,
    border: '1px solid #ced4da !important',
    padding: 12,
    marginBottom: 'calc(10px / 2)',
  },
  symbol: {
    fontSize: 30,
    width: 40,
  },
  label: {
    '&[data-checked]': {
      '&, &:hover': {
        backgroundColor: theme.other.primaryColorCode,
        color: theme.white,
      },

      [`& .${getRef('iconWrapper')}`]: {
        color: theme.white,
      },
    },
  },

  iconWrapper: {
    ref: getRef('iconWrapper'),
  },
}));

const createProjectSchema = Yup.object().shape({
  project_name: Yup
    .string()
    .required('Required field.'),
  project_type: Yup
    .string()
    .required('Required field.'),
});

const chipItems = [
  {
    name: 'Workspace',
    value: 'workspace',
    icon: <IconBriefcase size={16} />,
  },
  {
    name: 'Personal',
    value: 'personal',
    icon: <IconUser size={16} />,
  }, {
    name: 'Other',
    value: 'other',
    icon: <IconGrain size={16} />,
  },
];

function Index(props) {
  const { title } = props;
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user);
  const clientState = useSelector((state) => state.client);
  const [errorMessage, setErrorMessage] = useState('');
  const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);
  const focusFirstInput = useRef(null);

  const formCreateProject = useForm({
    validate: yupResolver(createProjectSchema),
    validateInputOnChange: true,
    initialValues: {
      project_name: '',
      project_type: '',
    },
  });

  useEffect(() => {
    dispatch(fetchProjectList(userState.accessToken));
  }, []);
  const handleClickCreateBtn = () => setOpenCreateProjectForm(true);

  const createProject = (values) => {
    api.post('/client/create-project/', JSON.stringify(values), { accessToken: userState.accessToken, rftoken_id: localStorage.getItem('rftoken_id') }).then((res) => {
      if (res?.message === 'success') {
        setErrorMessage('');
        dispatch(addNewProject(res.data));
      }
      formCreateProject.setValues({
        project_name: '',
        project_type: '',
      });
      setOpenCreateProjectForm(false);
    })
      .catch(() => setErrorMessage('Something went wrong'));
  };

  return (
    <div>
      <Title order={1}>{title}</Title>
      <Modal opened={openCreateProjectForm} setopened={setOpenCreateProjectForm} title="Create a project">
        <form onSubmit={formCreateProject.onSubmit(createProject)}>
          {errorMessage && (
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colors.red[0],
              color: theme.colors.red,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: theme.colors.red[5],
              textAlign: 'center',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.md,
            })}
          >
            <Text size="sm">
              {errorMessage}
            </Text>
          </Box>
          )}
          <TextInput
            label="Project name"
            size="sm"
            withAsterisk
            ref={focusFirstInput}
        // eslint-disable-next-line react/jsx-props-no-spreading
            {...formCreateProject.getInputProps('project_name')}
          />

          <Space h="md" />
          <Text size="sm">What type of project will you work on?</Text>
          <Box className={classes.chipBox}>
            <Chip.Group
              position="center"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formCreateProject.getInputProps('project_type')}
            >
              {
                chipItems.map((item) => (
                  <Chip classNames={classes} value={item.value} key={item.value}>
                    {item.name}
                  </Chip>
                ))
              }

            </Chip.Group>
          </Box>
          {
            formCreateProject.errors?.project_type && (
            <Text color="red" size="xs">{ formCreateProject.errors?.project_type}</Text>
            )
          }

          <Space h="md" />
          <Group position="right" spacing="xs">
            <Button variant="filled" type="submit">
              {' '}
              { clientState.loading ? <LoadingOverlay visible overlayBlur={2} loaderProps={{ size: 'xs' }} /> : 'Create'}
            </Button>
          </Group>
        </form>
      </Modal>
      <Box mt={25}>
        <Group position="right">
          {
            clientState.loading ? <Skeleton visible height={35} width={100} /> : <Button leftIcon={<IconPlus size={16} />} radius="md" variant="filled" onClick={handleClickCreateBtn}>Create a Project</Button>
          }
        </Group>
        {
          clientState.loading && (
            <>
              <Skeleton visible height={65} mt={25} />
              <Skeleton visible height={65} mt={25} />
              <Skeleton visible height={65} mt={25} />
            </>
          )
        }

        {/* CARD */}
        {
          clientState.projects?.data && clientState.projects.data.map((project) => (
            // eslint-disable-next-line no-underscore-dangle
            <Box mt={25} key={project._id}>
              <Link
                // component={Link}
                // eslint-disable-next-line no-underscore-dangle
                to={`/client/my-projects/${project._id}`}
                className={cx(classes.item)}
              >
                {
                  project.project_type === 'workspace'
                    ? <IconBriefcase className={classes.symbol} />
                    : project.project_type === 'personal'
                      ? <IconUser className={classes.symbol} />
                      : <IconGrain className={classes.symbol} />
                }

                <div>
                  <Text size="md">{project.project_name}</Text>
                  <Text color="dimmed" size="sm">
                    Edited:
                    {' '}
                    {
                      moment(project.updatedAt).fromNow()
                    }
                    {/* {new Date(project.updated_at)} */}
                  </Text>
                </div>
              </Link>
            </Box>
          ))
        }
        {/* End Card */}
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
