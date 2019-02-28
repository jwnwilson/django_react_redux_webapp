import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../style/core.css';
import './Blog.css';

const List = (props) => {
  const blogElements = props.blogs.map(blog => (
    <div className="row">
      <a className="text-white" href={blog.meta.html_url}>
        <img src={blog.listing_image_url.url} alt="" />
        {blog.title}
      </a>
    </div>
  ));
  return (
    <div className="container">
      <h2>Blog Posts</h2>
      {blogElements}
    </div>
  );
};

List.propTypes = {
  blogs: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    blogs: state.blogs,
  }),
)(List);
