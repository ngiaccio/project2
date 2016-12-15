var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM area;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.getById = function(area_id, callback) {
    var query = 'SELECT * FROM area WHERE area_id = ?';
    var queryData = [area_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.insert = function(params, callback) {
    var query = 'INSERT INTO area (area_name) VALUES (?)';
    var queryData = [params.area_name];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.delete = function(area_id, callback) {
    var query = 'DELETE FROM area WHERE area_id = ?';
    var queryData = [area_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
/*
exports.edit = function(area_id, callback) {
    var query = 'CALL area_getinfo(?)';
    var queryData = [area_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
exports.update = function(params, callback) {
    var query = 'UPDATE area SET area_name = ? WHERE area_id = ?';
    var queryData = [params.area_name, params.area_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
}; */