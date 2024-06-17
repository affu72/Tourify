import express from 'express'
import { checkID,checkBody } from '../controller/tourController.js';
import { getAllTours,getTourById,createTour,deleteTourById,updateTourById } from '../controller/tourController.js';

const router = express.Router();

router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody,createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

export default router;