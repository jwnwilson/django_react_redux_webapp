import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(function(comment, index) {
      return <div key={index}>{comment.comment}</div>;
    });

    return (
      
    );
  }
}

class PageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  loadCommentsFromServer() {
    // $.ajax({
    //   url: this.props.url,
    //   data: { limit: this.props.perPage, offset: this.state.offset },
    //   dataType: 'json',
    //   type: 'GET',

    //   success: data => {
    //     this.setState({
    //       data: data.comments,
    //       pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
    //     });
    //   },

    //   error: (xhr, status, err) => {
    //     console.error(this.props.url, status, err.toString()); // eslint-disable-line
    //   },
    // });
  }

  componentDidMount() {
    this.updateList();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.updateList(offset);
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
          pageCount={this.state.pageCount}
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
};

export default PageList;
