const router = require('express').Router();
const { Order } = require('../models');
const validateJWT = require('../middleware/validateJWT');

router.post('/:listingid', validateJWT, async (req, res) => {
  const { quantity, fulfillmentMethod } = req.body.order;
  const listingId = req.params.listingid;
  
  //Backend form validation
  if (!quantity)
    return res.status(400).json({
      message: 'Quantity required'
    });

  try {
    const order = await Order.create({
      quantity,
      fulfillmentMethod,
      userId: req.user.id,
      listingId: listingId,
    });

    res.status(201).json({
      message: 'Order placed',
      order: order
    })
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to place order: ${error}`
    });
  }
})

module.exports = router;