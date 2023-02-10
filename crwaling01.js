// hanbit.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긇어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");
const main = () => {
  // 접속할 url 지정
  const URL = "https://www.hanbit.co.kr/store/books/new_book_list.html";

  // axios로 접속해서 html를 불러옴
  // const html = axios.get(URL); - 다른사람은 undefined 뜬다는데 나는 아무것도 안떠->main()을 안 불렀음;
  axios.get(URL)
    .then((html) => {
      // 불러온 html을 콘솔에 출력
      console.log(html.data);
    })
    .catch((error) => {
        console.log(error);
    });
};
main();
