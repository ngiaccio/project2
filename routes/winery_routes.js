var express = require('express');
var router = express.Router();
var winery_dal = require('../model/winery_dal');


// View All winerys
router.get('/all', function(req, res) {
    winery_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('winery/wineryViewAll', { 'result':result });
        }
    });
});
//
//
// View the winery for the given id
router.get('/', function(req, res){
    if(req.query.winery_id == null) {
        res.send('winery_id is null');
    }
    else {
        winery_dal.getById(req.query.winery_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('winery/wineryViewById', {'result': result});
           }
        });
    }
});
//
//
//
router.get('/edit', function(req, res){
    if(req.query.winery_id == null) {
        res.send('A Winery ID is required');
    }
    else {
        winery_dal.edit(req.query.winery_id, function(err, result){
            res.render('winery/wineryUpdate', {winery: result});
        });
    }

});
//
//
//
// Return the add a new winery form
router.get('/add', function(req, res){
    winery_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('winery/wineryAdd', { 'result':result });
        }
    });
});

// View the winery for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.winery_name == null) {
        res.send('A Winery Name must be entered.');
    }
    else if(req.query.city == null) {
        res.send('A City must be entered.');
    }
    else if(req.query.phone_num == null) {
        res.send('A Phone Number must be entered.');
    }
    else if(req.query.walk_ins == null) {
        res.send('Please choose if the winery is walk-in friendly or not.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        winery_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/winery/all');
            }
        });
    }
});
//
//
//
/*
router.get('/edit', function(req, res){
    if(req.query.school_id == null) {
        res.send('A winery id is required');
    }
    else {
        school_dal.edit(req.query.school_id, function(err, result){
            res.render('winery/schoolUpdate', {winery: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
   if(req.query.school_id == null) {
       res.send('A winery id is required');
   }
   else {
       school_dal.getById(req.query.school_id, function(err, winery){
           address_dal.getAll(function(err, address) {
               res.render('winery/schoolUpdate', {winery: winery[0], address: address});
           });
       });
   }

});

router.get('/update', function(req, res){
    school_dal.update(req.query, function(err, result){
       res.redirect(302, '/winery/all');
    });
});

// Delete a winery for the given school_id
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
                 res.redirect(302, '/winery/all');
             }
         });
    }
});

*/
module.exports = router;
