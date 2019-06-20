import React from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import Disqus from 'disqus-react';

import '../../style/core.css';
import './Blog.css';

const Blog = (props) => {
  const { module } = props.data;
  const disqusShortname = 'noel-wilson';
  const disqusConfig = {
    url: props.page.meta.html_url,
    identifier: props.page.id,
    title: props.page.title,
  };

  // Build blog posts
  const blogData = JSON.parse(module.body);
  const blogPost = blogData.map((block, index) => {
    let blogElement = null;
    switch (block.type) {
      case 'heading':
        blogElement = (
          <React.Fragment key={index}>
            <h1>
              {block.value}
            </h1>
            <hr />
          </React.Fragment>
        );
        break;
      case 'paragraph':
        blogElement = (
          <React.Fragment key={index}>
            {renderHTML(block.value)}
          </React.Fragment>
        );
        break;
      case 'image':
        blogElement = (
          <React.Fragment key={index}>
            <img
              className="col-12"
              src={block.value.large.src}
              alt={block.value.large.alt}
            />
          </React.Fragment>
        );
        break;
      case 'video':
        blogElement = (
          <React.Fragment key={index}>
            <iframe className="col-12 mt-1 mb-1" style={{ border: 'none' }} title="Video" src={block.value} width="100%" />
          </React.Fragment>
        );
        break;
      default:
    }
    return blogElement;
  });

  return (
    <section className="wrap-image bg-primary text-white mb-0 mt-5" id="about">
      <div className="container">
        <div className="row">
          <div className="col">
            <a href={props.page.meta.parent.meta.html_url}>
              <i className="fa fa-fw fa-arrow-left text-white left mt-1 mr-1" />
              <h3 className="text-white">Blog List</h3>
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        {blogPost}
        <div className="clear-fix col-xs-12">
          <hr />
        </div>
        <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
            Comments
        </Disqus.CommentCount>
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    </section>
  );
};

Blog.propTypes = {
  page: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(
  null,
  null,
)(Blog);
