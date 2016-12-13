var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from view_all';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.getById = function(wine_id, callback) {
    var query = 'select * from view_all where wine_id = ?';
    var queryData = [wine_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.insert = function(params, callback) {
// insert into wine
    var query = 'INSERT INTO wine (winery_id, vintage, type) VALUES (?,?,?)';
    var queryData = [params.winery_id, params.vintage, params.type];
    connection.query(query, queryData, function(err, result) {
        var query1 = 'INSERT INTO wine_area (area_id, wine_id) VALUES ?';
        var queryData1 = [params.area_id, params.wine_id];
        var query2 = 'INSERT INTO wine_variety (variety_id, wine_id) VALUES ?';
        var queryData2 = [params.variety_id, params.wine_id];

        // table: wine_area
        connection.query(query1, queryData1, function(err, result){
        });

        // table: wine_variety
        connection.query(query2, queryData2, function(err, result){
        });
        callback(err, result);
    });
};
//
//
//
exports.delete = function(wine_id, callback) {
    var query = 'DELETE FROM wine WHERE wine_id = ?';
    var queryData = [wine_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.update = function(params, callback) {
    var query = 'UPDATE wine SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//
//
//
exports.edit = function(wine_id, callback) {
    var query = 'CALL wine_getinfo(?)';
    var queryData = [wine_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // //           //
                                                                                 // FUNCTIONS //
                                                                                 //           // // // //
// wine table
var wineInsert = function(winery_id, vintage, type, callback){
    var query = 'INSERT INTO wine (winery_id, vintage, type) VALUES (?,?,?)';
    var queryData = [winery_id, vintage, type];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};  module.exports.wineInsert = wineInsert;

        // wine_area table
var wineAreaInsert = function(wine_id, area_id, callback){
    var query = 'INSERT INTO wine_area (area_id, wine_id) VALUES (?,?)';
    var queryData = [wine_id, area_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};  module.exports.wineAreaInsert = wineAreaInsert;

// wine_variety table
var wineVarietyInsert = function(wine_id, variety_id, callback){
    var query = 'INSERT INTO wine_variety (variety_id, wine_id) VALUES (?,?)';
    var queryData = [wine_id, variety_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};  module.exports.wineVarietyInsert = wineVarietyInsert;