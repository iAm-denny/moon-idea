import React from 'react';
import PropTypes from 'prop-types';
import { Text as TextManTine } from '@mantine/core';
import useResponsive from '../../utils/responsive';

function Text(props) {
  const { children, size = 'md', mobilesize = 'sm' } = props;
  const { isSmall } = useResponsive();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextManTine {...props} size={isSmall ? mobilesize || 'sm' : size}>
      {children}
    </TextManTine>
  );
}

Text.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  mobilesize: PropTypes.string,
  size: PropTypes.string.isRequired,
};

Text.defaultProps = {
  children: '',
  mobilesize: 'sm',
};

export default Text;
