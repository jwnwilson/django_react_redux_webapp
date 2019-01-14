import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../style/core.css';
import './Blog.css';

const List = (props) => {
  const blogElements = props.blogs.map(blog => <h1>{blog.title}</h1>);
  return (
    <React.Fragment>
      {blogElements}
    </React.Fragment>
  );
};

List.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    blogs: state.blogs,
  }),
)(List);
