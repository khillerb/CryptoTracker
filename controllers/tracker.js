
const passport = require('passport');
const finnhub = require('finnhub');
const mongoose = require('mongoose');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY
const finnhubClient = new finnhub.DefaultApi();
const User = require('../models/user');
const Tracker = require('../models/tracker');
const Profile = require('../models/profile');



module.exports = {
    index,
    new: newTracker,
    show,
    search,
    update,
    delete: deleteTracker,
    profile: companyprofile
}

function index(req, res) {
    if (req.user) {
        Tracker.find({'user':req.user._id}, (err, trackers) => {
            if (err) return handleError(err);
            res.render('trackers/index', { title: 'Portfolio', trackers});
          });
        
    } else {
        res.render('trackers/new', {title:'Search or Log In!'});
    }
    
}

function newTracker(req, res) {
  res.render('trackers/new', { title: 'Add Tracker' });
}
function search(req, res) {
    
        
        finnhubClient.quote(req.query.Symbol, (error, data, response) => {
            
            console.log(response.body);
            if (error) console.log(error);
            if (req.user) {
                const tracker = new Tracker({
                    user: req.user._id,
                    symbol: req.query.Symbol,
                    openPrice: response.body.o,
                    todayHigh: response.body.h,
                    todayLow: response.body.l,
                    currentPrice: response.body.c,
                    previousClose: response.body.pc,
                });
                tracker.save(function (err){
                    res.redirect('/')
                })

            } else {
                const obj = {
                                symbol: req.query.Symbol,
                                openPrice: response.body.o,
                                todayHigh: response.body.h,
                                todayLow: response.body.l,
                                currentPrice: response.body.c,
                                previousClose: response.body.pc,
                            }
                console.log(obj)            
                res.render('trackers/show', {title:'Stock Detail', obj});
            }

            
            
        });   
        
}
function update(req,res) {
    Tracker.findById(req.params.id,(err,tracker) =>{
        finnhubClient.quote(tracker.symbol, (error, data, response) => {
            const trackerObj = {
                openPrice: response.body.o,
                todayHigh: response.body.h,
                todayLow: response.body.l,
                currentPrice: response.body.c,
                previousClose: response.body.pc
            }
            if (error) console.log(error);
            Tracker.findByIdAndUpdate(req.params.id, trackerObj,(err, tracker) => {
                if (err) console.log(err);    
                res.redirect(`/trackers/${tracker._id}`)
            })   
        })
    })
}

function show(req, res) {
    Tracker.findById(req.params.id)
    .then(obj => {
        res.render('trackers/show', { title: 'Stock Detail', obj});
    })
}
function deleteTracker(req, res) {
    Tracker.findByIdAndDelete(req.params.id, function(err) {
        
        if (err) {
           console.log(err);
           res.redirect(`/trackers/${req.params.id}`); 
        } else {
            res.redirect('/trackers');
        }
    });
}
function companyprofile(req,res){   
    
    Tracker.findById(req.params.id, (err,tracker) => {
        if (err) console.log(err);
        finnhubClient.companyProfile2({'symbol' : tracker.symbol}, (error, data, response) => {
            console.log(response.body)
            if (error) console.log(error);
            const profile = new Profile({
                name: response.body.name,
                country: response.body.country,
                currency: response.body.currency,
                finnhubIndustry: response.body.finnhubIndustry,
                exchange: response.body.exchange
            }) 
            profile.save((err) => {
                console.log(err)
            })
            tracker.companyProfile = profile._id
            tracker.save((err) => {
                if (err) {
                    console.log(err)
                    res.redirect('/trackers')
                } else {
                    res.render('trackers/detail',{title: 'Details', profile})
                }
            })
        })
    })
}



