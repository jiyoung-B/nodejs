// movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
// https://movie.daum.net/main
// 순위 ,영화제목, 예약율, 평점

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");
const cheerio = require("cheerio");
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const url = require("url");

async function main() { // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    const URL = 'https://movie.daum.net/main';

    // 크롬 자동화 브라우저 객체 생성
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions()
        .build();

    try{
        // 지정한 url로 접속
        await chrome.get(URL);

        // 특정 요소가 화면에 위치할때까지 최대 5초간 기다려 줌
        await chrome.wait(until.elementLocated(By.css('.feature_home div:nth-child(3).slide_ranking .tit_item')), 5000);

        // html/body/div[2]/main/article/section/div[2] - nth-chile(2)가 아니라 3으로 해야합니다.
        //메모리가 엘리먼트로 잡힐때까지  기다려, css에 title 만들어질때까지 5초간(기다려)
        //요소가다뜰때까지 기다리는 상태를 만들어줘야해.

        // 접속한 사이트의 html 소스를 가져옴
        const html = await chrome.getPageSource();
        // console.log(html);

        // 페이지소스를 dom 객체로 변환
        const dom = cheerio.load(html);

        // 영화제목들, 평점, 예매율 추출
        let movies = dom('.feature_home div:nth-child(3).slide_ranking .tit_item');
        let rates = dom('.feature_home div:nth-child(3).slide_ranking .txt_num:first-child');
        let rsrvs = dom('.feature_home div:nth-child(3).slide_ranking .txt_num:last-child');

        // 추출한 결과를 저장하기 위한 배열 선언
        let moviess = [], ratess = [], rsrvss = [];

        // 추출된 영화제목 출력
        movies.each((idx, movie) =>{
            let title = dom(movie).text().trim();
           // console.log(title);
            moviess.push(title)
        });

        // 추출된 평점 출력
        rates.each((idx, rate) =>{
            let point = dom(rate).text().trim();
            // console.log(point);
            ratess.push(point)
        });

        // 추출된 예매율 출력
        rsrvs.each((idx, rsrv) =>{
            let rsrt = dom(rsrv).text().trim();
           // console.log(rsrt);
            rsrvss.push(rsrt);
        });

        //한번에 모아서 출력
        for (let i = 0; i < moviess.length; ++i) {
            console.log(`${moviess[i]} ${ratess[i]} ${rsrvss[i]}`);
        }



    } catch (ex) {
        console.log(ex);

    } finally {
        await chrome.quit(); // 크롬 브라우저 닫기
    }


};

main();
