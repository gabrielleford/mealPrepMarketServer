const router = require('express').Router();
const { Listing } = require('../models');
const validateJWT = require('../middleware/validateJWT');
const { ROLES, authRole } = require('../middleware/permissions');
const User = require('../models/user');

// ** CREATE LISTING ** //
router.post('/create', validateJWT, authRole(ROLES.primary), async(req, res) => {
  const { title, description, image, price, tag } = req.body.listing;

  // Backend form validation
  if (title.length < 3) 
    return res.status(400).json({
      message: 'Title must be at least 3 characters'
    });

  if (description.length < 20) return res.status(400).json({ message: 'Description must be at least 20 characters'})
  else if (description.length > 2000) return res.status(400).json({
    message: `Description is ${description.length - 2000} characters over the limit`
  })

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
router.get('/all', async (req, res) => {
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
router.get('/one/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const listing = await Listing.findOne({
      where: {
        id: id
      },
      include: [{
        model: User,
      }]
    })

    res.status(200).json(listing);
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to fetch post: ${error}`
    })
  }
})

// ** UPDATE LISTING ** //
router.put('/edit/:id', validateJWT, authRole(ROLES.primary), async (req, res) => {
  const { title, description, image, price, tag } = req.body.listing;
  const id = req.params.id;
  const userID = req.id;

    // Backend form validation
    if (title.length < 3) 
    return res.status(400).json({
      message: 'Title must be at least 3 characters'
    });

  if (description.length < 20) return res.status(400).json({ message: 'Description must be at least 20 characters'})
  else if (description.length > 2000) return res.status(400).json({
    message: `Description is ${description.length - 2000} characters over the limit`
  })

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

  const updatedListing = {
    title,
    description,
    image,
    price,
    tag
  }

  const listingOwner = await Listing.findOne({
    where: {
      id: id
    }
  });

  if (JSON.parse(JSON.stringify(listingOwner)).userId === userID || req.user.role === 'admin' || req.user.role === 'main admin') {
    const query = {
      where: {
        id: id,
      }
    }

    try {
      await Listing.update(updatedListing, query);

      res.status(201).json({
        message: 'Listing successfully updated',
        listing: updatedListing
      });
    } 
    catch (error) {
      res.status(500).json({
        message: `Failed to update post: ${error}`
      });
    }
  } else {
    res.status(403).json({
      message: 'You can only update your own listing'
    });
  }
})

// ** DELETE LISTING ** //
router.delete('/delete/:id', validateJWT, authRole(ROLES.primary), async (req, res) => {
  const id = req.params.id;
  const userID = req.id;

  const listingOwner = await Listing.findOne({
    where: {
      id: id
    }
  })

  if (JSON.parse(JSON.stringify(listingOwner)).userId === userID || req.user.role === 'admin' || req.user.role === 'main admin') {
    const query = {
      where: {
        id: id
      }
    }

    try {
      await Listing.destroy(query)

      res.status(200).json({
        message: 'Listing successfully deleted'
      });
    } 
    catch (error) {
      res.status(500).json({
        message: `Failed to delete listing: ${error}`
      });
    }
  } else {
    res.status(403).json({
      message: 'You can only delete your own listing'
    });
  }
})

module.exports = router;