import React from 'react';
import PropTypes from 'prop-types';
import { Title as TitleMantine } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Title(props) {
  const { children, order = 1, mobileorder } = props;
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <TitleMantine {...props} order={isMobile ? mobileorder || 6 : order}>
      {children}
    </TitleMantine>
  );
}
Title.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  children: PropTypes.any,
  // eslint-disable-next-line react/require-default-props
  mobileorder: PropTypes.number,
  order: PropTypes.number.isRequired,
};

Title.defaultProps = {
//   mobileorder: ,
};
export default Title;
