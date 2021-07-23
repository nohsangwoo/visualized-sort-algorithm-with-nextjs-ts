import React from 'react';
import styled from 'styled-components';

const InsertionSortContainer = styled.div``;

const Board = styled.div`
  width: 100%;
  height: 200px;
  background-color: green;
`;

const ButtonBox = styled.div``;
const Button = styled.button`
  width: 100%;
  height: 60px;
  background-color: gray;
`;

const InsertionSort = () => {
  return (
    <InsertionSortContainer>
      <Board>board</Board>

      <ButtonBox>
        <Button>shuffle</Button>
        <Button>sort</Button>
      </ButtonBox>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
