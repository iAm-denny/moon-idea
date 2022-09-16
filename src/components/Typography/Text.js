import React from 'react';
import PropTypes from 'prop-types';
import { Text as TextManTine } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Text(props) {
  const { children, size = 'md', mobilesize } = props;
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextManTine {...props} size={isMobile ? mobilesize || 'sm' : size}>
      {children}
    </TextManTine>
  );
}

Text.propTypes = {
  children: PropTypes.string,
  mobilesize: PropTypes.string,
  size: PropTypes.string.isRequired,
};

Text.defaultProps = {
  children: '',
  mobilesize: '',
};

export default Text;
