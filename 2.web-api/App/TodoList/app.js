
// 일정 데이터가 들어 있는 배열 선언
const todos = [
  {
    id: 1,
    text: '할 일 1',
    done: false // 체크 박스를 클릭해서 할 일을 마쳤는지의 여부
  },

  {
    id: 2,
    text: '할 일 2',
    done: false // 체크 박스를 클릭해서 할 일을 마쳤는지의 여부
  },

  {
    id: 3,
    text: '할 일 3',
    done: false // 체크 박스를 클릭해서 할 일을 마쳤는지의 여부
  },

];

// 화면에 표현할 li.todo-list-item 노드를 생성하는 함수 정의
function makeNewTodoNode(newTodo){
  // 감싸고 있는 태그들을 먼저 생성
  const $li = document.createElement('li');
  const $label = document.createElement('label');
  const $divMod = document.createElement('div');
  const $divRem = document.createElement('div');

  // lable 태그 작업
  $label.classList.add('checkbox');
  const $check = document.createElement('input');
  $check.setAttribute('type', 'checkbox');
  const $span = document.createElement('span');
  $span.classList.add('text');
  $span.textContent = newTodo.text;
  $label.appendChild($check);
  $label.appendChild($span);

  // modify 태그 작업
  $divMod.classList.add('modify');
  const $modIcon = document.createElement('span');
  // 클래스 이름을 두개 이상 add 할때는 각각 지정해줘야함
  // 한번에 공백 포함 두개 이상 설정하면 에러가 남
  $modIcon.classList.add('lnr', 'lnr-undo');
  $divMod.appendChild($modIcon);

  // remove 태그 작업
  $divRem.classList.add('remove');
  const $remIcon = document.createElement('span');
  // 클래스 이름을 두개 이상 add 할때는 각각 지정해줘야함
  // 한번에 공백 포함 두개 이상 설정하면 에러가 남
  $remIcon.classList.add('lnr', 'lnr-cross-circle');
  // className 은 아래 처럼 작성 해줘도 가능함
  //$remIcon.className = 'lnr lnr-cross-circle';
  $divRem.appendChild($remIcon);

  // li 태그 작업
  $li.dataset.id = newTodo.id;
  $li.classList.add('todo-list-item');

  // 즉석으로 배열로 선언하여 반복문 돌리기
  for(let $ele of [$label, $divMod, $divRem]){
    $li.appendChild($ele);
  }

  // ul 태그를 지목해서 $li를 자식 노드로 추가
  document.querySelector('.todo-list').appendChild($li);


}



// 추가될 할 일 객체의 id를 생성해 주는 함수 정의
function makeNewId(){
  if(todos.length > 0){
    // 배열 내의 할일 객체 중 마지막 객체의 id 보다 하나 크게
    return todos[todos.length - 1].id + 1;
  }else{
    // 할일 객체가 하나도 없는 경우에는 id가 1
    return 1;
  }
}





// 할 일 추가 처리 함수 정의
function insertTodoData(){

  // 사용자가 작성할 일 일 input 요소 얻기 
  const $todoText = document.getElementById('todo-text');
 

  // 1. 입력값이 없다면 추가 처리 하지 않겠습니다.
  // 공백이 들어갈 가능성이 있기 때문에 공백을 제거하고 비교
  // trim() : 공백 제거 함수
  // 입력 값이 없다 -> background : orangered , placeholder : 필수 입력 사항 입니다.
  // 이벤트 강제종료
  if($todoText.value.trim() === ''){
    //alert('할 일을 작성해주세요');
    $todoText.style.background = 'orangered';
    $todoText.setAttribute('placeholder', '필수 입력 사항 입니다.')
    $todoText.value = '';
    $todoText.focus();
    return;
  }else{
    // 제대로 입력이 되었다면 초기화
    $todoText.setAttribute('placeholder', '할 일을 입력하세요');
    $todoText.style.background = '';

  }

  // if(!$todoText.value.trim()){
  //   alert('공백은 미포함 입니다.');
  // }


  // 2. todos 배열에 객체를 생성한 후 추가 (id 추가 순서대로 잘 진행하세요)

  const newTodo = {
    // id는 함수로 호출
    id : makeNewId(),
    text: $todoText.value,
    done: false
  }

  todos.push(newTodo);

  //console.log(todos);

  // 3. 추가된 데이터를 화면에 표현(li태그 추가)

  makeNewTodoNode(newTodo);

  // 4. 입력 완료 후 input 에 존재하는 문자열 제거
  $todoText.value = '';




}

function changeDone(){
  


}



// 할 일 완료 처리 수행 할 함수 정의
function changeCheckState($label){

  /*
  할 일 완료된 노드의 클래스 이름을 추가(다자인 줄려고)
  checked 클래스 이름을 추가. 근데, 할 일 완료는 껐다 켰다 할 수 있어야함
  -> 클래스 이름을 뗏다 붙였다 할 수 있어야 함 
  */
  $label.lastElementChild.classList.toggle('checked');
   
   
  /*
  전역 변수로 선언한 배열 안의 객체의 done값을 수정해야함
  data-id를 얻어서 , 그와 일치하는 객체의 done값을 true로 바꿔야함
  만약, 기존의 값이 true였다? 그럼 false로 바뀌여야 함
  */

  //data-id 얻어오는 방법
  // dataId가 스트링으로 오기 때문에 + 사용하여 정수로 변환
  const dataId = +$label.parentNode.dataset.id;
 
  for(let i = 0; i < todos.length; i++){
    if(dataId === todos[i].id){
      // 논리 반전식을 대입(기존에 있던 값을 반대 값을 주기)
      // 요거 체크박스 수행 시 참고 할 것
      todos[i].done = !todos[i].done;
    }
  }
  console.log(todos);




}







// 메인 역할을 하는 즉시 실행 함수.
(function() {

  // 할 일 추가 이벤트 등록
  const $addBtn = document.getElementById('add');

  $addBtn.addEventListener('click', e => {

    // form 태그 안의 button은 type을 명시하지 않으면 자동 submit이 동작함
    //e.preventDefault();// 버튼의 고유기능(submit이) 을 중지

    insertTodoData();

  });


  // 할 일 완료 처리(체크 박스) 이벤트
  const $todoList = document.querySelector('.todo-list');

  $todoList.addEventListener('click', e => {

    if(!e.target.matches('input[type=checkbox]')){
      return; // 체크 박스에서만 이벤트가 동작할 수 있도록
    }

    changeCheckState(e.target.parentNode); // label을 함수의 매개값으로 전달

  });
  
  // 할일 삭제 이벤트


  // 할 일 수정 이벤트(수정 모드 진입, 수정 완료)

})();
