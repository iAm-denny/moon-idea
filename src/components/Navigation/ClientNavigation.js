/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line max-len
  AppShell, Burger, Navbar, createStyles, Center, Stack, Tooltip, UnstyledButton, Header, MediaQuery, Paper,
} from '@mantine/core';
import {
  IconFolder, IconUsers, IconLogout,
  IconUserCircle,
} from '@tabler/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useResponsive from '../../utils/responsive';

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

function ClientNavigation(props) {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isSmall } = useResponsive();
  const [selectedPath, setSelectedPath] = useState(pathname);
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

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
        <Navbar width={{ base: isSmall ? opened ? '100%' : 0 : 80 }} p="md" hiddenbreakpoint="sm" hidden={!opened}>
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
              <NavbarLink icon={IconUserCircle} label="Profile" />
              <NavbarLink icon={IconLogout} label="Logout" />
            </Stack>
          </Navbar.Section>
        </Navbar>
      )}
    >
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
