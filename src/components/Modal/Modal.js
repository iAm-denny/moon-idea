import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalMantine, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    '.mantine-Modal-modal': {
      border: `2px solid ${theme.other.primaryColorCode}`,
      '.mantine-Modal-close ': {
        position: 'absolute',
        top: 10,
        right: 5,
      },
    },
    '.mantine-Modal-title': {
      color: theme.other.primaryColorCode,
      textAlign: 'center',
      width: '100%',
    },
  },
}));

function Modal(props) {
  const { classes } = useStyles();
  const {
    opened,
    setopened,
    children,
    title = '',
    size = 'lg',
    closefun = () => {},
    ...others
  } = props;

  return (
    <ModalMantine
      opened={opened}
      onClose={() => {
        setopened(false);
        closefun();
      }}
      title={title}
      size={size}
      className={classes.root}
      radius="md"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...others}
    >
      {children}
    </ModalMantine>
  );
}
Modal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  opened: PropTypes.bool.isRequired,
  setopened: PropTypes.func.isRequired,
  closefun: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
};

Modal.defaultProps = {
  children: '',
  title: '',
  size: 'lg',
  closefun: () => {},
};
export default Modal;
