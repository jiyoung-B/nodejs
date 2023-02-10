// 코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력

// https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
// ?serviceKey=hIpt8OZk1htHNDFV%2BVCWN576EY3%2BRmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q%3D%3D&pageNo=1&numOfRows=500&apiType=json&std_day=2021-12-15&gubun=%EA%B2%BD%EA%B8%B0
// hIpt8OZk1htHNDFV+VCWN576EY3+RmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q==
//

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");
const cheerio = require("cheerio");

async function main() { // 비동기 I/O 지원 함수 정의
    // 접속할 url, 쿼리스트링, user-agent 헤더 지정
    const URL = "http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api";
    const params = {
        'serviceKey' : 'hIpt8OZk1htHNDFV+VCWN576EY3+RmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q==',
        'returnType' : 'json'
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
    let items = json.data['response']['body']['items']['item'];
    console.log(items);

    // // 미세먼지 정보 출력
    // // pm25Value는 출력 안됨!!
    // for(let item of items){
    //     console.log(item.sidoName, item.stationName, item.pm25Value, item.dataTime);
    // }
};

main();
