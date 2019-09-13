import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
export class PaginationFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  pageItem = (page) => {
    if (page >= 1) {
      return (<PaginationItem active={page == this.props.currentPage} key={page}>
        <PaginationLink style={{ cursor: "pointer" }} onClick={() => this.props.setPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>);
    }
    return null;
  };
  pageList = (p) => {
    if (p === 2) {
      return [1, 2, 3, 4, 5];
    }
    if (p === 1) {
      return [1, 2, 3, 4, 5];
    }
    return [p - 2, p - 1, p, p + 1, p + 2];
  };
  render() {
    console.log(this.props);
    return (<Pagination aria-label="Page navigation example" className="float-right">
      <PaginationItem>
        <PaginationLink first style={this.props.currentPage > 1 ? { cursor: "pointer" } : null} disabled={this.props.currentPage == 1} onClick={() => this.props.setPage(1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous style={this.props.currentPage > 1 ? { cursor: "pointer" } : null} disabled={this.props.currentPage == 1} onClick={() => this.props.changePage(this.props.currentPage, -1)} />
      </PaginationItem>
      {this.pageList(this.props.currentPage).map((p) => this.pageItem(p))}
      <PaginationItem>
        <PaginationLink next style={{ cursor: "pointer" }} onClick={() => this.props.changePage(this.props.currentPage, 1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last style={{ cursor: "pointer" }} />
      </PaginationItem>
    </Pagination>);
  }
}
