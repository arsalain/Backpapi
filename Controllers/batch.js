import Batch from "../Model/Batch.js"
import Trek from "../Model/Trek.js";

export const addbatch= async (req,res,next)=>{

    const newBatch = new Batch({
        startdate:req.body.startdate,
        enddate:req.body.endate,
        starttime:req.body.starttime,
        endtime:req.body.endtime,
        whowillgo:req.body.whowillgo,
        comment:req.body.comment,
    });

    await newBatch.save();

    // Associate the batch with the tour
    const trek = await Trek.findById(req.params.id);
    trek.batches.push(newBatch._id);
    await trek.save();

    res.json(newBatch);
};
