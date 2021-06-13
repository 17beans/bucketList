// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const BucketList = (props) => {
  const bucket_list = useSelector((state) => state.bucket.list);
  console.log(bucket_list);

  return (
    <ListStyle>
      {bucket_list.map((list, index) => {
        return (
          <ItemStyle
            className="list_item"
            key={index}
            iscompleted={list.completed}
            onClick={() => {
              props.history.push("/detail/" + index);
            }}
          >
            {list.text}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  font-weight: 600;
  color: ${(props) => (props.iscompleted ? "#fff" : "#212121")};
  background-color: ${(props) => (props.iscompleted ? "#673ab7" : "aliceblue")};
`;

export default BucketList;
