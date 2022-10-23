/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line max-len
  AppShell,
  Burger,
  Navbar,
  createStyles,
  Center,
  Stack,
  Tooltip,
  UnstyledButton,
  Group,
  Header,
  MediaQuery,
  Paper,
  Box,
  Space,
  Button,
  LoadingOverlay,
  TextInput,
  Avatar,
  FileInput,
} from '@mantine/core';
import {
  IconFolder,
  IconUsers,
  IconLogout,
  IconUserCircle,
  IconPhoto,
  IconBell,
} from '@tabler/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import useResponsive from '../../utils/responsive';
import { logout, updateUserProfile } from '../../redux/features/user/userSlice';
import Modal from '../Modal/Modal';
import Text from '../Typography/Text';
import api from '../../config/api';

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
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.other.primaryColorCode,
      }).background,
      color: theme.fn.variant({
        variant: 'light',
        color: theme.other.primaryColorCode,
      }).color,
    },
  },
}));
const mockdata = [
  { icon: IconFolder, label: 'Home', path: '/client/my-projects' },
  { icon: IconUsers, label: 'Community', path: '/client/community' },
  { icon: IconBell, label: 'Notification', path: '/client/notification' },
];

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
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

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const profileSchema = Yup.object().shape({
  fullname: Yup.string().min(2, 'Name should have at least 2 letters'),
  email: Yup.string().email('Invalid email').required('Required field.'),
  profile: Yup.mixed()
    .test('fileSize', 'The file is too large', (value) =>
      typeof value !== 'string'
        ? !value || (value && value.size <= 1024 * 1024)
        : true
    )
    .test(
      'type',
      'Only the following formats are accepted: .jpg, jpeg, png',
      (value) =>
        typeof value !== 'string'
          ? !value || (value && SUPPORTED_FORMATS.includes(value.type))
          : true
    ),
});

function ProfileContent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const formProfile = useForm({
    validate: yupResolver(profileSchema),
    validateInputOnChange: true,
    initialValues: {
      fullname: userState.user.fullname,
      email: userState.user.email,
      profile: userState.user?.profile || '',
    },
  });

  const convertImageToBase64 = (file) =>
    new Promise((resolve) => {
      let baseURL = '';
      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });

  const updateProfile = async (values) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    let profileBase64 = '';
    const profile_public_id = userState.user?.profile_public_id || '';
    if (values.profile) {
      if (
        typeof values.profile === 'string' &&
        values.profile.includes('http')
      ) {
        profileBase64 = values.profile;
      } else {
        profileBase64 = await convertImageToBase64(values.profile);
      }
    }

    setLoader(true);
    api
      .post(
        '/user/update-profile',
        JSON.stringify({
          fullname: values.fullname,
          profile: profileBase64,
          profile_public_id,
        }),
        {
          accessToken: userState.accessToken,
          rftoken_id: localStorage.getItem('rftoken_id'),
        }
      )
      .then((res) => {
        if (res.success) {
          dispatch(updateUserProfile(res.data));
          setSuccessMessage('Successfully updated.');
          setErrorMessage(null);
        } else {
          setSuccessMessage(null);
          setErrorMessage('Something went wrong');
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log('err', err);
        setErrorMessage('Something went wrong');
        setLoader(false);
      });
  };

  return (
    <form
      onSubmit={formProfile.onSubmit(updateProfile)}
      autoComplete="chrome-off"
    >
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
          <Text size="sm">{errorMessage}</Text>
        </Box>
      )}
      {successMessage && (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.green[0],
            color: theme.colors.green,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.colors.green[5],
            textAlign: 'center',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.md,
          })}
        >
          <Text size="sm">{successMessage}</Text>
        </Box>
      )}
      <Space h="md" />
      <Group position="center">
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 32,
            position: 'relative',
          }}
        >
          {formProfile.getInputProps('profile').value ? (
            <Avatar
              radius="xl"
              size="xl"
              src={
                typeof formProfile.getInputProps('profile').value ===
                  'string' &&
                formProfile.getInputProps('profile').value.includes('http')
                  ? formProfile.getInputProps('profile').value
                  : URL.createObjectURL(
                      formProfile.getInputProps('profile').value
                    )
              }
            />
          ) : (
            <Avatar color="cyan" radius="xl" size="xl">
              {userState.user.fullname[0]}
            </Avatar>
          )}

          <label
            htmlFor="profile"
            style={{
              position: 'absolute',
              right: -5,
              bottom: -5,
              background: '#fff',
              borderRadius: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: 'rgba(161, 153, 255, 1)',
              padding: 3,
            }}
          >
            <IconPhoto size={20} color="#1400FF" />
          </label>
          <FileInput
            id="profile"
            {...formProfile.getInputProps('profile')}
            style={{ display: 'none' }}
            accept="image/jpeg, image/png, image/jpg"
          />
        </div>
      </Group>
      <div style={{ textAlign: 'center' }}>
        {formProfile.errors?.profile && (
          <Text color="red">{formProfile.errors?.profile}</Text>
        )}
      </div>
      <Space h="md" />
      {profileInputItems.map((item) => (
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
      ))}
      <Group position="right" spacing="xs">
        <Button variant="filled" type="submit">
          {' '}
          {loader ? (
            <LoadingOverlay
              visible
              overlayBlur={2}
              loaderProps={{ size: 'xs' }}
            />
          ) : (
            'Update'
          )}
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
  const { isSmall, isMedium } = useResponsive();
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
    if (pathname.includes('/client/community')) {
      setSelectedPath('/client/community');
    }
  }, [pathname]);

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
      header={
        isSmall && (
          <Header height={70} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
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
        )
      }
      navbar={
        // eslint-disable-next-line no-nested-ternary
        <Navbar
          width={{ base: isSmall ? (opened ? 80 : 0) : 80 }}
          p="md"
          hiddenbreakpoint="sm"
          hidden={!opened}
          style={{ display: isMedium && 'flex' }}
        >
          <Center>Logo</Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavbarLink
                icon={IconUserCircle}
                label="Profile"
                onClick={() => setOpenForm(true)}
              />
              <NavbarLink
                icon={IconLogout}
                label="Logout"
                onClick={handleLogout}
              />
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Modal opened={openForm} setopened={setOpenForm} title="Profile">
        <ProfileContent />
      </Modal>
      {pathname === '/client/notification' ? (
        <Box p="lg" className={classes.childrenRoot}>
          {children}
        </Box>
      ) : (
        <Paper shadow="xs" p="lg" radius="md" className={classes.childrenRoot}>
          {children}
        </Paper>
      )}
    </AppShell>
  );
}

ClientNavigation.propTypes = {
  children: PropTypes.element.isRequired,
};

ClientNavigation.defaultProps = {};
export default ClientNavigation;
