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
  transform: rotateX(180deg);
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

const SIZE = 30;
const getArr = () => shuffle(range(1, SIZE + 1));

const swap = (arr: number[], a: number, b: number) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const delaySetArr = (
  arr: number[],
  setArr: (value: React.SetStateAction<number[]>) => any
) => {
  return new Promise(resolve => {
    setArr([...arr]);
    setTimeout(() => resolve(resolve), 10);
  });
};

const sort = async (
  arr: number[],
  setArr: (value: React.SetStateAction<number[]>) => any
) => {
  // https://en.wikipedia.org/wiki/Insertion_sort
  let i = 1;
  while (i < arr.length) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // swap A[j] and A[j-1]
      swap(arr, j, j - 1);
      await delaySetArr(arr, setArr);
      j = j - 1;
    }
    i = i + 1;
  }
};

const Bar = styled.div<{
  heightValue: number;
  widthValue: number;
  transformXValue: number;
}>`
  position: absolute;
  width: ${props => `${props.widthValue - 1}px`};
  height: ${props => `${props.heightValue}px`};
  transform: translateX(${props => `${props.transformXValue}px`});
  background-color: black;
`;

type Props = {
  arr: number[];
};

// 숫자 배열을 막대 모양으로 렌더링해주는 함수
const BarPresent = ({ arr }: Props) => {
  return (
    <>
      {arr.map((value: number, index: number) => {
        const heightValue = value * 10;
        const widthValue = 20;
        const transformXValue = index * widthValue;
        return (
          <Bar
            key={index}
            heightValue={heightValue}
            widthValue={widthValue}
            transformXValue={transformXValue}
          />
        );
      })}
    </>
  );
};

// main
const InsertionSort = (): JSX.Element => {
  const [arr, setArr] = useState<number[]>([]);

  const handleShuffle = () => {
    setArr(getArr());
  };

  const handleSort = async (arr: number[]) => {
    const sorted = [...arr];
    try {
      await sort(sorted, setArr);
      alert('Sorted!');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setArr(getArr());
  }, []);

  return (
    <InsertionSortContainer>
      <Board>
        <BarPresent arr={arr} />
      </Board>

      <ButtonBox>
        <Button onClick={handleShuffle}>shuffle</Button>
        <Button onClick={() => handleSort(arr)}>sort</Button>
      </ButtonBox>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
