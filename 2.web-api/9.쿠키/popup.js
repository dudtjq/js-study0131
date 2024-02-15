

function createCookie(name){
  const date = new Date();
  date.setDate(date.getDate() +1); // 쿠키의 수명을 하루로 설정
  
  const cookie =`${name}=true;expires=${date.toUTCString}`;// 중간에 ; 꼭 찍기
  
  // 쿠키 생성
  document.cookie = cookie;

}

function getCookie(name){

  // cookie 부분에서 split진행할때 '; ' -> 세미클론 뒤에 띄어쓰기 꼭해줘야함
  const cookies = document.cookie.split('; ');

  for(let c of cookies){
    if(c.search(name) !== -1){
      return true;
    }
  }

  return false;


}