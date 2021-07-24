const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

function mapCardItems(card) {
  return card.items.map((c) => ({
    ...c.courseId._doc,
    count: c.count,
  }));
}

function computePrice(courses) {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count);
  }, 0);
}

router.post("/add", async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCard(course);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("card.items.courseId").execPopulate();

  const courses = mapCardItems(user.card);

  res.render("card", {
    title: "Корзина",
    isCard: true,
    courses: courses,
    price: computePrice(courses),
  });
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.json(card);
});

module.exports = router;
