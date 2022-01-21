const router = require('express').Router();
const { Listing } = require('../models');
const validateJWT = require('../middleware/validateJWT');

// ** CREATE LISTING ** //
router.post('/create', validateJWT, async(req, res) => {
  const { title, description, image, price, tag } = req.body.listing;

  // Backend form validation
  if (title.length < 3) 
    return res.status(400).json({
      message: 'Title must be at least 3 characters'
    });

  // if (description.length < 20) return res.status(400).json({ message: 'Description must be at least 20 characters'})
  // else if (description.length > 2000) return res.status(400).json({
  //   message: `Description is ${description.length - 2000} characters over the limit`
  // })

  if (!image) 
    return res.status(400).json({
      message: 'Image required'
    });

  if (!price) 
    return res.status(400).json({
      message: 'Price required'
    });
  else if (price > 999.99)
    return res.status(400).json({
      message: 'Price too high'
    });

  if(tag.length < 1)
    return res.status(400).json({
      message: 'Select at least one tag for your listing'
    });

  // Create new listing
  try {
    const listing = await Listing.create({
      title,
      description,
      image,
      price,
      tag,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Listing created successfully',
      listing: listing
    });
  }
  catch (error) {
    res.status(500).json({
      message: `Failed to create listing: ${error}`
    });
  }
  
});

// ** GET ALL LISTINGS ** //
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.status(200).json(listings);
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to get listings: ${error}`
    });
  }
})

// ** GET LISTING BY ID ** //
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const listing = await Listing.findOne({
      where: {
        id: id
      }
    })

    res.status(200).json(listing);
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to fetch post: ${error}`
    })
  }
})

module.exports = router;