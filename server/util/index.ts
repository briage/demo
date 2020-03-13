import {pool} from '../middlewares/mysql';

const query = (sql: string, values?: Array<any>) => new Promise((resolve, reject) => {
    pool.query({
        sql,
        timeout: 100000,
        values
    }, (err, res, field) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(res);
    })
})

export { query };