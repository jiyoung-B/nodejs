// movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
// https://movie.daum.net/main
// 순위 ,영화제목, 예약율, 평점

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");

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

        // 영화제목들, 평점, 예매율 추출
        let movies = await chrome.findElements(By.css('.feature_home div:nth-child(3).slide_ranking .tit_item'));
        let rates = await chrome.findElements(By.css('.feature_home div:nth-child(3).slide_ranking .txt_num:first-child'));
        let rsrvs = await chrome.findElements(By.css('.feature_home div:nth-child(3).slide_ranking .txt_num:last-child'));

        // 추출한 결과를 저장하기 위한 배열 선언
        let moviess = [], ratess = [], rsrvss = [];

        // 추출된 영화제목 출력
        for( let movie of movies){
            //console.log(await movie.getText()); // 눈에 보이는 요소의 텍스트만 출력됨(영화목록 15위까지 있지만 화면상에 5개만 떠있으므로 5개만 출력)
            let title = await movie.getAttribute('textContent'); // 안보이는것도 출력해야하므로 앞으로는 이걸로 출력하도록 합니다!
            //console.log(title.trim());
            moviess.push(title.trim());
        }

        // 추출된 평점 출력
        for(let rate of rates){
           // console.log(await rate.getText());
            let point =( await rate.getAttribute('textContent')).trim();
           // console.log(point.trim());
           // ratess.push(point.trim());
            ratess.push(point);
        }

        // 추출된 예매율 출력
        for(let rsrv of rsrvs){
            //console.log(await rsrv.getText());
            let rsrt = (await rsrv.getAttribute('textContent')).trim();
            //console.log(resrv.trim());
            //rsrvss.push(resrv.trim());
            rsrvss.push(rsrt);
        }

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
