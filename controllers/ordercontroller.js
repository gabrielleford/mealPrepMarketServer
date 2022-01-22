const router = require('express').Router();
const { Order, Listing, User } = require('../models');
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

// ** GET SECONDARY USER ORDERS ** //
router.get('/myOrders', validateJWT, async (req, res) => {
  const id = req.id;

  try {
    const orders = await Order.findAll({
      where: {
        userId: id
      }
    });

    res.status(200).json(orders);
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to fetch orders: ${error}`
    });
  }
})

// ** GET PRIMARY ORDERS TO BE FULFILLED ** //
router.get('/fulfillment', validateJWT, async (req, res) => {
  const id = req.id;

  try {
    const orders = await Listing.findAll({
      where: {
        userId: id
      },
      include: [{
        model: Order,
        include: [{
          model: User
        }]
      }]
    })

    res.status(200).json(orders);
  } 
  catch (error) {
    res.status(500).json({
      message: `Failed to fetch orders: ${error}`
    });
  }
})

// ** DELETE ORDER ** //
router.delete('/:id', validateJWT, async (req, res) => {
  const id = req.params.id;
  const userId = req.id;

  try {
    const query = {
      where: {
        id: id,
        userId: userId
      }
    }

    await Order.destroy(query);

    res.status(200).json({
      message: 'Order canceled'
    })
  }
  catch (error) {
    res.status(500).json({
      message: `Failed to cancel order: ${error}`
    })
  }
})

module.exports = router;