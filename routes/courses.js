const { Router } = require("express");
const Course = require("../models/course");
const router = Router();
const auth=require('../middleware/auth');

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().lean().populate('userId', 'email name').select('price title img');
       res.render("courses", {
      title: "Курсы",
      isCourses: true,
      courses,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/edit",auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try {
    const course = await Course.findById(req.params.id).lean();
    res.render("course-edit", {
      title: `Редактировать ${course.title}`,
      course,
    });
  } catch (error) {
    console.log(error);
  }
 
});

router.post("/edit",auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  try {
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  } 
});

router.post("/remove",auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect('/courses')
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean();
    res.render("course", {
      layout: "empty",
      title: `Курс ${course.title}`,
      course,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
