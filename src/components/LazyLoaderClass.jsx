import React, { Component, createRef } from "react";
import "./LazyLoader.css";

export default class LazyLoaderClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      page: 1,
    };
    this.listRef = createRef();
  }

  componentDidMount() {
    this.fetchData();
    window.addEventListener("scroll", this.handleScrollClass);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrollClass);
  }

  fetchData = async () => {
    this.setState({
      loading: true,
    });
    const { page } = this.state;
    try {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
      );
      if (!response.ok) throw new Error("Network error");
      let data = await response.json();
      this.setState((prevState) => ({
        data: [...prevState.data, ...data],
        loading: false,
      }));
    } catch (error) {
      console.error("Error in fetching data: ", error);
      this.setState({ loading: false });
    }
  };

  handleScrollClass = () => {
    const { loading } = this.state;
    const list = this.listRef.current;

    if (!loading && list) {
      const lastItem = list.lastElementChild;
      const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
      const pageOffset = window.scrollY + window.innerHeight;
      if (pageOffset > lastItemOffset) {
        this.setState(
          (prevState) => ({ page: prevState.page + 1 }),
          () => this.fetchData()
        );
      }
    }

    // if (
    //   !loading &&
    //   window.innerHeight + window.scrollY >= document.body.offsetHeight
    // ) {
    //   this.setState(
    //     (prevState) => ({ page: prevState.page + 1 }),
    //     () => this.fetchData()
    //   );
    // }
  };

  render() {
    const { data, loading } = this.state;
    return (
      <div ref={this.listRef} className="wrapper">
        {data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    );
  }
}
