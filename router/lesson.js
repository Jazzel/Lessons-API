const router = require("express").Router();

const Lesson = require("../models/lesson");

// GET /api/lessons
// Returns all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// POST /api/lessons
// Creates a new lesson
router.post("/", async (req, res) => {
  try {
    const { topic, price, location, space } = req.body;
    const lesson = new Lesson({
      topic,
      price,
      location,
      space,
    });
    await lesson.save();
    res.json(lesson);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT /api/lessons/:id
// Updates a lesson
router.put("/:id", async (req, res) => {
  try {
    const { topic, price, location, space } = req.body;
    const lesson = await Lesson.findOneAndUpdate(
      { _id: req.params.id },
      { topic, price, location, space },
      { new: true }
    );
    res.json(lesson);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// DELETE /api/lessons/:id
// Deletes a lesson
router.delete("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findOneAndDelete({ _id: req.params.id });
    res.json(lesson);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
