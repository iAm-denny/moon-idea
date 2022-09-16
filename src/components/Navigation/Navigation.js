/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-multi-spaces */
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  createStyles, Header, Container, Group, Burger, Paper, Transition, Text, Button, TextInput, Space, PasswordInput, Popover, Box, Progress,
} from '@mantine/core';
import * as Yup from 'yup';
import { useDisclosure } from '@mantine/hooks';
import { useForm, yupResolver } from '@mantine/form';
import {
  IconCircleCheck, IconCircleX, IconX, IconCheck,
} from '@tabler/icons';
import Modal from '../Modal/Modal';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  navItemsMobile: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

}));

const registerInputItems = [
  {
    label: 'Full name',
    name: 'full_name',
  },
  {
    label: 'Email',
    name: 'email',
  },
  {
    label: 'Password',
    name: 'password',
  },
  {
    label: 'Confirm password',
    name: 'confirm_password',
  },
];

let strength;
const requirements = [
  { regex: /[0-9]/, label: 'Includes number' },
  { regex: /[a-z]/, label: 'Includes lowercase letter' },
  { regex: /[A-Z]/, label: 'Includes uppercase letter' },
  { regex: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;
  requirements.forEach((requirement) => {
    if (!requirement.regex.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const registerSchema = Yup.object().shape({
  full_name: Yup.string().min(2, 'Name should have at least 2 letters'),
  email: Yup.string().email('Invalid email').required('Required field.'),
  // password: strength !== 100 && "Password doesn't match the requirements.",
  password: Yup.string().required('Required field.').test('pwd-check-strength', 'Password does not meet the requirements.', (value) => getStrength(value) === 100),
  confirm_password: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords do not match.'),
});

// eslint-disable-next-line react/prop-types
function RegisterContent({ setSwitchForm }) {
  const focusFirstInput = useRef(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const formRegister = useForm({
    validate: yupResolver(registerSchema),
    validateInputOnChange: true,
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    focusFirstInput.current?.focus();
  }, []);

  // ******* Start measure Password legnth
  // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
  function PasswordRequirement({ meets, label }) {
    return (
      <Text
        color={meets ? 'teal' : 'red'}
        sx={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
      >
        {meets ? <IconCheck size={14} /> : <IconX size={14} />}
        {' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  const checks = requirements.map((requirement, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.regex.test(formRegister.values.password)} />
  ));

  strength = getStrength(formRegister.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
  //  End measure Password legnth *******

  return (
    <form onSubmit={formRegister.onSubmit((values) => console.log(values))} autoComplete="chrome-off">
      {
        registerInputItems.map((item) => (
          <div key={item.name}>
            {
            item.name === 'password' ? (
              <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
                <Popover.Target>
                  <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                  >
                    <PasswordInput
                      withAsterisk
                      label={item.label}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...formRegister.getInputProps(item.name)}
                      autoComplete="new-password"
                    />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                  <PasswordRequirement label="Includes at least 6 characters" meets={formRegister.values.password.length > 5} />
                  {checks}
                </Popover.Dropdown>
              </Popover>
            ) : item.name === 'confirm_password' ? (
              <PasswordInput
                label="Confirm password"
                autoComplete="new-password"
                withAsterisk
                  // eslint-disable-next-line react/jsx-props-no-spreading
                {...formRegister.getInputProps('confirm_password')}
              />
            )
              : (
                <TextInput
                  label={item.label}
                  size="sm"
                  withAsterisk
                  ref={item.name === 'full_name' ? focusFirstInput : null}
                  autoComplete="new-password"
                  rightSection={item.name === 'email'
                    ? formRegister.values.email === '' ? <IconCircleCheck color="grey" size={18} /> : formRegister.errors?.email ? <IconCircleX color="red" size={18} />
                      : <IconCircleCheck color="green" size={18} /> : null}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...formRegister.getInputProps(item.name)}
                />
              )
          }
            <Space h="md" />
          </div>
        ))
      }
      <Group position="apart" spacing="xs">
        <Text size="sm" color="gray" style={{ cursor: 'pointer' }} onClick={() => setSwitchForm('login_form')}>Have an account? Login</Text>
        <Button variant="filled" type="submit"> Register</Button>
      </Group>
    </form>

  );
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field.'),
  password: Yup
    .string()
    .required('Required field.'),
});

// eslint-disable-next-line react/prop-types
function LoginContent({ setSwitchForm }) {
  const focusFirstInput = useRef(null);
  const formLogin = useForm({
    validate: yupResolver(loginSchema),
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    focusFirstInput.current?.focus();
  }, []);

  return (
    <form onSubmit={formLogin.onSubmit((values) => console.log(values))}>
      <TextInput
        label="Email"
        size="sm"
        withAsterisk
        ref={focusFirstInput}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formLogin.getInputProps('email')}
      />

      <Space h="md" />
      <PasswordInput
        label="Confirm password"
                  // eslint-disable-next-line react/jsx-props-no-spreading
        {...formLogin.getInputProps('password')}
      />
      <Space h="md" />
      <Group position="apart" spacing="xs">
        <Text size="sm" color="gray" style={{ cursor: 'pointer' }} onClick={() => setSwitchForm('register_form')}>Don&apos;t have an account? Register</Text>
        <Button variant="filled" type="submit"> Register</Button>
      </Group>
    </form>

  );
}
const items = [
  {
    label: 'Login',
    value: 'login',
  },
  {
    label: 'Get Started',
    value: 'get_started',
  },
];

function HeaderResponsive(props) {
  const { children } = props;
  const [openForm, setOpenForm] = useState(false);
  const [switchForm, setSwitchForm] = useState('login_form');
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const navItems = items && items.map((item) => {
    if (item.value === 'login') {
      return (
        <Button variant="transparent" color="dark" onClick={() => setOpenForm(true)} key={item.label}>
          {item.label}
        </Button>
      );
    }
    return (
      <Button radius="md" key={item.label} onClick={() => setOpenForm(true)}>
        {item.label}
      </Button>
    );
  });

  const navItemsMobile = items && items.map((item) => {
    if (item.value === 'login') {
      return (
        // eslint-disable-next-line max-len
        <Button variant="subtle" onClick={() => setOpenForm(true)} key={item.label}>
          {item.label}
        </Button>
      );
    }
    return (
      <Button radius="md" key={item.label} onClick={() => setOpenForm(true)}>
        {item.label}
      </Button>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        {/* <MantineLogo size={28} /> */}
        <Text>Logo</Text>
        <Group spacing={25} className={classes.links}>
          {navItems}
        </Group>
        <Modal opened={openForm} closefun={() => setSwitchForm('login_form')} setopened={setOpenForm} title={switchForm === 'login_form' ? 'Login' : 'Create an account'}>
          {
            switchForm === 'login_form' ? <LoginContent setSwitchForm={setSwitchForm} /> : <RegisterContent setSwitchForm={setSwitchForm} />
          }
        </Modal>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="scale-y" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.navItemsMobile} withBorder style={styles}>
              {navItemsMobile}
            </Paper>
          )}
        </Transition>
      </Container>
      {children}
    </Header>
  );
}
HeaderResponsive.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  children: PropTypes.any,
};
export default HeaderResponsive;
