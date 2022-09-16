import React, { useState, useRef } from 'react';
import {
  Box, createStyles, Button, Group, TextInput, Space, Chip,
} from '@mantine/core';
import PropTypes from 'prop-types';
import { IconPlus, IconGripVertical } from '@tabler/icons';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import Title from '../../../components/Typography/Title';
import Text from '../../../components/Typography/Text';
import Modal from '../../../components/Modal/Modal';

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
  },
  {
    name: 'Personal',
    value: 'personal',
  }, {
    name: 'Other',
    value: 'other',
  },
];

function Index(props) {
  const { title } = props;
  const { classes, cx } = useStyles();
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

  const handleClickCreateBtn = () => setOpenCreateProjectForm(true);

  return (
    <div>
      <Title order={1}>{title}</Title>
      <Modal opened={openCreateProjectForm} setopened={setOpenCreateProjectForm} title="Create a project">
        <form onSubmit={formCreateProject.onSubmit((values) => console.log(values))}>
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
                  <Chip classNames={classes} value={item.value}>{item.name}</Chip>
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
            <Button variant="filled" type="submit"> Create</Button>
          </Group>
        </form>
      </Modal>
      <Box mt={25}>
        <Group position="right">
          <Button leftIcon={<IconPlus size={16} />} radius="md" variant="filled" onClick={handleClickCreateBtn}>Create a Project</Button>
        </Group>

        {/* CARD */}
        <Box mt={25}>
          <div
            className={cx(classes.item)}
          >
            <IconGripVertical className={classes.symbol} />
            <div>
              <Text size="md">Title</Text>
              <Text color="dimmed" size="sm">
                Edited:
                {' '}
                10 July 2022
              </Text>
            </div>
          </div>
        </Box>
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
