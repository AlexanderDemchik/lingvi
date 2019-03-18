import React from "react";

class InfiniteScroll extends React.Component {

  componentWillMount() {
    this.onScroll();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll)
  }

  componentDidUpdate() {
    this.onScroll();
  }

  onScroll = () => {
    const {hasMore, isLoading, loadMore, threshold} = this.props;

    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (isLoading || !hasMore) return;

    // Checks that the page has scrolled to the bottom
    if ((window.innerHeight + document.documentElement.scrollTop) > (document.documentElement.offsetHeight - threshold)) {
      loadMore();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll)
  }

  render () {
    return (
      this.props.children
    )
  }
}

export default InfiniteScroll;
