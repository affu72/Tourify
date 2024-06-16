import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

// middleware -> simply just a function that modify the incoming request data.
//this is in the middle of req and res.
app.use(express.json()); // this middleware put add the data from the body to the req.

//__dirname is not defined in ES module scope. -> TODO: Learn about this
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));//parse it to javascript object

//The callback function is called route handler. 
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: "success",
    results:tours.length,
    data: {
      tours
    } 
  });
})


app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour)
    return res.status(404).json({
      status: `NOT FOUND`,
      message: `Tour with id ${id} is not found`,
    });

  // console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});


//req contains the data that is send from the client
//express does not put the body data on the request directly,
//in order to have that data available we will have to something use the middleware

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-sample.json`,JSON.stringify(tours), (err => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    }); //to complete the request response cycle
  }));
});

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    if (id>=tours.length) return res.status(404).json({
        status: `NOT FOUND`,
        message: `Tour with id ${id} is not found`,
      });
  
  
   res.status(200).json({
     status: 'success',
     data: {
       tour: '<You will get the updated tour here ....>',
     },
   });
});


app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length)
    return res.status(404).json({
      status: `NOT FOUND`,
      message: `Tour with id ${id} is not found`,
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<You will get the deleted tour here ...>',
    },
  });
});

const port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));