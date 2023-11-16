import Blog from "../Model/Blog.js"
export const createBlog = async (req, res, next) => {
    try {
    const {
      name,
      urllink,
      blogs
    } = req.body;
    
    const over = req.body.over instanceof Array ? req.body.over : [req.body.over];
    const products = req.body.products instanceof Array ? req.body.products : [req.body.products];

   
      let blogsArray
      try {
        blogsArray = JSON.parse(blogs);
      } catch (error) {
        return res.status(400).send('Invalid days data: ' + error.message);
      }
      const BlogData = {
        name,
        urllink,
        products,
        over,
        blogs: blogsArray
      };
      BlogData.blogs.forEach((blog, index) => {
        if(req.files && req.files[`blogImage[${index}]`]) {
            blog.image = req.files[`blogImage[${index}]`][0].filename;
        }
      });
        const newBlog = new Blog(BlogData);
        await newBlog.save();
    
        res.json({
          message: 'Destination created successfully',
          data: newBlog,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error creating destination:', err.message);
      }
    };
    