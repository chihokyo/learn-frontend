import React, { PureComponent } from 'react';
import {
  inAction,
  addAction,
  getBannersAction,
  getRecommendsAction,
} from '../store/actionCreators';

// import { connect } from '../utils/connect';
import { connect } from 'react-redux'; // 用redux的 不用自己写的

import axios from 'axios';

class Home extends PureComponent {
  componentDidMount() {
    axios({
      url: 'http://123.207.32.32:8000/home/multidata',
    }).then((res) => {
      //   const data = res.data.data;
      const { banner, recommend } = res.data.data;
      this.props.getBanners(banner.list);
      this.props.getRecommends(recommend.list);
    });
  }

  render() {
    const { counter } = this.props;
    return (
      <>
        <h1>Home class component</h1>
        <h2>count: {counter}</h2>
        <button onClick={(e) => this.props.increment()}>+1</button>
        <button onClick={(e) => this.props.addNumber(5)}>+5</button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(inAction());
    },
    addNumber: (num) => {
      dispatch(addAction(num));
    },
    getBanners: (banners) => {
      dispatch(getBannersAction(banners));
    },
    getRecommends: (recommends) => {
      dispatch(getRecommendsAction(recommends));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
