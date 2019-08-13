const express = require('express');
const Gig = require('../models/Gig');
const { searchGigs, addGigs } = require('../controlers/Gigs');

const router = express.Router();

//Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.render('gigs', {
        gigs
      });
    })
    .catch((err) => console.log(err)));

router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', async (req, res) => {
  const { title, description, contact_email,budget, technologies } = req.body;
  try {
  const response = await addGigs({title, description, contact_email, budget, technologies})
  if (response.errors) {
    const { errors, title, technologies, description, budget, contact_email } = response
    return res.render('add', {
      errors,
      title, technologies, description, budget, contact_email
    });
  }  
  return res.redirect('/gigs');
} catch (err) {
    console.log(err)
  }
})

// Search for gigs
router.get('/search', async (req, res) => {
  const { term } = req.query;

  res.render('gigs', { gigs: await searchGigs(term) })
});
module.exports = router;
