import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

class PageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.props.updateList(offset);
    });
  };

  render() {
    return (
      <div className="commentBox">
        <div id="project-comments" className="commentList">
          <ul>{..this.props.children}</ul>
        </div>
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
  pageCount: PropTypes.number.isRequired
};

export default PageList;
