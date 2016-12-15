var express = require('express');
var router = express.Router();
var area_dal = require('../model/area_dal');


// View All areas
router.get('/all', function(req, res) {
    area_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('area/areaViewAll', {'result':result});
        }
    });

});
//
//
// View the area for the given id
router.get('/', function(req, res){
    if(req.query.area_id == null) {
        res.send('area_id is null');
    }
    else {
        area_dal.getById(req.query.area_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('area/areaViewById', {'result': result});
           }
        });
    }
});
//
//
//
router.get('/edit', function(req, res){
    if(req.query.area_id == null) {
        res.send('A Variety ID is required');
    }
    else {
        area_dal.edit(req.query.area_id, function(err, result){
            res.render('area/areaUpdate', {area: result});
        });
    }

});
//
//
// Return the add a new area form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    area_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('area/areaAdd', {'result': result});
        }
    });
});

// View the area for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.area_name == '') {
        res.send('Please enter a School Name!');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        area_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/area/all');
            }
        });
    }
});
//
//
// Delete a area for the given area_id
router.get('/delete', function(req, res){
    if(req.query.area_id == null) {
        res.send('area_id is null');
    }
    else {
        area_dal.delete(req.query.area_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/area/all');
            }
        });
    }
});
//
//
//
router.get('/edit', function(req, res){
    if(req.query.area_id == null) {
        res.send('An area id is required');
    }
    else {
        area_dal.getById(req.query.area_id, function(err, area) {
                res.render('area/areaUpdate', {area: area});
        });
    }
});
//
//
//
router.get('/update', function(req, res){
    area_dal.update(req.query, function(err, result){
       res.redirect(302, '/area/all');
    });
});

module.exports = router;
