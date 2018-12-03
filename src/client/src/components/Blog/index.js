import React from 'react';
// import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import '../../style/core.css';
import './Blog.css';

const Blog = (props) => {
  const { module } = props.data;

  // Build blog post
  const blogData = JSON.parse(module.body);
  const blogPost = blogData.map((paragraph, index) => {
    return null;
    // const paras = (
    //   <ReactMarkdown source={paragraph.text} />
    // );
    // return (
    //   <div className="clear-fix">
    //     <div key={index} className="pull-left col-12 col-md-5 mb-3">
    //       <img
    //             className="img-responsive rounded"
    //             src={img}
    //             alt={module.title}
    //             width="100%"
    //             style={{ width: '100%' }}
    //           />
    //     </div>
    //     {paras}
    //   </div>
    // );
  });

  return (
    <section className="wrap-image bg-primary text-white mb-0 mt-5" id="about">
      <div className="container">
        <div className="pull-left col-12 col-md-7 mt-3">
          <h2>
            {module.title}
          </h2>
          <hr />
        </div>
        {blogPost}
        <div className="clear-fix col-xs-12">
          <hr />
        </div>
      </div>
    </section>
  );
};

Blog.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Blog;
