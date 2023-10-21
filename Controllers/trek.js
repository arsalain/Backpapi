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
          days: [],
          over: []
  }
  
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
  };
  console.log("iamge",req.body )
  if (req.files && req.files[`dayImage${dayIndex}`]) {
      dayData.image = req.files[`dayImage${dayIndex}`][0].filename;
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

// Iterate through req.body.over and add elements to the 'over' array

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
  try {
      const { id } = req.params;
      
      const TrekData = {name:req.body.name ,
        state: req.body.state,
              date: req.body.date,
              day: req.body.day,
              daynight: req.body.daynight,
              type: req.body.type,
              person: req.body.person,
              amount: req.body.amount,
              filtertype: req.body.filtertype,
              covername: req.body.covername,
              coverdifficulty:req.body.coverdifficulty,
              coverpara:req.body.coverpara,
              iternaryday0title:req.body.iternaryday0title,
              iternaryday0pointH1:req.body.iternaryday0pointH1,
              iternaryday0point1: req.body.iternaryday0point,
              iternaryday0point2: req.body.iternaryday0point2,
              iternaryday0point3: req.body.iternaryday0point3,
              iternaryday0point4: req.body.iternaryday0point4,
              iternaryday0point5: req.body.iternaryday0point5,
              iternaryday0pickup1: req.body.iternaryday0pickup1,
              iternaryday0pickup2: req.body.iternaryday0pickup2,
              iternaryday0pickup3: req.body.iternaryday0pickup3,
              iternaryday0pickup4: req.body.iternaryday0pickup4,
              iternaryday0pickup5: req.body.iternaryday0pickup5,
              iternaryday1title: req.body.iternaryday1title,
              iternaryday1pointH1: req.body.iternaryday1pointH1,
              iternaryday1pointH2: req.body.iternaryday1pointH2,
              iternaryday1pointH3: req.body.iternaryday1pointH3,
              iternaryday1pointH4: req.body.iternaryday1pointH4,
              iternaryday1pointH5: req.body.iternaryday1pointH5,
              iternaryday1point1: req.body.iternaryday1point1,
              iternaryday1point2: req.body.iternaryday1point2,
              iternaryday1point3: req.body.iternaryday1point3,
              iternaryday1point4: req.body.iternaryday1point4,
              iternaryday1point5: req.body.iternaryday1point5,
              iternaryday1point6: req.body.iternaryday1point6,
              iternaryday1point7: req.body.iternaryday1point7,
              iternaryday1point8: req.body.iternaryday1point8,
              iternaryday1point9: req.body.iternaryday1point9,
              iternaryday1point10: req.body.iternaryday1point10,
              iternaryday2title: req.body.iternaryday2title,
              iternaryday2pointH1: req.body.iternaryday2pointH1,
              iternaryday2pointH2: req.body.iternaryday2pointH2,
              iternaryday2pointH3: req.body.iternaryday2pointH3,
              iternaryday2point1: req.body.iternaryday2point1,
              iternaryday2point2: req.body.iternaryday2point2,
              iternaryday2point3: req.body.iternaryday2point3,
              iternaryday2point4: req.body.iternaryday2point4,
              iternaryday2point5: req.body.iternaryday2point5,
              iternaryday2point6: req.body.iternaryday2point6,
              iternaryday2point7: req.body.iternaryday2point7,
              iternaryday2point8: req.body.iternaryday2point8, 
              iternaryday3title: req.body.iternaryday3title,
              iternaryday3pointH1: req.body.iternaryday3pointH1,
              iternaryday3pointH2: req.body.iternaryday3pointH2,
              iternaryday3pointH3: req.body.iternaryday3pointH3,
              iternaryday3point1: req.body.iiternaryday3point1,
              iternaryday3point2: req.body.iternaryday3point2,
              iternaryday3point3: req.body.iternaryday3point3,
              iternaryday3point4: req.body.iternaryday3point4, 
              iternaryday3point5: req.body.iternaryday3point5,
              iternaryday3point6: req.body.iternaryday3point6,
              iternaryday3point7: req.body.iternaryday3point7,
              iternaryday3point8: req.body.iternaryday3point8,
              iternaryday4title: req.body.iternaryday4title,   
              iternaryday4pointH1: req.body.iternaryday4pointH1,
              iternaryday4pointH2: req.body.iternaryday4pointH2,
              iternaryday4pointH3: req.body.iternaryday4pointH3,
              iternaryday4point1: req.body.iternaryday4point1,   
              iternaryday4point2: req.body.iternaryday4point2,
              iternaryday4point3: req.body.iternaryday4point3,
              iternaryday4point4: req.body.iternaryday4point4,
              iternaryday4point5: req.body.iternaryday4point5,
              iternaryday4point6: req.body.iternaryday4point6,
              iternaryday4point7: req.body.iternaryday4point7,
              iternaryday4point8: req.body.iternaryday4point8,
              inclusionspoint1: req.body.inclusionspoint1,
              inclusionspoint2: req.body.inclusionspoint2,
              inclusionspoint3: req.body.inclusionspoint3,
              inclusionspoint4: req.body.inclusionspoint4,
              inclusionspoint5: req.body.inclusionspoint5,
              inclusionspoint6: req.body.inclusionspoint6,
              inclusionspoint7: req.body.inclusionspoint7,
              inclusionspoint8: req.body.inclusionspoint8,
              inclusionspoint9: req.body.inclusionspoint9,
              exclusionspoint1:req.body.exclusionspoint1,
              exclusionspoint2:req.body.exclusionspoint2,
              exclusionspoint3:req.body.exclusionspoint3,
              exclusionspoint4:req.body.exclusionspoint4,
              exclusionspoint5:req.body.exclusionspoint5,
              exclusionspoint6:req.body.exclusionspoint6,
              thingspoint1:req.body.thingspoint1,
              thingspoint2:req.body.thingspoint2,
              thingspoint3:req.body.thingspoint3,
              thingspoint4:req.body.thingspoint4,
              thingspoint5:req.body.thingspoint5,
              thingspoint6:req.body.thingspoint6,
              thingspoint7:req.body.thingspoint7,
              thingspoint8:req.body.thingspoint8,
              thingspoint9:req.body.thingspoint9,
              thingspoint10:req.body.thingspoint10,
              thingspoint11:req.body.thingspoint11,
              thingspoint12:req.body.thingspoint12,
              thingspoint13:req.body.thingspoint13,
              thingspoint14:req.body.thingspoint14,
              thingspoint15:req.body.thingspoint15,
              thingspoint16:req.body.thingspoint16,
              thingspoint17:req.body.thingspoint17,
              thingspoint18:req.body.thingspoint18,
              thingspoint19:req.body.thingspoint19,
              thingspoint20:req.body.thingspoint20,
              policypoint1:req.body.policypoint1,
              policypoint2:req.body.policypoint2,
              policypoint3:req.body.policypoint3,
              policypoint4: req.body.policypoint4,
              policypoint5:req.body.policypoint5,
              frequentlyquestion1: req.body.frequentlyquestion1,
              frequentlyquestion2: req.body.frequentlyquestion2,
              frequentlyquestion3: req.body.frequentlyquestion3,
              frequentlyquestion4:  req.body.frequentlyquestion4,
              frequentlyquestion5:  req.body.frequentlyquestion5,
              frequentlyanswer1: req.body.frequentlyanswer1,
              frequentlyanswer2: req.body.frequentlyanswer2,
              frequentlyanswer3: req.body.frequentlyanswer3,
              frequentlyanswer4: req.body.frequentlyanswer4,
              frequentlyanswser5: req.body.frequentlyanswser5,
              detailday0title: req.body.detailday0title,
              detailday0point1: req.body.detailday0point1,
              detailday0point2: req.body.detailday0point2,
              detailday0point3: req.body.detailday0point3,
              detailday0point4: req.body.detailday0point4,
              detailday0point5: req.body.detailday0point5,
              detailday0point6: req.body.detailday0point6,
              detailday1title: req.body.detailday1title,
              detailday1point1: req.body.detailday1point1,
              detailday1point2: req.body.detailday1point2,
              detailday1point3: req.body.detailday1point3,
              detailday1point4: req.body.detailday1point4,
              detailday1point5: req.body.detailday1point5,
              detailday1point6: req.body.detailday1point6,
              detailday2title: req.body.detailday2title,
              detailday2point1: req.body.detailday2point1,
              detailday2point2: req.body.detailday2point2,
              detailday2point3: req.body.detailday2point3,
              detailday2point4: req.body.detailday2point4,
              detailday2point5: req.body.detailday2point5,
              detailday2point6: req.body.detailday2point6,
              detailday3title: req.body.detailday3title,
              detailday3point1: req.body.detailday3point1,
              detailday3point2: req.body.detailday3point2,
              detailday3point3: req.body.detailday3point3,
              detailday3point4: req.body.detailday3point4,
              detailday3point5: req.body.detailday3point5,
              detailday3point6: req.body.detailday3point6,
              detailday4title: req.body.detailday4title,
              detailday4point1: req.body.detailday4point1,
              detailday4point2: req.body.detailday4point2,
              detailday4point3: req.body.detailday4point3,
              detailday4point4: req.body.detailday4point4,
              detailday4point5: req.body.detailday4point5,
              detailday4point6: req.body.detailday4point6,
              plantitlehead: req.body.plantitlehead,
              planid1: req.body.planid1,
              planname1: req.body.planname1,
              planpara1: req.body.planpara1,
              planid2: req.body.planid2,
              planname2: req.body.planname2,
              planpara2:req.body.planpara2,
              planid3: req.body.planid3,
              planname3: req.body.planname3,
              planpara3:req.body.planpara3,
              planid4: req.body.planid4,
              planname4: req.body.planname4,
              planpara4:req.body.planpara4,
              planid5: req.body.planid5,
              planname5: req.body.planname5,
              planpara5:req.body.planpara5,
              planid6:req.body.planid6,
              planname6: req.body.planname6,
              planpara6:req.body.planpara6,
              planid7: req.body.planid7,
              planname7: req.body.planname7,
              planpara7:req.body.planpara7,
              planid8: req.body.planid8,
              planname8: req.body.planname8,
              planpara8:req.body.planpara8,
              planid9: req.body.planid9,
              planname9: req.body.planname9,
              planpara9:req.body.planpara9,
              planid10: req.body.planid10,
              planname10: req.body.planname10,
              planpara10:req.body.planpara10,
              similarinspotitle : req.body.similarinspotitle,
              similarinspopara : req.body.similarinspopara,
              similartitle1:req.body.similartitle1,
              similarsrc1:req.body.similarsrc1,
              similarpara1:req.body.similarpara1,
              similarlink1:req.body.similarlink1,
              similartitle2:req.body.similartitle2,
              similarsrc2:req.body.similarsrc2,
              similarpara2:req.body.similarpara2,
              similarlink2:req.body.similarlink2,
              similartitle3:req.body.similartitle3,
              similarsrc3:req.body.similarsrc3,
              similarpara3:req.body.similarpara3,
              similarlink3:req.body.similarlink3,
              reviewid1:req.body.reviewid1,
              reviewtitle1:req.body.reviewtitle1,
              reviewpara1:req.body.reviewpara1,
              reviewalt1:req.body.reviewalt1,
              reviewid2:req.body.reviewid2,
              reviewtitle2:req.body.reviewtitle2,
              reviewpara2:req.body.reviewpara2,
              reviewalt2:req.body.reviewalt2,
              reviewid3:req.body.reviewid3,
              reviewtitle3:req.body.reviewtitle3,
              reviewpara3:req.body.reviewpara3,
              reviewalt3:req.body.reviewalt3,
              eventSlug: req.body.eventSlug,
              placement: req.body.placement
      }
      
      if(req.files.testimage) {
        TrekData.testimage = req.files.testimage[0].filename;
      }

      if(req.files.coverimage) {
        TrekData.coverimage = req.files.coverimage[0].filename;
      }
        
  if (req.files.testimage) {
    TrekData.testimage = req.files.testimage[0].filename;
}

if (req.files.coverimage) {
  TrekData.coverimage = req.files.coverimage[0].filename;
}
if (req.files.planimg1) {
  TrekData.planimg1 = req.files.planimg1[0].filename;
}
if (req.files.planimg2) {
  TrekData.planimg2 = req.files.planimg2[0].filename;
}
if (req.files.planimg3) {
  TrekData.planimg3 = req.files.planimg3[0].filename;
}
if (req.files.planimg4) {
  TrekData.planimg4 = req.files.planimg4[0].filename;
}
if (req.files.planimg5) {
  TrekData.planimg5 = req.files.planimg5[0].filename;
}
if (req.files.planimg6) {
  TrekData.planimg6 = req.files.planimg6[0].filename;
}
if (req.files.planimg7) {
  TrekData.planimg7 = req.files.planimg7[0].filename;
}
if (req.files.planimg8) {
  TrekData.planimg8 = req.files.planimg8[0].filename;
}
if (req.files.planimg9) {
  TrekData.planimg9 = req.files.planimg9[0].filename;
}
if (req.files.planimg10) {
  TrekData.planimg10 = req.files.planimg10[0].filename;
}
if (req.files.similarimg1) {
  TrekData.similarimg1 = req.files.similarimg1[0].filename;
}
if (req.files.similarimg2) {
  TrekData.similarimg2 = req.files.similarimg2[0].filename;
}
if (req.files.similarimg3) {
  TrekData.similarimg3 = req.files.similarimg3[0].filename;
}
if (req.files.reviewimg1) {
  TrekData.reviewimg1 = req.files.reviewimg1[0].filename;
}
if (req.files.reviewimg2) {
  TrekData.reviewimg2 = req.files.reviewimg2[0].filename;
}
if (req.files.reviewimg3) {
  TrekData.reviewimg3 = req.files.reviewimg3[0].filename;
}

      const updatedTrek = await Trek.findByIdAndUpdate(id, TrekData, { new: true });

      if (!updatedTrek) {
          return res.status(404).json({ message: 'Trek not found' });
      }

      return res.status(200).json(updatedTrek);
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
 