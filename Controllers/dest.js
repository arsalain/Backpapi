import Dest from "../Model/Dest.js"

export const createDest = async (req, res, next) => {
    const DestData = {
      name: req.body.name,
      maintype: req.body.maintype,
      over: [],
      products: req.body.products, // Assuming it's an array of product IDs
      blogname1: req.body.blogname1,
      blogpara1: req.body.blogpara1,
      blogbutton1: req.body.blogbutton1,
      blogalt1: req.body.blogalt1,
      blogname2: req.body.blogname2,
      blogpara2: req.body.blogpara2,
      blogbutton2: req.body.blogbutton2,
      blogalt2: req.body.blogalt2,
      blogname3: req.body.blogname3,
      blogpara3: req.body.blogpara3,
      blogbutton3: req.body.blogbutton3,
      blogalt3: req.body.blogalt3,
    };
    if (req.files.coverimage) {
      DestData.coverimage = req.files.coverimage[0].filename;
    }
    if (req.files.blogimage1) {
      DestData.blogimage1 = req.files.blogimage1[0].filename;
  }
  if (req.files.blogimage2) {
    DestData.blogimage2 = req.files.blogimage2[0].filename;
  }
  if (req.files.blogimage3) {
    DestData.blogimage3 = req.files.blogimage3[0].filename;
  }
  // c
    try {
      const newDest = new Dest(DestData);
      await newDest.save();
  
      res.json({
        message: 'Destination created successfully',
        data: newDest,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating destination:', err.message);
    }
  };
  
  
  // Delete a destination by name
  export const deleteDest= async (req,res,next)=>{
    try {
      const name = req.params.name;
      const deletedDest = await Dest.findOneAndDelete({ name });
      if (!deletedDest) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Could not delete destination" });
    }
  }

  
  // Update a destination by name
  export const updateDestByName = async (req, res, next) => {
    const { name } = req.params;
    const DestData = {};
  
    // Conditional assignment for scalar fields
    [
      'name', 'maintype', 'blogname1', 'blogpara1', 'blogbutton1', 'blogimage1', 'blogalt1',
      'blogname2', 'blogpara2', 'blogbutton2', 'blogimage2', 'blogalt2',
      'blogname3', 'blogpara3', 'blogbutton3', 'blogimage3', 'blogalt3'
    ].forEach(field => {
      if (req.body[field]) {
        DestData[field] = req.body[field];
      }
    });
  
    // Conditional assignment for array fields
    ['over', 'products'].forEach(field => {
        if (req.body[field] && req.body[field].length > 0) {
          DestData[field] = [];
        }
      });
      if (req.files.coverimage) {
        DestData.coverimage = req.files.coverimage[0].filename;
      }
      if (req.files.blogimage1) {
        DestData.blogimage1 = req.files.blogimage1[0].filename;
    }
    if (req.files.blogimage2) {
      DestData.blogimage2 = req.files.blogimage2[0].filename;
    }
    if (req.files.blogimage3) {
      DestData.blogimage3 = req.files.blogimage3[0].filename;
    }
    // Iterate through req.body.over and add elements to the 'over' array
    let overIndex = 0;
    while (req.body.over && req.body.over[overIndex]) {
      DestData.over.push(req.body.over[overIndex]);
      overIndex++;
    }
    if (req.body.products && req.body.products.length > 0) {
        DestData.products = req.body.products; 
      }
    try {
      const updatedDest = await Dest.findOneAndUpdate({ name }, DestData, { new: true });
  
      if (!updatedDest) {
        return res.status(404).json({ message: 'Destination not found' });
      }
  
      return res.status(200).json(updatedDest);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
  // Get a destination by name
  export const getDestByName= async (req,res,next)=>{
    try {
      const name = req.params.name;
      const dest = await Dest.findOne({ name });
      if (!dest) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.status(200).json(dest);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve destination" });
    }
  }