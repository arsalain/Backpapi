import Tour from "../Model/Tour.js";


export const createTour = async (req, res, next) => {

    const newTour = new Tour({name:req.body.name ,
      state: req.body.state,
      date: req.body.date,
      day: req.body.day,
      daynight: req.body.daynight,
      type: req.body.type,
      person: req.body.person,
      amount: req.body.amount,
      filtertype: req.body.filtertype,
      testimage: req.file.filename
  });
  console.log(req.file.filename)
    try {
     newTour.save();
      res.status(200).json(newTour);
    } catch (err) {
      next(err);
    }
  

};
export const getTours= async (req,res,next)=>{
    try {
      let tours = await Tour.find({filtertype:{
        "$ne": "recommended"
      }});
      let {q} = req.query;
      console.log(q)
      if (q) {
        tours = tours.filter(x => x.name.toLowerCase().includes(q))
    }
      res.status(200).json(tours.splice(0,3));
    } catch (err) {
      next(err);
    }
  }
  export const getTourrecom = async (req,res,next)=>{
    try {
      const tours = await Tour.find({filtertype:"recommended"});
      res.status(200).json(tours);
    } catch (err) {
      next(err);
    }
  }
  export const getTourlong = async (req,res,next)=>{
    try {
      const tours = await Tour.find({filtertype:"long"});
      res.status(200).json(tours);
    } catch (err) {
      next(err);
    }
  }
  export const getTourweekend = async (req,res,next)=>{
    try {
      const tours = await Tour.find({filtertype:"weekend"});
      res.status(200).json(tours);
    } catch (err) {
      next(err);
    }
  }


  
 
  