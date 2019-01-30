const errors = require("restify-errors");
const Washroom = require("../models/Washroom");

module.exports = server => {
  //Get Washrooms
  server.get("/washrooms", async (req, res, next) => {
    // res.send({ msg: "test" });
    try {
      const washrooms = await Washroom.find({});
      res.send(washrooms);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  //Add Washroom
  server.post("/washrooms", async (req, res, next) => {
    //Check for JSON
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    const { name, long, lat, address, wheelchair } = req.body;
    const washroom = new Washroom({ name, long, lat, address, wheelchair });
    try {
      const newWashroom = await washroom.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });
};
