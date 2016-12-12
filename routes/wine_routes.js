var express = require('express');
var router = express.Router();
var wine_dal = require('../model/wine_dal');
var area_dal = require('../model/area_dal');
var variety_dal = require('../model/variety_dal');
var winery_dal = require('../model/winery_dal');
//
//
// View All wines
router.get('/all', function(req, res) {
    wine_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('wine/wineViewAll', { 'result':result });
        }
    });

});
//
//
// View the wine for the given id
router.get('/', function(req, res){
    if(req.query.wine_id == null) {
        res.send('wine_id is null');
    }
    else {
        wine_dal.getById(req.query.wine_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('wine/wineViewById', {'result': result});
           }
        });
    }
});
//
//
//
router.get('/edit', function(req, res){
    if(req.query.wine_id == null) {
        res.send('A Wine ID is required');
    }
    else {
        wine_dal.edit(req.query.wine_id, function(err, result){
            res.render('wine/wineUpdate', {wine: result});
        });
    }

});
//
//
// Return the add a new wine form
router.get('/add', function(req, res) {
    // passing all the query parameters (req.query) to the insert function instead of each individually
    wine_dal.getAll(function (err, wine) {
        winery_dal.getAll(function (err, winery) {
            area_dal.getAll(function (err, area) {
                variety_dal.getAll(function (err, variety) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('wine/wineAdd', {'wine': wine,
                            'winery': winery, 'area': area, 'variety': variety});
                    }
                });
            });
        });
    });
});
//
//
// View the wine for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.winery_id == null) {
        res.send('A Winery must be selected.');
    }
    else if(req.query.variety_id == null) {
        res.send('A Variety must be selected.');
    }
    else if(req.query.area_id == null) {
        res.send('An Area must be selected.');
    }
    else if(req.query.vintage == null) {
        res.send('A four-integer Vintage must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        wine_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/wine/all');
            }
        });
    }
});
//
//
//
router.get('/edit', function(req, res){
    if(req.query.wine_id == null) {
        res.send('A wine id is required');
    }
    else {
        wine_dal.edit(req.query.wine_id, function(err, result){
            res.render('wine/wineUpdate', {wine: result[0][0], wine: result[1]});
        });
    }

});
//
//
//
router.get('/edit2', function(req, res){
   if(req.query.wine_id == null) {
       res.send('A wine id is required');
   }
   else {
       wine_dal.getById(req.query.wine_id, function(err, wine){
           wine_dal.getAll(function(err, wine) {
               res.render('wine/wineUpdate', {wine: wine[0], wine: wine});
           });
       });
   }
});
//
//
//
router.get('/update', function(req, res){
    wine_dal.update(req.query, function(err, result){
       res.redirect(302, '/wine/all');
    });
});

// Delete a wine for the given wine_id
router.get('/delete', function(req, res){
    if(req.query.wine_id == null) {
        res.send('wine_id is null');
    }
    else {
         wine_dal.delete(req.query.wine_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/wine/all');
             }
         });
    }
});

module.exports = router;