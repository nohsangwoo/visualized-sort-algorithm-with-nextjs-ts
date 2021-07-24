import React from 'react';
import styled from 'styled-components';

const InsertionSortContainer = styled.div``;

const Board = styled.div`
  width: 100%;
  height: 200px;
  background-color: green;
  color: white;
  font-size: 40px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: gray;
`;
const Button = styled.button`
  font-size: 40px;
`;

const InsertionSort = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <InsertionSortContainer>
      <Board>{arr.join(',')}</Board>

      <ButtonBox>
        <Button>shuffle</Button>
        <Button>sort</Button>
      </ButtonBox>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
