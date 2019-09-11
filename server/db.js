"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS userAuth (
                id integer PRIMARY KEY, 
                name text,
                email text UNIQUE, 
                password text,
                surname text,
                patronymic text,
                birthyear text
            )`;
        return this.db.run(sql);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM userAuth WHERE email = ?`,
            [email], function (err, row) {
                callback(err, row)
            });
    }

    selectById(id, callback) {
        return this.db.get(
            `SELECT * FROM userAuth WHERE id = ?`,
            [id], function (err, row) {
                callback(err, row)
            });
    }

    selectAllUsers(callback) {
        return this.db.all(
            `SELECT * FROM userAuth`,
            function (err, row) {
                callback(err, row)
            });
    }

    removeUser(id, callback) {
        return this.db.run(
            `DELETE FROM userAuth WHERE id = ? `,
            [id], function (err, row) {
                callback(err)
            });
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO userAuth (name, email, password, surname, patronymic, birthyear) VALUES (?,?,?,?,?,?)',
            user, (err) => {
                callback(err)
            });
    }

    updatePass(data, callback) {
        return this.db.run(
            'UPDATE userAuth SET password = $password WHERE id = $id',
            data, (err, row) => {
                callback(err, row)
            });
    }

    updateData(data, callback) {
        return this.db.run(
            'UPDATE userAuth SET email = $email, name = $name  WHERE id = $id',
            data, (err, row) => {
                callback(err, row)
            });
    }
}

module.exports = Db