import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//2) ROUTE HANDLERS
export function getAllTours(req, res) {
  console.log('get all tours', req.body);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

export function getTourById(req, res) {
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

export function createTour(req, res) {
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

export function updateTourById(req, res) {
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

export function deleteTourById(req, res) {
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
