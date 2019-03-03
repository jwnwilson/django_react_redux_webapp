import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApiBlogData } from '../../actions';

import '../../style/core.css';
import './BlogList.css';

class BlogList extends React.Component {
  componentDidMount() {
    this.props.getApiBlogData();
  }

  render() {
    const blogElements = this.props.blogs.map(blog => (
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
      <section className="wrap-image bg-primary text-white mb-0 mt-5" id="blog-list">
        <div className="container">
          <h2>Blog Posts</h2>
          {blogElements}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  getApiBlogData,
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  getApiBlogData: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    blogs: state.blogs,
  }),
  mapDispatchToProps,
)(BlogList);
