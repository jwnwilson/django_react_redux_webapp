import React from 'react';
import PropTypes from 'prop-types';

import '../../style/core.css';
import './Blog.css';

const List = (props) => {
  const { module } = props.data; // eslint-disable-line no-unused-vars

  return (
    <section className="wrap-image bg-primary text-white mb-0 mt-5" />
  );
};

List.propTypes = {
  data: PropTypes.object.isRequired,
};

export default List;
