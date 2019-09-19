import { Router, Request, Response } from 'express';
import * as  Util from '../../util/util';

const router: Router = Router();

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
router.get('/filteredimage/', 
    async (req: Request, res: Response) => {
    let { image_url } = req.query;

    console.log('image url is ' + image_url);
    if(image_url == undefined) {
        res.status(400).send('Image Url is required.');  
    }
     const imgaeLocalPath = await Util.filterImageFromURL(image_url);
    var  files:Array<string> = [imgaeLocalPath];
   
   // res.on('end ',Util.deleteLocalFiles(files) );
    res.sendFile(imgaeLocalPath);
    res.on('finish', function() {
        try {
            Util.deleteLocalFiles(files);
        } catch(e) {
          console.log("error removing ", imgaeLocalPath); 
        }
    }); 
   // Util.deleteLocalFiles(files);
   // res.end();
   
});

router.get('/', 
    async (req: Request, res: Response) => {
    

    res.status(200).send('Welcome Hyma');
});
export const IndexRouter: Router = router;