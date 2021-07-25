import React, { useState, useEffect, memo } from 'react';
import styled, { css } from 'styled-components';
import { range, shuffle } from 'lodash';

const InsertionSortContainer = styled.div``;

const BoardWrapper = styled.div`
  width: 100%;
  height: ${`${31 * 10}px`};
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

const DURATION = 50;
const SIZE = 30;
const getArr = () => shuffle(range(1, SIZE + 1));
type TSetState = React.Dispatch<React.SetStateAction<any>>;

const swap = (arr: number[], a: number, b: number) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const delayAndSetState = (value: any, setValue: TSetState) => {
  return new Promise(resolve => {
    setValue(value);
    setTimeout(() => resolve(resolve), DURATION);
  });
};

const sort = async (
  arr: number[],
  setArr: TSetState,
  setIdxI: TSetState,
  setIdxJ: TSetState
) => {
  // https://en.wikipedia.org/wiki/Insertion_sort

  let i = 1;
  while (i < arr.length) {
    let j = i;
    await delayAndSetState(j, setIdxJ);
    while (j > 0 && arr[j - 1] > arr[j]) {
      // swap A[j] and A[j-1]
      swap(arr, j, j - 1);
      await delayAndSetState([...arr], setArr);
      j = j - 1;
      await delayAndSetState(j, setIdxJ);
    }
    i = i + 1;
    await delayAndSetState(i, setIdxI);
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

type PropsBarPresent = {
  arr: number[];
};

// 이전props와 현재props가 같다면 리렌더링 하지 않겠다는 의미
const areArrEqual = (
  prevProps: PropsBarPresent,
  currentProps: PropsBarPresent
) => {
  return prevProps.arr === currentProps.arr;
};

// 숫자 배열을 막대 모양으로 렌더링해주는 component
const BarPresent = ({ arr }: PropsBarPresent) => {
  return (
    <BoardWrapper>
      {arr.map((value: number, index: number) => {
        console.log('board rendered');

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
    </BoardWrapper>
  );
};

const MemorizedBarPresent = memo(BarPresent, areArrEqual);

// main
const InsertionSort = (): JSX.Element => {
  const [arr, setArr] = useState<number[]>([]);
  const [idxI, setIdxI] = useState<number>(1);
  const [idxJ, setIdxJ] = useState<number>(1);
  const [duration, setDuration] = useState<number>(400);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [onOff, setOnOff] = useState<boolean>(false);

  const handleShuffle = () => {
    setIdxI(1);
    setIdxJ(1);
    setArr(getArr());
  };

  const handleSort = async (arr: number[]) => {
    setIsRunning(true);
    try {
      await sort(arr, setArr, setIdxI, setIdxJ);
      setIsRunning(false);
      alert('Sorted!');
    } catch (e) {
      console.log(e.message);
    }
  };

  const onOffFunction = () => {
    setOnOff(prev => !prev);
  };

  useEffect(() => {
    setArr(getArr());
  }, []);

  return (
    <InsertionSortContainer>
      <MemorizedBarPresent arr={arr} />

      <Index
        index={'i'}
        style={{ transform: `translateX(${idxI * 20}px)` }}
        translateXValue={idxI}
      >
        i
      </Index>
      <Index
        index={'j'}
        style={{ transform: `translateX(${idxJ * 20}px)` }}
        translateXValue={idxJ}
      >
        j
      </Index>

      <ButtonBox>
        <Button onClick={onOffFunction}>{onOff ? 'on' : 'off'}</Button>
        {!isRunning && <Button onClick={handleShuffle}>shuffle</Button>}
        {!isRunning && <Button onClick={() => handleSort(arr)}>sort</Button>}
        {isRunning && <RunningState>Running...</RunningState>}
      </ButtonBox>
    </InsertionSortContainer>
  );
};

export default InsertionSort;
