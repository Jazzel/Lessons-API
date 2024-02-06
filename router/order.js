const router = require("express").Router();

const Order = require("../models/order");

// GET /api/orders
// Returns all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// POST /api/orders
// Creates a new order
router.post("/", async (req, res) => {
  try {
    const { name, phoneNumber, lessonId, numberOfSpaces } = req.body;
    const order = new Order({
      name,
      phoneNumber,
      lessonId,
      numberOfSpaces,
    });
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT /api/orders/:id
// Updates a order
router.put("/:id", async (req, res) => {
  try {
    const { name, price, location, space } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { name, price, location, space },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// DELETE /api/orders/:id
// Deletes a order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id });
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
