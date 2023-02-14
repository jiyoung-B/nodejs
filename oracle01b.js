// zipcode2013에서 테이블에서 서울에 있는 모든 구를 조회해서 출력하세요
const oracledb = require("oracledb");

async function main() {
    // const sql = "select distinct gugun from zipcode2013 where sido='서울' order by gugun";
    // placeholder를 이용해서 동적으로 sql질의문을 작성할 수 있음
    // :인덱스 => 배열로 정의
    // :키 => 객체로 정의
    //const sql = "select distinct gugun from zipcode2013 where sido=:1 order by gugun"; //:숫자 : 오라클의 플레이스홀더. 다른것은 ? 로도 사용
    const sql = "select distinct gugun from zipcode2013 where sido=:sido order by gugun"; //:숫자 : 오라클의 플레이스홀더. 다른것은 ? 로도 사용

    // let params = {};
    //let params = ['인천'];
    let params = {sido:'인천'};
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT // 아웃포맷이 반드시 필요
    }; // oracle db를 위한 옵션 정의

    let conn = null; // 디비 연결 객체

    try {
        await oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'});

        conn = await oracledb.getConnection({
            user:'bigdata', password: 'bigdata', connectionString: '52.79.99.166:1521/XE'
        });

        let result = await conn.execute(sql, params, options);
        let rs = result.resultSet;
        let row = null;

        while(row = await rs.getRow()){
            console.log(row.GUGUN);
        }

        await rs.close();
    } catch (ex) {
        console.error(ex);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (ex) {
                console.error(ex);
            }
        }
    }
}

main();
