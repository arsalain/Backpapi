import Trek from "../Model/Trek.js";
import multer from "multer"

export const getTreks= async (req,res,next)=>{
    try {
      let treks = await Trek.find({filtertype:{
        "$ne": "recommended"
      }});
      let {q} = req.query;
      console.log(q)
      if (q) {
        treks = treks.filter(x => x.name.toLowerCase().includes(q))
    }
      res.status(200).json(treks.splice(0,3));
    } catch (err) {
      next(err);
    }
  }
  export const getTrekrecom = async (req,res,next)=>{
    try {
      const treks = await Trek.find({filtertype:"recommended"});
      res.status(200).json(treks);
    } catch (err) {
      next(err);
    }
  }
  export const getTreklong = async (req,res,next)=>{
    try {
      const treks = await Trek.find({filtertype:"long"});
      res.status(200).json(treks);
    } catch (err) {
      next(err);
    }
  }
  export const getTrekshort = async (req,res,next)=>{
    try {
      const treks = await Trek.find({filtertype:"short"});
      res.status(200).json(treks);
    } catch (err) {
      next(err);
    }
  }
  export const getTrekwaterfall = async (req,res,next)=>{
    try {
      const treks = await Trek.find({filtertype:"waterfall"});
      res.status(200).json(treks);
    } catch (err) {
      next(err);
    }
  }

  export const getTrek = async (req,res,next)=>{
    try {
      const treks = await Trek.find({filtertype:"recommended"});
      const {q} = req.query;
      const keys = ["name","state","amount"]

    treks =  treks.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(q))
        )
      
      res.status(200).json(treks);
    } catch (err) {
      next(err);
    }
  }

  
  export const createTrek = async (req, res, next) => {

        const newTrek = new Trek({name:req.body.name ,
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
         newTrek.save();
          res.status(200).json(newTrek);
        } catch (err) {
          next(err);
        }
      

  };
 
  