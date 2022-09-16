import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Typography/Title';

function Index(props) {
  const { title } = props;
  return (
    <div>
      <Title order={1}>{title}</Title>
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
