import express from 'express'
import { getAllTours,getTourById,createTour,deleteTourById,updateTourById } from '../controller/tourController.js';

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(val);
  next()
})

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

export default router;