
// index.html 에는 app.js (현재파일) 이 import되어 있습니다.
// 현재 파일을 실행부로 취급해서 각각의 기능은 파일별러 따로 구현해 보겠습니다.

import gameStart from './start.js';
// 다 지목을 할 경우에는 *찍으면 됨
//import {x, name} from './start.js';

// 즉시 실행 함수
(function(){

  gameStart();
  //console.log(`import로 전달 받은 값 : ${x} ${name}`);

})();