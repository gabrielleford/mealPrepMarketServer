const router = require('express').Router();
const { Order, Listing, User } = require('../models');
const validateJWT = require('../middleware/validateJWT');
const { authRole, ROLES } = require('../middleware/permissions');

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
      },
      include: [{
        model: Listing
      }]
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
router.get('/fulfillment/:id', validateJWT, authRole(ROLES.primary), async (req, res) => {
  const id = req.params.id;
  const userID = req.id;

  const listingOwner = await Listing.findAll({
    where: {
      userId: id
    }
  })

  try {
    if (JSON.parse(JSON.stringify(listingOwner)).userId === userID  || req.user.role === 'admin') {
      const orders = await Listing.findAll({
        where: {
          userId: userID,
        },
        include: [{
          model: Order,
          include: [{
            model: User
          }]
        }]
      })
  
      res.status(200).json(orders);
    } else {
      res.status(403).json({
        message: 'Forbidden'
      })
    }
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
  const userID = req.id;

  const orderOwner = await Order.findOne({
    where: {
      id: id
    }
  })

  try {
    if (JSON.parse(JSON.stringify(orderOwner)).userId === userID  || req.user.role === 'admin') {
      const query = {
        where: {
          id: id,
          userId: userID
        }
      }
  
      await Order.destroy(query);
  
      res.status(200).json({
        message: 'Order canceled'
      })
    } else {
      res.status(403).json({
        message: 'Forbidden'
      })
    }

  }
  catch (error) {
    res.status(500).json({
      message: `Failed to cancel order: ${error}`
    })
  }
})

module.exports = router;