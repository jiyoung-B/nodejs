// crwaling03을 마리아db 버전으로 만들겠습니다.
// hanbit.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긇어오기
// https://www.hanbit.co.kr/store/books/new_book_list.html
// 수집된 데이터들을 newbooks라는 테이블에 저장해 둠.
// create table newbooks (
//     bookno int auto_increment,
//     title varchar(250) not null,
//     writer varchar(100) not null,
//     price int not null,
//     regdate dateTIME default current_timestamp,
//     primary key (bookno)
// );

const axios = require("axios");
const cheerio = require("cheerio");
const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');


function getBookInfo() {
    return undefined;
}

function saveBookInfo(books) {
    function fetchBooksDOM() {}
    function fetchBkTitle() {}
    function fetchBkWriter() {}
    function fetchBkPrice() {}
    function exportBooks() {}

}

async function main(){
    let books = getBookInfo(); // 책 정보 가져오기

    saveBookInfo(books); // 책 저장하기
    // 이렇게는 안돼. 더 넣어야 할거야.
    // 나눠서 값을 전달해서 써야해.
    //axios 로 가져와서 json 저장 후 db 에 저장
};
main();
