
const oracledb = require("oracledb");
const dbconfig = require("./dbconfig.js");// db연결정보 파일

async function main() {

    let sql1 = ' create table sungjuk (name varchar(100), kor number(3), eng number(3), mat number(3)) '; // 줄바꿈 시 앞에 한칸 띄우기
    let sql2 = ' insert into sungjuk values (:1, :2, :3, :4) ';
    let sql3 = ' update sungjuk set kor = :1, eng = :2, mat :3 where name = :4) ';
    let sql4 = ' delete from sungjuk where name = :1 ';
    let sql5 = ' select * from sungjuk ';
    let params = [];
    let conn = null;

    try {
        await oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);
//sql1
        //let result = await conn.execute(sql1);
       // console.log(result);
//sql2
//         params = ['혜교', 99, 98, 99];
//       let result = await conn.execute(sql2, params);
//         await conn.commit(); // insert, update, delete할때는 commit 반드시 필요!!
//         console.log(result);
//sql3
//         params = [11,22,33, '혜교'];
//         result = await conn.execute(sql3, params);
//         await conn.commit();
//         console.log(result);
//sql4
//             params =['혜교'];
//             let result = await conn.execute(sql4, params);
//             await conn.commit();
//             console.log(result);
//sql5 - sql 2번 푸었다가 다시 실행 let 지우기
     let result = await conn.execute(sql5);
        console.log(result);


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
