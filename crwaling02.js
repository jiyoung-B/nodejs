// hanbit.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긇어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");     // Ajax 라이브러리
const cheerio = require("cheerio");   // DOM 라이브러리

async function main() { // 비동기 I/O 지원 함수 정의
    // 접속할 url 지정
    const URL = "https://www.hanbit.co.kr/store/books/new_book_list.html";

    // axios로 접속해서 html를 불러옴
    const html = await axios.get(URL) // 비동기 I/O 지원

    // 불러온 html을 parsing해서 DOM 생성
    const dom = cheerio.load(html.data);
    //console.log(dom);

    // CSS 선택자로 도서제목을 담고 있는 요소 지정
    let elements = dom('.book_tit'); // 클래스 선택자 '.' 붙여라!!
    console.log(elements);
    console.log('---------------------------------------------------');

    // 찾은 요소를 순회하면서 요소의 텍스트 출력
    elements.each((idx, title) => { // 선언형(명령형 아님)
        console.log(idx, dom(title).text()); // p 태그 안에서도 text 만 가져와라.
    });

    // CSS 선택자로 저자를 담고 있는 요소 지정
    let writer = dom('.book_writer');
    writer.each((idx, writer) => {  // 선언형이라서, 지정안해도 몇번째데이턴지 받아준다..? idx, writer
        console.log(idx, dom(writer).text());
        console.log('---------------------------------------------------');
    });


    // CSS 선택자로 가격을 담고 있는 요소 지정
    let price = dom('.price');
    price.each((idx, price) => {
        // 가격같은 경우  string으로 , 빼고 원 빼고 가공해서 보내기
        console.log(dom(price).text());
    });
};

main();
