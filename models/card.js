const path = require("path");
const fs = require("fs");

const pathCard = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(course) {
    const card = await Card.fetch();

    const index = card.courses.findIndex((c) => c.id === course.id);

    const candidate = card.courses[index];
    if (candidate) {
      candidate.count++;
      card.courses[index] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += course.price * 1;

    return new Promise((res, rej) => {
      fs.writeFile(pathCard, JSON.stringify(card), (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const index = card.courses.findIndex((c) => c.id === id);
    const course = card.courses[index];

    if (course.count === 1) {
      card.courses = card.courses.filter((c) => c.id !== id);
    } else {
      card.courses[index].count--;
    }

    card.price -= course.price * 1;

    return new Promise((res, rej) => {
      fs.writeFile(pathCard, JSON.stringify(card), (err) => {
        if (err) {
          rej(err);
        } else {
          res(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((res, rej) => {
      fs.readFile(pathCard, "utf-8", (err, content) => {
        if (err) {
          rej(err);
        } else {
          res(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
