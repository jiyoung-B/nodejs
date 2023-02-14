// 셀레니움을 이용해서 네이버 받은 메일수 조회 후 출
// https://www.naver.com/

const {Builder, Browser, By, Key, until, Select} = require('selenium-webdriver');
const ncp = require('copy-paste');
async function main() {
    const URL = 'http://www.naver.com/';
    const chrome = await new Builder().forBrowser(Browser.CHROME).build();

    try{
        // 사이트 접속
        await chrome.get(URL);

        // 로그인 버튼이 제대로 나타날때까지 최대 5초까지 대기
        await chrome.wait(until.elementLocated(By.css('.link_login')), 5000);

        // 로그인 버튼을 찾아 클릭
        let loginbtn = await chrome.findElement(By.css('.link_login'));
        await chrome.actions().move({origin : loginbtn}).click().perform(); //
        await sleep(1000); // 버튼 클릭 후 페이지 다 뜰 때까지 1초동안 잠시 대기
        // -----------------------
        await chrome.wait(until.elementLocated(By.css('.btn_login')), 5000);

        let uid= await chrome.findElement(By.css('#id'));
        let pwd= await chrome.findElement(By.css('#pw'));
        loginbtn= await chrome.findElement(By.css('.btn_login'));

        // 네이버에서는 이러한 행위를 봇으로 인식 -> 2차 인증 필요
        // // 아이디를 uid 객체에 입력
        // await chrome.actions().sendKeys(uid, 'catgirl0313').perform();
        // await sleep(1000); // 기계로 돌렸구나라는걸 바로 보이기 때문에 의도적으로 1초 대기
        //
        // // 비밀번호를 pwd 객체에 입력
        // await chrome.actions().sendKeys(pwd, '283662aA').perform();
        // await sleep(1000);

        // 아이디/비밀번호를 클립보드로 복사/붙여넣기를 후 로그인 시도
        // 클립보드 복사 모듈 - copy-paste
        ncp.copy('catgirl0313');
        await chrome.actions().click(uid)       // 클릭 후
            .keyDown(Key.CONTROL).sendKeys('v').perform(); //붙여넣기
        await sleep(1000);

        ncp.copy('283662aaA');
        await chrome.actions().click(pwd)
            .keyDown(Key.CONTROL).sendKeys('v').perform();
        await sleep(1000);


        // 로그인 버튼 클릭
        await chrome.actions().move({origin : loginbtn}).click().perform(); //
        await sleep(1000);


        // 등록안함 클릭
        loginbtn= await chrome.findElement(By.css('.btn_cancel'));
        await chrome.actions().move({origin : loginbtn}).click().perform(); //
        await sleep(1000);

        // 메일 개수 세기...가 잘안됨??
        //let myMailCount = await chrome.findElement(By.css('.num .MY_MAIL_COUNT'));


        //const iframe = await chrome.findElement(By.css('#NM_INT_RIGHT > iframe'));
        //await chrome.switchTo().frame(iframe);
       // await chrome.switchTo().frame('#minime');
        await chrome.switchTo().frame('minime');

        let myMailCount = await chrome.findElement(By.css('.num.MY_MAIL_COUNT'));

        //console.log(await myMailCount.getText()); // 둘다 나옵니다.
        console.log(await myMailCount.getAttribute('textContent')); // 이것도 나와요


    }catch(ex){
        console.log(ex);
    }finally{
        await chrome.sleep(5000);
        await chrome.quit();
    }
};
// new.dontsave
//
// num MY_MAIL_COUNT

// 일정시간 셀레니움이 대기하도록 만드는 함수
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

main();