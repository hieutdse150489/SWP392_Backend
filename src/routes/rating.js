const express = require('express')
const routerRating = express.Router()
const RatingController = require('../app/controllers/RatingController')
const { authenticatedStaff } = require('../config/db/authenticatedStaff')




routerRating
    .route("/:id")
    .get(RatingController.getOne)
    .put(RatingController.put)
    .delete(authenticatedStaff, RatingController.delete)
routerRating
    .route("/")
    .get(authenticatedStaff, RatingController.get)
    .post(RatingController.post)


module.exports = routerRating