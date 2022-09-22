/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line max-len
  AppShell, Burger, Navbar, createStyles, Center, Stack, Tooltip, UnstyledButton, Group, Header, MediaQuery, Paper, Box, Space, Button, LoadingOverlay, TextInput, Avatar,
} from '@mantine/core';
import {
  IconFolder, IconUsers, IconLogout,
  IconUserCircle,
} from '@tabler/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import useResponsive from '../../utils/responsive';
import { logout } from '../../redux/features/user/userSlice';
import Modal from '../Modal/Modal';
import Text from '../Typography/Text';

const useStyles = createStyles((theme) => ({
  appshellRoot: {
    main: {
      background: 'rgb(248, 249, 250)',
    },
  },
  childrenRoot: {
    minHeight: '100%',
  },
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.other.primaryColorCode }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.other.primaryColorCode }).color,
    },
  },
}));
const mockdata = [
  { icon: IconFolder, label: 'Home', path: '/client/my-projects' },
  { icon: IconUsers, label: 'Community', path: '/client/community' },
];

function NavbarLink({
  icon: Icon, label, active, onClick,
}) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1.5} size={20} />
      </UnstyledButton>
    </Tooltip>
  );
}

const profileInputItems = [
  {
    label: 'Email',
    name: 'email',
  },
  {
    label: 'Full name',
    name: 'fullname',
  },
];

const profileSchema = Yup.object().shape({
  fullname: Yup.string().min(2, 'Name should have at least 2 letters'),
  email: Yup.string().email('Invalid email').required('Required field.'),
});

function ProfileContent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const userState = useSelector((state) => state.user.user);

  const formProfile = useForm({
    validate: yupResolver(profileSchema),
    validateInputOnChange: true,
    initialValues: {
      fullname: userState.user.fullname,
      email: userState.user.email,
    },
  });
  return (
    <form
      onSubmit={formProfile.onSubmit((value) => console.log('value', value))}
      autoComplete="chrome-off"
    >
      {
        errorMessage && (
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
            <Text size="sm">{errorMessage}</Text>
          </Box>
        )
      }
      <Space h="md" />
      <Group position="center">
        <Avatar color="cyan" radius="xl" size="xl">{userState.user.fullname[0]}</Avatar>
      </Group>
      <Space h="md" />
      {
        profileInputItems.map((item) => (
          <div key={item.name}>

            <TextInput
              label={item.label}
              size="sm"
              withAsterisk
              autoComplete="new-password"
              disabled={item.label === 'Email'}
                  // eslint-disable-next-line react/jsx-props-no-spreading
              {...formProfile.getInputProps(item.name)}
            />
            <Space h="md" />
          </div>
        ))
      }
      <Group position="right" spacing="xs">
        <Button variant="filled" type="submit">
          {' '}
          {
            loader ? <LoadingOverlay visible overlayBlur={2} loaderProps={{ size: 'xs' }} />
              : 'Update'
          }

        </Button>
      </Group>
    </form>

  );
}

function ClientNavigation(props) {
  const { children } = props;
  const [openForm, setOpenForm] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isSmall } = useResponsive();
  const [selectedPath, setSelectedPath] = useState(pathname);
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const links = mockdata.map((data) => (
    <NavbarLink
      {...data}
      key={data.label}
      active={data.path === selectedPath}
      onClick={() => {
        setSelectedPath(data.path);
        navigate(data.path);
      }}
    />
  ));

  useEffect(() => {
    setOpened(false);
  }, [isSmall]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppShell
      className={classes.appshellRoot}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={isSmall && (
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="grey"
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      )}
      navbar={(
        // eslint-disable-next-line no-nested-ternary
        <Navbar width={{ base: isSmall ? opened ? 80 : 0 : 80 }} p="md" hiddenbreakpoint="sm" hidden={!opened}>
          <Center>
            Logo
          </Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavbarLink icon={IconUserCircle} label="Profile" onClick={() => setOpenForm(true)} />
              <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
            </Stack>
          </Navbar.Section>
        </Navbar>
      )}
    >
      <Modal opened={openForm} setopened={setOpenForm} title="Profile">
        <ProfileContent />
      </Modal>
      <Paper shadow="xs" p="lg" radius="md" className={classes.childrenRoot}>
        {children}
      </Paper>

    </AppShell>
  );
}

ClientNavigation.propTypes = {
  children: PropTypes.element.isRequired,
};

ClientNavigation.defaultProps = {
};
export default ClientNavigation;
