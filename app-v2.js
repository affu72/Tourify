import express from 'express';
import morgan from 'morgan';

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  // console.log("Middleware");
  next();
})


const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) ROUTE HANDLERS
function getAllTours(req, res) {
  console.log("get all tours",req.body);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

function getTourById(req, res) {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour)
    return res.status(404).json({
      status: `NOT FOUND`,
      message: `Tour with id ${id} is not found`,
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

function createTour(req, res) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-sample.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}

function updateTourById(req, res) {
  const id = req.params.id * 1;
  if (id >= tours.length)
    return res.status(404).json({
      status: `NOT FOUND`,
      message: `Tour with id ${id} is not found`,
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<You will get the updated tour here ....>',
    },
  });
}

function deleteTourById(req, res) {
  const id = req.params.id * 1;
  if (id >= tours.length)
    return res.status(404).json({
      status: `NOT FOUND`,
      message: `Tour with id ${id} is not found`,
    });

  res.status(200).json({
    status: 'success',
    data: null,
  });
}

//3) ROUTES 

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTourById);
// app.delete('/api/v1/tours/:id', deleteTourById);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

//4) START SERVER

const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
