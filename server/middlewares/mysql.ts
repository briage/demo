import mysql from 'mysql';
import { database } from '../../config/default';

const pool = mysql.createPool(database);

export { pool };
