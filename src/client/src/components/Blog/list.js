import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../style/core.css';
import './Blog.css';

const List = (props) => {
  const blogElements = props.blogs.map(blog => (
    <div className="row mb-5 mt-5">
      <div className="col-sm-12 col-md-6">
        <a href={blog.meta.html_url}>
          <img className="col-12" src={blog.listing_image_url.url} alt="" />
        </a>
      </div>
      <div className="col-sm-12 col-md-6">
        <a href={blog.meta.html_url}>
          <h2 className="text-white">{blog.title}</h2>
        </a>
        <hr />
        <p>{blog.description}</p>
      </div>
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
