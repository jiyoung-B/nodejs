const oracledb = require("oracledb");

async function main() {
  const sql = "select distinct SIDO from zipcode2013"; // 집코드에서 sido를 가져옵니다.
  let params = {}; // inser, update, delete, where 절에 많이 써
  let options = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT // 아웃포맷이 반드시 필요
  }; // oracle db를 위한 옵션 정의

  let conn = null; // 디비 연결 객체

  try {
      // 오라클 인스턴스 클라이언트 초기화
      await oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'});
      // 19 버전으로 conn.close가 안되서 21 버전업으로 시도해봅니다~ 했다가 다시 19로~ 오류는 await oracledb.getConnection await을 안써서임.


      // 오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
      conn = await oracledb.getConnection({ // 나중에 독립적으로 빼내겠습니다.
          user:'bigdata', password: 'bigdata', connectionString: '52.79.99.166:1521/XE'// 'ip주소:포트번호/SID'
      });

      console.log('오라클 데이터베이스 접속 성공!!');

      // sql문을 실행하고 결과를 받아옴
      let result = await conn.execute(sql, params, options); // 옵션도 마찬가지 -outFormat 설정 필요!!
      //select할때는 sql, params, options 쓰는데, update, delete는 sql, params 2개만 쓰면돼
      //let result = await conn.execute(sql);

      // 실행결과를 객체로 변환
      let rs = result.resultSet;

      // 결과집합 객체의 각 요소를 순회하면서 내용 출력
      let row = null;
      while(row = await rs.getRow()){ // outFormat 설정 필요!!
          console.log(row.SIDO);
      }

      // 작업이 끝나면 결과집합 객체를 닫음
      rs.close();
  } catch (ex) {
      console.error(ex);
  } finally {
      if (conn) {
          try {
              await conn.close(); //오류중안닫히는경우도있어서 닫아준다
              console.log('오라클 데이터베이스 접속 해제 성공!!');
          } catch (ex) {
              console.error(ex);
          }
      }
  }
}

main();
