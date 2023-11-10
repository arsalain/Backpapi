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

  
  const tourTypes = ['grouptour', 'longtour', 'international', 'northindiatour'];
  const trekTypes = ['northindiatrek', 'karnatakatrek', 'keralatrek', 'tmtrek'];
  
  // Middleware function to get tours by name
 export const getTourByName = async (req, res) => {
    try {
      const linkName = req.params.name;
      const tour = await Trek.findOne({ urllink: linkName, maintype: { $in: tourTypes } })
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res.status(200).json(tour);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve tour" });
    }
  };
  
  // Middleware function to get treks by name
  export const getTrekByName = async (req, res) => {
    try {
      const linkName = req.params.name;
      const trek = await Trek.findOne({  urllink: linkName, maintype: { $in: trekTypes } })
      if (!trek) {
        return res.status(404).json({ error: "Trek not found" });
      }
      res.status(200).json(trek);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve trek" });
    }
  };
  
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
  try {
    // Extract the trek information from the request body
    const {
      name, amount,testimagealt, fromamount, maintype, urllink, statetype, reserveamount, for1, day,
      trektype, trektypename, level, levelname, service, servicename, state, statename,
      expertpara, lead1name, lead1oc, lead1pimgalt, lead2name, lead2oc, lead2pimgalt,
      itinerary, expectpara, expecthead1, expecthead1para, expecthead2, expecthead2para,
      days, related, batch 
    } = req.body;
    console.log(req.body.days);
    console.log(req.body)
    // console.log(days);
    if (!req.body.days) {
      return res.status(400).send('Days data is missing');
    }
    
    let daysArray, relatedArray, batchArray;

    try {
      daysArray = JSON.parse(days);
    } catch (error) {
      return res.status(400).send('Invalid days data: ' + error.message);
    }

    try {
      relatedArray = JSON.parse(related);
    } catch (error) {
      return res.status(400).send('Invalid related data: ' + error.message);
    }

    try {
      batchArray = JSON.parse(batch);
    } catch (error) {
      // Ensure this error message is for batch, not a copy-paste error
      return res.status(400).send('Invalid batch data: ' + error.message);
    }
    console.log(daysArray, relatedArray, batchArray);
    const included = req.body.included instanceof Array ? req.body.included : [req.body.included];
    const notincluded = req.body.notincluded instanceof Array ? req.body.notincluded : [req.body.notincluded];
    const things = req.body.things instanceof Array ? req.body.things : [req.body.things];
    const over = req.body.over instanceof Array ? req.body.over : [req.body.over];
    // Construct the Trek data from the request body
    const TrekData = {
      name, amount,testimagealt, fromamount, maintype, urllink, statetype, reserveamount, for1, day,
      trektype, trektypename, level, levelname, service, servicename, state, statename,
      expertpara, lead1name, lead1oc, lead1pimgalt, lead2name, lead2oc, lead2pimgalt,
      itinerary, expectpara, expecthead1, expecthead1para, expecthead2, expecthead2para,
      days: daysArray,
      included,
      notincluded,
      things,
      over,
      related: relatedArray,
      batch:batchArray
    };
console.log("hey",TrekData )
console.log("Parsed days data", TrekData.days);
// daysArray.forEach((day, index) => {
//   assignImageToDay(req.files, `days[${index}].image`, day);
// });
    // Add images if they exist
    function assignImageToField(files, fieldName, dataObject) {
      if (files && files[fieldName]) {
        // Handle single image
        dataObject[fieldName] = files[fieldName][0].filename;
      }
    }
    assignImageToField(req.files, 'testimage', TrekData);
    assignImageToField(req.files, 'lead1pimg', TrekData);
    assignImageToField(req.files, 'lead2pimg', TrekData);
    
    // Assign images to day images, assuming TrekData.days is an array
    TrekData.days.forEach((day, index) => {
      if(req.files && req.files[`dayImage[${index}]`]) {
        day.image = req.files[`dayImage[${index}]`][0].filename;
      }
    });
    
    // Assign images to related images, assuming TrekData.related is an array
    TrekData.related.forEach((relatedItem, index) => {
      if(req.files[`relatedImage[${index}]`]) {
        relatedItem.rimage = req.files[`relatedImage[${index}]`][0].filename;
      }
    });

    // Create a new Trek instance and save to the database
    const newTrek = new Trek(TrekData);
    await newTrek.save();

    // Send the response back to the client
    res.json({
      message: 'Trek successfully created',
      data: newTrek
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error saving to MongoDB', error: err.message });
  }
};

// Utility function to parse array data from the request



// Utility function to assign image filenames to TrekData


// Add other utility functions as needed...

export const updateTrekById = async (req, res, next) => {

      const { id } = req.params;
      const TrekData = {};

// Conditional assignment for scalar fields
[
  'name','amount', 'fromamount', 'maintype', 'statetype',
  'reserveamount', 'for', 'day', 'trektype', 
  'trektypename', 'level', 'levelname', 'service',
  'servicename', 'state', 'statename', 'expertpara',
  'lead1name', 'lead1oc', 'lead1pimgalt', 'lead2name',
  'lead2oc', 'lead2pimgalt', 'itinerary','urllink'
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

if (req.files.testimage) {
  TrekData.testimage = req.files.testimage[0].filename;
}
if (req.files.lead1pimg) {
  TrekData.lead1pimg = req.files.lead1pimg[0].filename;
}
if (req.files.lead2pimg) {
  TrekData.lead2pimg = req.files.lead2pimg[0].filename;
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
 