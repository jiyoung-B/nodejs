// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 클릭
// 마이페이지에서 미리보기로 가져온 주소
// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=hIpt8OZk1htHNDFV%2BVCWN576EY3%2BRmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0

// https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=hIpt8OZk1htHNDFV%2BVCWN576EY3%2BRmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0
//               ???&returnType&num
// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");
const cheerio = require("cheerio");

async function main() { // 비동기 I/O 지원 함수 정의
    // 접속할 url, 쿼리스트링, user-agent 헤더 지정
    const URL = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    const params = {
        'serviceKey' : 'hIpt8OZk1htHNDFV+VCWN576EY3+RmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q==',
        'returnType' : 'json', 'sidoName':'전국', 'numOfRows':1000, 'ver':1.3 // numOfRows는 최대개수
    };
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'};

    // axios로 접속해서 대기오염 정보를 받아옴
    const json = await axios.get(URL,{
        params : params,
        headers : headers
    }) // 서버 요청시 User-Agent 헤더 사용

    // 받아온 데이터 잠시 확인
    console.log(json.data);

    // JSON으로 불러오기
    let items = json.data['response']['body']['items'];
    //console.log(items);

    // 미세먼지 정보 출력
    // pm25Value는 출력 안됨!! -ver:1.3 설정하면 나옴~
    for(let item of items){
        console.log(item.sidoName, item.stationName, item.pm25Value,
            pmGrade(item.pm10Value), pmGrade(item.pm25Value), item.dataTime);
    }
    // 등급별 이모지
    // 1등급 좋음 😍
    // 2등급 보통 😐
    // 3등급 나쁨 😰
    // 2등급 매우나쁨 😱
    // pmGrade 함수 만들어서 if로 grade값 넣어줘서 확인

    let pmGrade = (val) => {
        if(val)
        return 'hello'
    }
};

main();
