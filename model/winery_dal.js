var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM winery_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.getById = function(winery_id, callback) {
    var query = 'SELECT * FROM view_all WHERE winery_id = ?';
    var queryData = [winery_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.edit = function(winery_id, callback) {
    var query = 'CALL winery_getinfo(?)';
    var queryData = [winery_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.insert = function(params, callback) {
    var query = 'insert into winery (winery_name, city, phone_num, walk_ins) values (?,?,?,?);';
    var queryData = [params.winery_name, params.city, params.phone_num, params.walk_ins];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.delete = function(winery_id, callback) {
    var query = 'DELETE FROM winery WHERE winery_id = ?';
    var queryData = [winery_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
/*
exports.update = function(params, callback) {
    var query = 'UPDATE winery SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
*/
