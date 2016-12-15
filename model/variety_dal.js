var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM variety;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.getById = function(variety_id, callback) {
    var query = 'SELECT * FROM variety WHERE variety_id = ?';
    var queryData = [variety_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.edit = function(variety_id, callback) {
    var query = 'CALL variety_getinfo(?)';
    var queryData = [variety_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.insert = function(params, callback) {
    var query = 'INSERT INTO variety (variety_name) VALUES (?)';
    var queryData = [params.variety_name];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.delete = function(variety_id, callback) {
    var query = 'DELETE FROM variety WHERE variety_id = ?';
    var queryData = [variety_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
/*
exports.update = function(params, callback) {
    var query = 'UPDATE variety SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
*/
