import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './paginate.css';

class PageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(data) {
    const { selected } = data;
    const offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset }, () => {
      this.props.updateList(this.state.offset);
    });
  }

  render() {
    return (
      <div className="blog-posts">
        <div id="blog" className="blog-list">
          <ul>{this.props.children}</ul>
        </div>
        <hr />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

PageList.propTypes = {
  updateList: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageList;
