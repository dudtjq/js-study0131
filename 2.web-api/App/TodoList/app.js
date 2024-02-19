
// 일정 데이터가 들어 있는 배열 선언
const todos = [];

// 1 - 1  화면에 표현할 li.todo-list-item 노드를 생성하는 함수 정의
function makeNewTodoNode(newTodo){
  // 감싸고 있는 태그들을 먼저 생성
  const $li = document.createElement('li');
  const $label = document.createElement('label');
  const $divMod = document.createElement('div');
  const $divRem = document.createElement('div');

  // lable 태그 작업
  $label.classList.add('checkbox');
  const $check = document.createElement('input');// 인풋태그 만들기
  $check.setAttribute('type', 'checkbox'); // 인풋태그 타입 설정
  const $span = document.createElement('span'); // span 만들기
  $span.classList.add('text'); //span 안에 text 라는 class 만들기 
  $span.textContent = newTodo.text; // span text안에 넣을 문구 생성 $todoText.value,
  $label.appendChild($check); //
  $label.appendChild($span); // 라벨에 추가하기

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



// 2 - 1  추가될 할 일 객체의 id를 생성해 주는 함수 정의
function makeNewId(){
  if(todos.length > 0){
    // 배열 내의 할일 객체 중 마지막 객체의 id 보다 하나 크게
    return todos[todos.length - 1].id + 1;
  }else{
    // 할일 객체가 하나도 없는 경우에는 id가 1
    return 1;
  }
}





// 1. 할 일 추가 처리 함수 정의
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

// data-id 값으로 배열을 탐색하여 일치하는 객체가 들어있는 인덱스 반환
function findIndexByDataId(dataId){

  for(let i = 0; i < todos.length; i++){
    if(dataId === todos[i].id){
      return i;
    }
  }

}



// 2. 할 일 완료 처리 수행 할 함수 정의
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
  const index = findIndexByDataId(dataId);

  // 논리 반전식을 대입(기존에 있던 값을 반대 값을 주기)
  // 요거 체크박스 수행 시 참고 할 것
  // true false 이기 때문에 논리 반전을 사용할 수 있는 케이스
  todos[index].done = !todos[index].done;

    
  }



// 3. 할 일 삭제 처리 함수 정의
function removeTodoData($delTarget){

  // 애니메이션 적용을 위해 클래스 이름을 추가(delMoving)
  $delTarget.classList.add('delMoving');

  // ul 안에 있는 li를 removeChild로 제거하기 전에 애니메이션 발동 및
  // 배열 내부 객체 삭제가 진행될 수 있도록 시간을 일부러 지연
  // 시간 지연은 1.5초 진행(window함수 참고)
  setTimeout(() => {
   document.querySelector('.todo-list').removeChild($delTarget);
  }, 1500);


  // 배열 내에 있는 객체도 삭제를 진행.
  // 삭제되는 객체가 배열 안에 몇번째 인지를 확인 -> 할 일 완료 처리 함수쪽에 비슷한 로직이 있습니다.
  // 함수화 시켜보세요.
  // index 는 숫자로 들어가야 하기 떄문에 String 이 아닌 정수로 변환 한다
  const index = findIndexByDataId(+$delTarget.dataset.id);
  todos.splice(index, 1);
  
  console.log(todos);


}

// 4. 수정 모드 진입 이벤트 함수
function enterModifyMode($modSpan){

  // 수정모드 진입 버튼 교체 (lnr-undo -> lnr-checkmark-circle)
  //$modSpan.classList.toggle('lnr-checkmark-circle');
  $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

  // span.text 를 input 태그로 교체(replaceChild)
  // input 태그에는 .modify-input을 추가, input에는 기존의 할 일 텍스트가 미리 작성 되어야 함
  // 부모의 이전 형제 지목
  const $label = $modSpan.parentNode.previousElementSibling;
  // 속해 있는 마지막 요소 지목
  const $textSpan = $label.lastElementChild;

  const $modInput = document.createElement('input');
  $modInput.classList.add('modify-input');
  $modInput.setAttribute('value', $textSpan.textContent);// 기존 할 일 text를 input에   미리세팅
  //                세롭게 추가   기존 것을 삭제
  $label.replaceChild($modInput, $textSpan);


}

// 4. 수정 완료 이벤트
function modifyTodoData($modCompleteSpan){

  //버튼을 원래대로 돌립니다. (lnr-undo)
  $modCompleteSpan.classList.replace('lnr-checkmark-circle', 'lnr-undo');

  // input을 다시 span.txt로 변경
  const $label = $modCompleteSpan.parentNode.previousElementSibling;
  // 수정이 확실해지기 때문에 input 지목
  const $modInput = $label.lastElementChild;

  const $textSpan = document.createElement('span');
  $textSpan.textContent = $modInput.value;
  $textSpan.classList.add('text');
 //                세롭게 추가   기존 것을 삭제
  $label.replaceChild($textSpan, $modInput);

  // 배열 내의 id가 일치하는 객체를 찾아서 text 프로퍼티의 값을 수정된 값으로 변경
  const idx = findIndexByDataId(+$label.parentNode.dataset.id);
  todos[idx].text = $textSpan.textContent;

  console.log(todos);


}



// 메인 역할을 하는 즉시 실행 함수.
(function() {

  // 1. 할 일 추가 이벤트 등록
  const $addBtn = document.getElementById('add');

  $addBtn.addEventListener('click', e => {

    // form 태그 안의 button은 type을 명시하지 않으면 자동 submit이 동작함
    //e.preventDefault();// 버튼의 고유기능(submit이) 을 중지

    insertTodoData();

  });


  // 2. 할 일 완료 처리(체크 박스) 이벤트
  const $todoList = document.querySelector('.todo-list');

  $todoList.addEventListener('click', e => {

    if(!e.target.matches('input[type=checkbox]')){
      return; // 체크 박스에서만 이벤트가 동작할 수 있도록
    }

    changeCheckState(e.target.parentNode); // label을 함수의 매개값으로 전달

  });
  
  // 3. 할일 삭제 이벤트

  $todoList.addEventListener('click', e =>{

    if(!e.target.matches('.todo-list .remove span')){
      return;
    }

    removeTodoData(e.target.parentNode.parentNode);// 이벤트가 발생한 곳의 조상을
                                                  // 매개값으로 전달(li)

  });


  // 4. 할 일 수정 이벤트(수정 모드 진입, 수정 완료)
  $todoList.addEventListener('click', e => {

    if(e.target.matches('.todo-list .modify span.lnr-undo')){
      enterModifyMode(e.target); // 수정모드 진입
    }else if(e.target.matches('.todo-list .modify span.lnr-checkmark-circle')){
      modifyTodoData(e.target); // 수정모드에서 수정을 확정지으려는 이벤트
    }else{
      return;
    }

  });

})();
