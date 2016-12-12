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
            res.render('area/areaViewAll', { 'result':result });
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
//

/*
// Return the add a new area form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('area/schoolAdd', {'address': result});
        }
    });
});

// View the area for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.school_name == null) {
        res.send('School Name must be provided.');
    }
    else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        school_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/area/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.school_id == null) {
        res.send('A area id is required');
    }
    else {
        school_dal.edit(req.query.school_id, function(err, result){
            res.render('area/schoolUpdate', {area: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
   if(req.query.school_id == null) {
       res.send('A area id is required');
   }
   else {
       school_dal.getById(req.query.school_id, function(err, area){
           address_dal.getAll(function(err, address) {
               res.render('area/schoolUpdate', {area: area[0], address: address});
           });
       });
   }

});

router.get('/update', function(req, res){
    school_dal.update(req.query, function(err, result){
       res.redirect(302, '/area/all');
    });
});

// Delete a area for the given school_id
router.get('/delete', function(req, res){
    if(req.query.school_id == null) {
        res.send('school_id is null');
    }
    else {
         school_dal.delete(req.query.school_id, function(err, result){
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

*/
module.exports = router;
