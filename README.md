# 알고리즘 시각화 프로젝트(with nextjs, ts)

- 간단한 알고리즘 시각화 프로젝트를 구현하며 nextjs 적응

# styled components 적용

- styled components 설치
  npm install styled components

- `_document.js설정`
  https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js

- babel 설정
  https://github.com/vercel/next.js/blob/master/examples/with-styled-components/.babelrc
  npm i -D babel-plugin-styled-components

- for ts
  npm i --save-dev @types/styled-components

# #3 set Layout with css(styled components)

# #4 install lodash

- 함수형 프로그래밍을 위해 도움을 주는 라이브러리
  (여러 작업을하는 만들어진 함수들을 제공함)

- npm i --save lodash
- for ts
  <!-- type정보는 devDependencies에 들어감 런타임땐 필요없고 개발모드에서만 필요하기때문 -->

  npm i --save-dev @types/lodash

  # lodash(range)

  - 배열안에 지정한 범위만큼 숫자를 나열해줌

# lodash(shuffle)

- 배열을 무작위로 섞어주는 함수

# #5 shuffle with useState

# #6 Insertion Sort

- ref: https://en.wikipedia.org/wiki/Insertion_sort

# #7 show BAR interface with CSS

# #8 division Bar part

- 모듈화

# #9 apply async await

- setTimeout을 이용하여 비동기 처리로 지연을 눈에 띄게 줌으로 정렬되는 과정을 마치 애니메이션처럼 보여줌

# #10 display to state detail..

- 보다 자세하게 정렬과정을 보여주기위해 현재 인덱싱 상태 및 동작중 버튼 제어 못하게 설정

# #11 code refactoring

- 코드 정리

# #12 apply memo for BarPresent

- 필요없는 리렌더링 방지
