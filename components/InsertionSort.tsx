import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
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

const Index = styled.div<{ index: string; translateXValue: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 20px;
  background-color: blue;
  color: white;
  /* transform: translateX(40px); */
  ${props =>
    props.index === 'i'
      ? css`
          background-color: yellowgreen;
          color: black;
        `
      : css`
          background-color: blue;
          color: white;
        `}
`;

const RunningState = styled.div`
  font-size: 24px;
  color: black;
  font-weight: 600;
`;

// end of styled components

const SIZE = 30;
const getArr = () => shuffle(range(1, SIZE + 1));

const swap = (arr: number[], a: number, b: number) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

type TSetArr = (value: React.SetStateAction<number[]>) => any;
type TSetPosition = React.Dispatch<React.SetStateAction<number>>;

const delaySetArr = (arr: number[], setArr: TSetArr) => {
  return new Promise(resolve => {
    setArr([...arr]);
    setTimeout(() => resolve(resolve), 100);
  });
};

const sort = async (
  arr: number[],
  setArr: TSetArr,
  setPositionI: TSetPosition,
  setPositionJ: TSetPosition
) => {
  // https://en.wikipedia.org/wiki/Insertion_sort

  let i = 1;
  while (i < arr.length) {
    let j = i;
    setPositionI(j);
    while (j > 0 && arr[j - 1] > arr[j]) {
      // swap A[j] and A[j-1]
      swap(arr, j, j - 1);
      await delaySetArr(arr, setArr);
      j = j - 1;
      setPositionJ(j);
    }
    i = i + 1;
    setPositionI(i);
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
  const [positionI, setPositionI] = useState<number>(1);
  const [positionJ, setPositionJ] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleShuffle = () => {
    setArr(getArr());
  };

  const handleSort = async (arr: number[]) => {
    setIsRunning(true);
    const sorted = [...arr];
    try {
      await sort(sorted, setArr, setPositionI, setPositionJ);
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
      <Index
        index={'i'}
        style={{ transform: `translateX(${positionI * 20}px)` }}
        translateXValue={positionI}
      >
        i
      </Index>
      <Index
        index={'j'}
        style={{ transform: `translateX(${positionJ * 20}px)` }}
        translateXValue={positionJ}
      >
        j
      </Index>

      <ButtonBox>
        {!isRunning && <Button onClick={handleShuffle}>shuffle</Button>}
        {!isRunning && <Button onClick={() => handleSort(arr)}>sort</Button>}
        {isRunning && <RunningState>Running...</RunningState>}
      </ButtonBox>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
