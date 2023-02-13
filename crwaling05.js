// 코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력

// https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
// ?serviceKey=hIpt8OZk1htHNDFV%2BVCWN576EY3%2BRmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q%3D%3D&pageNo=1&numOfRows=500&apiType=json&std_day=2021-12-15&gubun=%EA%B2%BD%EA%B8%B0
// hIpt8OZk1htHNDFV+VCWN576EY3+RmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q==

// ?serviceKey=hIpt8OZk1htHNDFV%2BVCWN576EY3%2BRmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q%3D%3D&pageNo=1&numOfRows=500&apiType=xml&std_day=2023-2-12

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require("axios");
const {XMLParser} = require('fast-xml-parser') // xml 처리기 라이브러리


async function main() { // 비동기 I/O 지원 함수 정의
    // 접속할 url, 쿼리스트링, user-agent 헤더 지정
    // apiType : xml 또는 JSON(대문자)
    const URL = "http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api";
    const params = {
        'serviceKey' : 'hIpt8OZk1htHNDFV+VCWN576EY3+RmKwVwAVxdwU7WhyMc220lJeSEs9PHP3cZcSUs8MiF4sZiZSDafDna6v0Q==',
        'apiType' : 'xml', 'std_day': '2023-02-12'
    };
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'};

    // axios로 접속해서 xml를 받아옴
    const xml = await axios.get(URL,{
        params : params,
        headers : headers
    }) // 서버 요청시 User-Agent 헤더 사용

    // 받아온 데이터 잠시 확인
    // console.log(xml.data);

    // XML을 JSON으로 변환하기
    const parser = new XMLParser();
    let json = parser.parse(xml.data);


    // JSON으로 불러오기
   // console.log(json);
    let items = json['response']['body']['items'];
    console.log(items);
   // console.log(items['item']);

    // 지역별 코로나 확진 정보 출력
    for(let item of items['item']){
        console.log(`지역 : ${item.gubun}, 전일확진자수 : ${item.incDec}, 누적확진자수 : ${item.defCnt}, 누적사망자수 : ${item.deathCnt}, 측정일 : ${item.stdDay}`);
        // console.log(item.gubun,
        //     item.gubunEn,
        //     item.deathCnt,
        //     item.defCnt,
        //     item.incDec,
        //     item.isolClearCnt,
        //     item.isolIngCnt,
        //     item.localOccCnt,
        //     item.overFlowCnt,
        //     item.qurRate,
        //     item.stdDay);
    }
};

main();
