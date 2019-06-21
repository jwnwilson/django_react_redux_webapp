import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApiBlogData } from '../../actions';
import PageList from '../utils/paginate';

import '../../style/core.css';
import './BlogList.css';

const BlogListItems = (props) => {
  const blogs = props.blogs.map((blog, index) => (
    <div key={index} className="row mb-5 mt-5">
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
    <div className="blogListContainer">
      {blogs}
    </div>
  );
};

class BlogList extends React.Component {
  constructor(props) {
    super(props);

    this.perPage = 5;
    this.loadBlogData = this.loadBlogData.bind(this);
  }

  componentDidMount() {
    this.loadBlogData();
  }

  loadBlogData(offset) {
    this.props.getApiBlogData(offset, this.perPage);
  }

  render() {
    const noData = JSON.stringify(this.props.blogs) === '{}';
    const pageCount = noData ? 1 : Math.ceil(this.props.blogs.meta.total_count / this.perPage);
    const blogs = noData ? [] : this.props.blogs.items;

    return (
      <section className="wrap-image bg-primary text-white mb-0 mt-5" id="blog-list">
        <div className="container">
          <h2>Blog Posts</h2>
          <hr />
          <PageList
            pageCount={pageCount}
            perPage={this.perPage}
            updateList={this.loadBlogData}
          >
            <BlogListItems
              blogs={blogs}
            />
          </PageList>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  getApiBlogData,
};

BlogList.propTypes = {
  blogs: PropTypes.object.isRequired,
  getApiBlogData: PropTypes.func.isRequired,
};

BlogListItems.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    blogs: state.blogs,
  }),
  mapDispatchToProps,
)(BlogList);
