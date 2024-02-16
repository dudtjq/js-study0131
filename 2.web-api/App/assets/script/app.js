

// 현재 계산기에 그려진 숫자
// 처음 고정 숫자 값 주기
let currentResult = 0;

// 계산 이력을 모아 둘 배열
const logEntries = [];

// 로그 번호
// 3번째 박스에서 # 다음에 넣어줄 숫자
let number1 = 0;

// 입력한 창에 숫자 읽는 함수
 const getUserNumber = () => +$userInput.value;

 // 계산 기능을 담당하는 함수
 const calculate = type => {

  // 계산 전 값을기억
  const originalResult = currentResult;
  const enterNumber = getUserNumber();
  //console.log(enterNumber);

  // 유효성 검사
  if(enterNumber === 0){
    alert('올바르지 않는 값입니다.');
    return;
  }


  let mark;
  if(type === 'ADD'){
    mark = '+';
    currentResult += enterNumber;
  }else if(type === 'sub'){
    mark = '-';
    currentResult -= enterNumber;
  }else if(type === 'multi'){
    mark = 'x';
    currentResult *= enterNumber;
  }else{
    // 0으로 못나누게 하기
    if(enterNumber === 0){
      alert('0으로 나눌수 없습니다.');
      return;
    }
    mark = '/';
    currentResult /= enterNumber;
  }

  // 연산식과 결과 값을 두번째 section에 랜더링 두번째 박스에 글 추가 할 것들
  // 연산식
  $currentCalculationOutput.textContent = `${originalResult} ${mark} ${enterNumber}`;
  // 결과 값
  $currentResultOutput.textContent =  currentResult;

  // 3번째 박스에 해당하는 로그 이력 쌓기
  writeToLog(mark, originalResult, enterNumber, currentResult);

 }

 // 로그 이력을 만드는 함수            
 const writeToLog = (operation, prevResult, number, result) => {
  // 하나의 로그 객체(연산타입, 이전결과, 연산숫자, 연산결과)
  const logObject = {
    // 이렇게 작성하게 되면 key값과 value가 같아진다.
    operation,
    prevResult,
    number,
    result
  };
  // 생성했던 배열에 추가해주기
  logEntries.push(logObject);
  //console.log(logEntries);

  // 화면에 로그를 li로 렌더링하는 함수 호출
  renderToLog(logObject);

 } 

 // 로그 이력을 화면에 렌더링 하는 함수
 // 매개 변수로 객체가 전달된다면  매개변수 위치에서 디스트럭쳐링이 가능함   
 const renderToLog = ({operation: mark, prevResult, number, result}) => {

  //li 태그 생성
  const $newLi = document.createElement('li');
  $newLi.classList.add('log-entries-item');
  $newLi.textContent = `#${++number1}. ${prevResult} ${mark} ${number} = ${result}`;
  
  // ul안에 있는 li 에 생성 할 것이기 때문에 요소 취득후 appendChild  사용
  $logEntries.appendChild($newLi);


 };
 

// 더하기 버튼 이벤트 핸들러
// 대부분 똑같은 패턴이기 때문에 힘수하나를 만들어서 그 안에서 호출한다
const addHandler = () => {
  calculate('ADD');
}

const subHandler = () => {
  //console.log('뺄셈 연산 발생');
  calculate('sub');
}

const multiHandler = () => {
 //console.log('곱셈 연산 발생');
 calculate('multi');
}

const divideHandler = () => {
  //console.log('나눗셈 연산 발생');
  calculate('divide');
}


// ============= 이벤트 핸들러 바인딩 ===============
$addBtn.addEventListener('click', addHandler);
$subtractBtn.addEventListener('click', subHandler);
$multiplyBtn.addEventListener('click', multiHandler);
$divideBtn.addEventListener('click', divideHandler);