const router = require('express').Router();
const { response } = require('express');
const { Listing } = require('../models');

router.post('/create', async(req, res) => {
  const { title, description, image, price, tag } = req.body.listing;

  // Backend form validation
  if (title.length < 3) return res.status(400).json({message: 'Title must be at least 3 characters'});

  if (description.length < 20) return res.status(400).json({ message: 'Description must be at least 20 characters'})
  else if (description.length > 2000) return res.status(400).json({
    message: `Description is ${description.length - 2000} characters over the limit`
  })

  if (!image) return res.status(400).json({
    message: 'Image required'
  });

  if (!price) return res.status(400).json({
    message: 'Price required'
  });

  if(tag.length < 1) return res.status(400).json({
    message: 'Select at least one tag for your listing'
  })

  // Create new listing
  try {

  }
  catch {

  }
  
})
