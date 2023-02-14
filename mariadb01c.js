const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main() {
    const sql = 'select distinct dong from' +
        ' zipcode2013 where sido = ? and gugun = ? order by dong';
    let conn = null;
    let params = ['서울', '강남구'];


    try {
        conn = await mariadb.createConnection(dbconfig);
        let result = await conn.execute(sql, params);
        //console.log(result); //json 형태

        for(let row of result){
            console.log(row.dong);
        }

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
};

main();
