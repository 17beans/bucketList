import React from "react";
import BucketList from "./BucketList";
import styled from "styled-components";
import { Route, Switch } from "react-router";
import Detail from "./Detail";
import { withRouter } from "react-router";
import NotFound from "./NotFound";
import { connect } from "react-redux";
import {
  loadBucket,
  createBucket,
  loadBucketFB,
  addBucketFB,
} from "./redux/modules/bucket";
import Progress from "./Progress";
import { firestore } from "./firebase";
import Spinner from "./Spinner";

const mapStateToProps = (state) => {
  return { bucket_list: state.bucket.list, is_loaded: state.bucket.is_loaded };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(loadBucketFB());
    },
    create: (bucket) => {
      dispatch(addBucketFB(bucket));
    },
  };
};

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
  constructor(props) {
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {};
    // ref는 이렇게 선언합니다!
    this.text = React.createRef();
  }

  componentDidMount() {
    this.props.load();
  }

  addBucketList = () => {
    const new_item = this.text.current.value;
    this.props.create(new_item);
  };

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    return !this.props.is_loaded ? (
      <Spinner />
    ) : (
      <div className="App">
        <Container>
          <Title>내 버킷리스트</Title>
          <Progress />
          <Line />
          {/* 컴포넌트를 넣어줍니다. */}
          {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <BucketList
                  list={this.props.bucket_list}
                  history={this.props.history}
                />
              )}
            />
            <Route path="/detail/:index" component={Detail} />
            <Route render={() => <NotFound history={this.props.history} />} />
          </Switch>
        </Container>
        {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
        <Input>
          <input type="text" ref={this.text} />
          <button onClick={this.addBucketList}>추가하기</button>
        </Input>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          위로가기
        </button>
      </div>
    );
  }
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & * {
    padding: 5px;
  }
  & input {
    width: 70%;
    &:focus {
      border: 4px solid #673ab7;
    }
  }
  & button {
    width: 25%;
    color: #fff;
    background-color: #874cef;
    border: 1px solid #874cef;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
