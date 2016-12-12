var express = require('express');
var router = express.Router();
var variety_dal = require('../model/variety_dal');


// View All varietys
router.get('/all', function(req, res) {
    variety_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('variety/varietyViewAll', { 'result':result });
        }
    });

});
//
//
// View the variety for the given id
router.get('/', function(req, res){
    if(req.query.variety_id == null) {
        res.send('variety_id is null');
    }
    else {
        variety_dal.getById(req.query.variety_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('variety/varietyViewById', {'result': result});
           }
        });
    }
});
//
//
//
router.get('/edit', function(req, res){
    if(req.query.variety_id == null) {
        res.send('A Variety ID is required');
    }
    else {
        variety_dal.edit(req.query.variety_id, function(err, result){
            res.render('variety/varietyUpdate', {variety: result});
        });
    }

});
//
//
//

/*
// Return the add a new variety form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('variety/schoolAdd', {'address': result});
        }
    });
});

// View the variety for the given id
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
                res.redirect(302, '/variety/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.school_id == null) {
        res.send('A variety id is required');
    }
    else {
        school_dal.edit(req.query.school_id, function(err, result){
            res.render('variety/schoolUpdate', {variety: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
   if(req.query.school_id == null) {
       res.send('A variety id is required');
   }
   else {
       school_dal.getById(req.query.school_id, function(err, variety){
           address_dal.getAll(function(err, address) {
               res.render('variety/schoolUpdate', {variety: variety[0], address: address});
           });
       });
   }

});

router.get('/update', function(req, res){
    school_dal.update(req.query, function(err, result){
       res.redirect(302, '/variety/all');
    });
});

// Delete a variety for the given school_id
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
                 res.redirect(302, '/variety/all');
             }
         });
    }
});

*/
module.exports = router;
