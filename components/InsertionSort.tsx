import React from 'react';
import styled from 'styled-components';

const InsertionSortContainer = styled.div``;

const Board = styled.div`
  width: 100%;
  height: 200px;
  background-color: green;
`;

const InsertionSort = () => {
  return (
    <InsertionSortContainer>
      <Board>board</Board>

      <button>shuffle</button>
      <button>sort</button>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
