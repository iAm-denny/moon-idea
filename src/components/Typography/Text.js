import React from 'react';
import PropTypes from 'prop-types';
import { Text as TextManTine } from '@mantine/core';
import useResponsive from '../../utils/responsive';

function Text(props) {
  const {
    children,
    size = 'md',
    mobilesize = 'sm',
    dangerHTML = false,
    text = '',
  } = props;
  const { isSmall } = useResponsive();
  if (dangerHTML) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextManTine {...props} size={isSmall ? mobilesize || 'sm' : size || 'sm'}>
      {children}
    </TextManTine>
  );
}

Text.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  mobilesize: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  text: PropTypes.any,
  size: PropTypes.string.isRequired,
  dangerHTML: PropTypes.bool,
};

Text.defaultProps = {
  children: '',
  mobilesize: 'sm',
  dangerHTML: false,
  text: '',
};

export default Text;
