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
const dbconfig = require('./dbconfig.js');


// 사이트 접속

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

    async function fetchBooksDOM() {
        const URL = "https://www.hanbit.co.kr/store/books/new_book_list.html";
        const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'};
        //let [titles, writers, prices, books] = [[], [], [], []];

        const html = await axios.get(URL,{
            headers : headers
        });
        return html;
    }
async function fetchBkTitle(html, title){
    const dom = cheerio.load(html.data);
    let titles = [];
        let elements = dom(title);
        elements.each((idx, title) => {
            console.log(dom(title).text());
            titles.push(dom(title).text());
        });
        return titles;
}

async function fetchBkWriter(html, writer){
    const dom = cheerio.load(html.data);
    let writers = [];
    let elements = dom(writer);
    elements.each((idx, write) => {
        writers.push(dom(write).text());
    });
    return writers;
}

async function fetchBkPrice(html, price){
    const dom = cheerio.load(html.data);
    let prices = [];
    let elements = dom(price);
    elements.each((idx, pric) => {
        prices.push(dom(pric).text());
    });
    return prices;
}


async function exportBooks(titles, writers, prices) {
        let books = [];
        for(let i = 0; i < titles.length; ++i){
            let book = {};
            book.title = titles[i];
            book.writer = writers[i].replace(/[ ]/g, '');
            book.price = prices[i].replace(/[,|원]/g, '');
            books.push(book);
        }
        return books;
    }

async function setBookInfo(books) {
    let sql = ' insert into newbooks (title, writer, price) ' +
        ' values (?, ?, ?) ';
    //let params = [];
    return sql;
}

async function connect() {
    let conn = null;
    try {
        conn = await mariadb.createConnection(dbconfig);
        return conn;
    }catch (ex){
        console.error(ex);
    }
}

async function saveInfo(conn, sql, books) {
    let params = [];
    for(let bk of books) {
        params = [bk.title, bk.writer, bk.price];
        let result = await conn.execute(sql, params);
        await conn.commit();
    }
    disconnect(conn);
}

async function disconnect(conn) {
    if(conn){
        try{
            await conn.close;
        }catch (ex){
            console.error(ex);
        }
    }
}



async function main(){
    let books = getBookInfo(); // 책 정보 가져오기

    saveBookInfo(books); // 책 저장하기
    // 이렇게는 안돼. 더 넣어야 할거야.
    // 나눠서 값을 전달해서 써야해.
    //axios 로 가져와서 json 저장 후 db 에 저장
};

//
// async function main(){
//     let books = getBookInfo(); // 책 정보 가져오기
//     console.log(await books);
//     console.log(await books);
//
//    // saveBookInfo(books); // 책 저장하기
//     // 이렇게는 안돼. 더 넣어야 할거야.
//     // 나눠서 값을 전달해서 써야해.
//     //axios 로 가져와서 json 저장 후 db 에 저장
// };

async function main(){
    let html = await fetchBooksDOM();
    let titles = await fetchBkTitle(html, '.book_tit');
    let writers = await fetchBkWriter(html, '.book_writer');
    let prices = await fetchBkPrice(html, '.price');

    let books = await exportBooks(titles, writers, prices);
    let sql =  await saveInfo(conn, sql, books);
    let conn = await connect();
    await sqlPutter(conn,sql,params);
}
main();
