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
  export const getTreksall = async (req,res,next)=>{
    try {
      const treks = await Trek.find();
      // res.status(200).json(treks);
      res.status(200).json({ success: true, data: treks });
    } catch (err) {
      res.status(500).json({ success: false, error: error.message });
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

  

  
export const getTrekById = async (req, res) => {
  try {
    const id = req.params.id;
    // const Trekdata = await Trek.findById(id).populate('batches'); 
     const Trekdata = await Trek.findById(id); 
    if (!Trekdata) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(Trekdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
export const createTrek = async (req, res, next) => {

  const TrekData = {
          name:req.body.name ,
          fromamount: req.body.fromamount,
          maintype: req.body.maintype,
          statetype: req.body.statetype,
          reserveamount:req.body.reserveamount,
          for: req.body.for,
          day: req.body.day,
          trektype: req.body.trektype,
          trektypename : req.body.trektypename,
          level: req.body.level,
          levelname: req.body.levelname,
          service: req.body.service,
          servicename: req.body.servicename,
          state: req.body.state,
          statename : req.body.statename,
          expertpara:req.body.expertpara,
          lead1name:req.body.lead1name,
          lead1oc:req.body.lead1oc,
          lead1pimgalt:req.body.lead1pimgalt,
          lead2name:req.body.lead2name,
          lead2oc: req.body.lead2oc,
          lead2pimgalt: req.body.lead2pimgalt,
          itinerary: req.body.itinerary,
          expectpara: req.body.expectpara,
          expecthead1: req.body.expecthead1,
          expecthead1para: req.body.expecthead1para,
          expecthead2: req.body.expecthead2,
          expecthead2para: req.body.expecthead2para,
          days: [],
          over: [],
          included: [],
          notincluded: [],
          things: [],
          faq: [],
          related: [],
          batch: []
  }
  
  if (req.files.testimage) {
    TrekData.testimage = req.files.testimage[0].filename;
}
if (req.files.lead1pimg) {
  TrekData.lead1pimg = req.files.lead1pimg[0].filename;
}
if (req.files.lead2pimg) {
  TrekData.lead2pimg = req.files.lead2pimg[0].filename;
}
// console.log("data",req.body )
let dayIndex = 0;
while (req.body.days && req.body.days[dayIndex] && req.body.days[dayIndex].day) {
  const descriptions = [];

  // Iterate through descriptions for the current day, assuming description is an array
  if (req.body.days[dayIndex].description) {
      descriptions.push(...req.body.days[dayIndex].description);
  }

  const dayData = {
      day: req.body.days[dayIndex].day,
      cityName: req.body.days[dayIndex].cityName,
      description: descriptions,
      meals: req.body.days[dayIndex].meals,
      imagealt:req.body.days[dayIndex].imagealt
  };
  console.log("iamge",req.body )
  // if (req.files && req.files[`dayImage${dayIndex}`]) {
  //     dayData.image = req.files[`dayImage${dayIndex}`][0].filename;
  // }
  if (req.files && req.files[`dayImage[${dayIndex}]`]) {
    dayData.image = req.files[`dayImage[${dayIndex}]`][0].filename;
}
  TrekData.days.push(dayData);
  dayIndex++;
}
let overIndex = 0;
console.log(req.body.over[overIndex],"hii")
while (req.body.over[overIndex]) {
    TrekData.over.push(req.body.over[overIndex]);
    overIndex++;
}
let includedIndex = 0
while (req.body.included[includedIndex]) {
  TrekData.included.push(req.body.included[includedIndex]);
  includedIndex++;
}
let notincludedIndex = 0
while (req.body.notincluded[notincludedIndex]) {
  TrekData.notincluded.push(req.body.notincluded[notincludedIndex]);
  notincludedIndex++;
}
let thingsIndex = 0
while (req.body.things[thingsIndex]) {
  TrekData.things.push(req.body.things[thingsIndex]);
  thingsIndex++;
}
// Iterate through req.body.over and add elements to the 'over' array
let faqIndex = 0;
while (req.body.faq && req.body.faq[faqIndex] ) {

  const faqData = {
      question: req.body.faq[faqIndex].question,
      answer: req.body.faq[faqIndex].answer,
  };
  TrekData.faq.push(faqData);
  faqIndex++;
}
let relatedIndex = 0;
while (req.body.related && req.body.related[relatedIndex] ) {
  const relatedData = {
      rday: req.body.related[relatedIndex].rday,
      rname: req.body.related[relatedIndex].rname,
      rimagealt: req.body.related[relatedIndex].rimagealt,
      ramount: req.body.related[relatedIndex].ramount,
      rtype: req.body.related[relatedIndex].rtype,
      rtypename: req.body.related[relatedIndex].rtypename,
      rlevel: req.body.related[relatedIndex].rlevel,
      rlevelname: req.body.related[relatedIndex].rlevelname,
      rservice: req.body.related[relatedIndex].rservice,
      rservicename: req.body.related[relatedIndex].rservicename,
  };
  if (req.files && req.files[`relatedImage[${relatedIndex}]`]) {
    relatedData.rimage = req.files[`relatedImage[${relatedIndex}]`][0].filename;
}
  TrekData.related.push(relatedData);
  relatedIndex++;
}
let batchIndex = 0;
while (req.body.batch && req.body.batch[batchIndex] ) {

  const batchData = {
    date: req.body.batch[batchIndex].date,
      amount: req.body.batch[batchIndex].amount,
  };
  TrekData.batch.push(batchData);
  batchIndex++;
}
  try {
    const newTrek = new Trek(TrekData);
    await newTrek.save();

    res.json({
        message: 'Images and data uploaded and saved to MongoDB',
        data: newTrek
    });
} catch (err) {
  console.error(err);
  console.log("hey")
    res.status(500).send('Error saving to MongoDB:', err.message);
}
  

};
export const updateTrekById = async (req, res, next) => {

      const { id } = req.params;
      const TrekData = {};

// Conditional assignment for scalar fields
[
  'name', 'fromamount', 'maintype', 'statetype',
  'reserveamount', 'for', 'day', 'trektype', 
  'trektypename', 'level', 'levelname', 'service',
  'servicename', 'state', 'statename', 'expertpara',
  'lead1name', 'lead1oc', 'lead1pimgalt', 'lead2name',
  'lead2oc', 'lead2pimgalt', 'itinerary'
].forEach(field => {
  if (req.body[field]) {
    TrekData[field] = req.body[field];
  }
});

// Conditional assignment for array fields
[
  'days', 'over', 'included', 'notincluded',
  'things', 'faq', 'related', 'batch'
].forEach(field => {
  if (req.body[field] && req.body[field].length > 0) {
    TrekData[field] = [];
  }
});
//       const TrekData = {
//         name:req.body.name ,
//         fromamount: req.body.fromamount,
//         maintype: req.body.maintype,
//         statetype: req.body.statetype,
//         reserveamount:req.body.reserveamount,
//         for: req.body.for,
//         day: req.body.day,
//         trektype: req.body.trektype,
//         trektypename : req.body.trektypename,
//         level: req.body.level,
//         levelname: req.body.levelname,
//         service: req.body.service,
//         servicename: req.body.servicename,
//         state: req.body.state,
//         statename : req.body.statename,
//         expertpara:req.body.expertpara,
//         lead1name:req.body.lead1name,
//         lead1oc:req.body.lead1oc,
//         lead1pimgalt:req.body.lead1pimgalt,
//         lead2name:req.body.lead2name,
//         lead2oc: req.body.lead2oc,
//         lead2pimgalt: req.body.lead2pimgalt,
//         itinerary: req.body.itinerary,
//         days: [],
//         over: [],
//         included: [],
//         notincluded: [],
//         things: [],
//         faq: [],
//         related: [],
//         batch: []
// }

if (req.files.testimage) {
  TrekData.testimage = req.files.testimage[0].filename;
}
console.log("data",req.body )
let dayIndex = 0;
while (req.body.days && req.body.days[dayIndex] && req.body.days[dayIndex].day) {
const descriptions = [];

// Iterate through descriptions for the current day, assuming description is an array
if (req.body.days[dayIndex].description) {
    descriptions.push(...req.body.days[dayIndex].description);
}

const dayData = {
    day: req.body.days[dayIndex].day,
    cityName: req.body.days[dayIndex].cityName,
    description: descriptions,
    meals: req.body.days[dayIndex].meals,
    imagealt:req.body.days[dayIndex].imagealt
};
console.log("iamge",req.body )
// if (req.files && req.files[`dayImage${dayIndex}`]) {
//     dayData.image = req.files[`dayImage${dayIndex}`][0].filename;
// }
if (req.files && req.files[`dayImage[${dayIndex}]`]) {
  dayData.image = req.files[`dayImage[${dayIndex}]`][0].filename;
}
TrekData.days.push(dayData);
dayIndex++;
}
if (req.body && req.body.over) {
let overIndex = 0;
while (req.body.over[overIndex]) {
  TrekData.over.push(req.body.over[overIndex]);
  overIndex++;
}
}
if (req.body && req.body.included) {
let includedIndex = 0
while (req.body.included[includedIndex]) {
TrekData.included.push(req.body.included[includedIndex]);
includedIndex++;
}
}
if (req.body && req.body.notincluded) {
let notincludedIndex = 0
while (req.body.notincluded[notincludedIndex]) {
TrekData.notincluded.push(req.body.notincluded[notincludedIndex]);
notincludedIndex++;
}
}
if (req.body && req.body.things) {
let thingsIndex = 0
while (req.body.things[thingsIndex]) {
TrekData.things.push(req.body.things[thingsIndex]);
thingsIndex++;
}
}
// Iterate through req.body.over and add elements to the 'over' array
let faqIndex = 0;
while (req.body.faq && req.body.faq[faqIndex] ) {

const faqData = {
    question: req.body.days[faqIndex].question,
    answer: req.body.days[faqIndex].answer,
};
TrekData.faq.push(faqData);
faqIndex++;
}
let relatedIndex = 0;
while (req.body.related && req.body.related[relatedIndex] ) {
const relatedData = {
    rday: req.body.related[relatedIndex].day,
    rname: req.body.related[relatedIndex].rname,
    rimagealt: req.body.related[relatedIndex].rimagealt,
    ramount: req.body.related[relatedIndex].ramount,
    rtype: req.body.related[relatedIndex].rtype,
    rtypename: req.body.related[relatedIndex].rtypename,
    rlevel: req.body.related[relatedIndex].rlevel,
    rlevelname: req.body.related[relatedIndex].rlevelname,
    rservice: req.body.related[relatedIndex].rservice,
    rservicename: req.body.related[relatedIndex].rservicename,
};
if (req.files && req.files[`relatedImage[${dayIndex}]`]) {
  relatedData.rimage = req.files[`relatedImage[${dayIndex}]`][0].filename;
}
TrekData.related.push(relatedData);
dayIndex++;
}
let batchIndex = 0;
while (req.body.batch && req.body.batch[batchIndex] ) {

  const batchData = {
    date: req.body.batch[batchIndex].date,
      amount: req.body.batch[batchIndex].amount,
  };
  TrekData.batch.push(batchData);
  batchIndex++;
}
try {
      const updatedTrek = await Trek.findByIdAndUpdate(id, TrekData, { new: true });

      if (!updatedTrek) {
          return res.status(404).json({ message: 'Trek not found' });
      }

      return res.status(200).json(updatedTrek);
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
 