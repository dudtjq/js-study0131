


function caseUp($icon){

  // 1. #begin 인 em 의 숫자값을 선택한 값 +1 로 변경
  document.getElementById('begin').textContent = +$icon.dataset.iconNumber + 1; 

  // 2. up 또는 down 요소에 애니메이션을 넣을 것 ->selected 를 추가
  // #down 요소의 .selected를 제거 , #up 에 추가
  document.getElementById('down').classList.remove('selected');
  document.getElementById('up').classList.add('selected');

  // 3. 자기 자신 아이콘 포함 이전 형제 요소들 전부 삭제
  
  const $numbers = document.getElementById('numbers');

  // 삭제할 요소를 변수로 저장해 둔다
  let $delTarget = $icon;
  // 삭제되는 요소는 자신의 이전 형제 요소를 지목해 놓고 삭제가 됩니다.
  // 삭제되는 요소가 1번 아이콘인 경우에는 이전 요소가 없기 때문에 $delTarget이 null
  // 이 된다
  // $delTarget이 null이 되는 순간 반복문을 종료시키겠다는 조건식을 작성

  // $delTarget === null이라면 반복문 종료
  while($delTarget){

    const $nextTarget = $delTarget.previousElementSibling;
    $numbers.removeChild($delTarget);

    $delTarget = $nextTarget;


  }


}

function caseDown($icon){

  // 1. #end 인 em 의 숫자값을 선택한 값 -1 로 변경
  document.getElementById('end').textContent = +$icon.dataset.iconNumber - 1; 

  // #down 요소의 .selected를 추가 , #up 에 제거
  document.getElementById('up').classList.remove('selected');
  document.getElementById('down').classList.add('selected');

  // 3. 자기 자신 아이콘 포함 다음 형제 요소들 전부 삭제
  const $numbers = document.getElementById('numbers');

  // 삭제할 요소를 변수로 저장해 둔다
  let $delTarget = $icon;
  // 삭제되는 요소는 자신의 이전 형제 요소를 지목해 놓고 삭제가 됩니다.
  // 삭제되는 요소가 1번 아이콘인 경우에는 이전 요소가 없기 때문에 $delTarget이 null
  // 이 된다
  // $delTarget이 null이 되는 순간 반복문을 종료시키겠다는 조건식을 작성

  // $delTarget === null이라면 반복문 종료
  while($delTarget){

    const $nextTarget = $delTarget.nextElementSibling;
    $numbers.removeChild($delTarget);

    $delTarget = $nextTarget;


  }
}

function currectAnswer($icon){

  // 1. #finish 박스에 class 'show' 부여
  const $finish = document.getElementById('finish');
  $finish.classList.add('show');
  
  // 2. #numbers 클릭 이벤트 해제
  $numbers.onclick = null;

  // 3. 사용자가 선택한 아이콘에 id 'move' 추가


}

export {caseUp, caseDown, currectAnswer};