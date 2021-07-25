import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { range, shuffle } from 'lodash';

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

const getArr = () => shuffle(range(1, 11));

const swap = (arr: number[], a: number, b: number) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const sort = (arr: number[]) => {
  // https://en.wikipedia.org/wiki/Insertion_sort
  let i = 1;
  while (i < arr.length) {
    setTimeout(function () {}, 500);
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // swap A[j] and A[j-1]
      swap(arr, j, j - 1);
      j = j - 1;
    }
    i = i + 1;
  }
};

const InsertionSort = () => {
  const [arr, setArr] = useState<number[]>([]);

  const handleShuffle = () => {
    setArr(prev => {
      // return shuffle(prev);
      console.log(prev);
      return getArr();
    });
  };

  const handleSort = (arr: number[]) => {
    const sorted = [...arr];
    sort(sorted);
    setArr(sorted);
  };

  useEffect(() => {
    setArr(getArr());
  }, []);

  // useEffect(() => {}, [arr]);

  return (
    <InsertionSortContainer>
      <Board>{arr?.join(',')}</Board>

      <ButtonBox>
        <Button onClick={handleShuffle}>shuffle</Button>
        <Button onClick={() => handleSort(arr)}>sort</Button>
      </ButtonBox>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
