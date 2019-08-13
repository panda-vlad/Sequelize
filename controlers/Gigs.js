const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


 const searchGigs = async (term) =>  {
         // Make lowercase
        term = term.toLowerCase();
        //const listGigs = await Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } });
        const listGigs = await new Promise((resolve, reject) => {
            Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
            .then((gigs) => resolve(gigs))
            .catch(err => reject(err))
        })
         return listGigs
}


const addGigs = async ({ title, description, contact_email, budget, technologies }) => {

  const errors = [];
  // Validate
  if (!title) {
      console.log(222222222222222, title)
    errors.push({ text: 'Please add title' });
  }

  if (!technologies) {
    errors.push({ text: 'Please add technologies' });
  }

  if (!description) {
    errors.push({ text: 'Please add technologies' });
  }

  if (!contact_email) {
    errors.push({ text: 'Please add technologies' });
  }

  // Check
  if (errors.length > 0) {
    // res.render('add', {
    //   errors,
    //   title, technologies, description, budget, contact_email
    // });
    return {
        errors,
        title, technologies, description, budget, contact_email
      }
    } else {
        if (!budget) {
        budget = 'Unknown';
        } else {
        budget = `$${budget}`;
        }
        // male lowerCase remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');
        try {
        return Gig.create({title,technologies,description,budget,contact_email});    
        } catch (err) {
            return errors.push(err)
        }
    }
}
module.exports = {
    searchGigs,
    addGigs
}