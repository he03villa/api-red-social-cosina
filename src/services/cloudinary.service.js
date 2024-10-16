import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (file, url) => {
    const uploadResult = await cloudinary.uploader.upload(file, {
        public_id: url,
    });

    const optimizeUrl = cloudinary.url(url, {
        fetch_format: 'auto',
        quality: 'auto'
    });
    return { uploadResult, optimizeUrl };
}

export const deleteImage = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
    /* cloudinary.v2.api
  .delete_resources(['samples/dance-2', 'samples/elephants', 'samples/cld-sample-video', 'samples/sea-turtle'], 
    { type: 'upload', resource_type: 'video' })
  .then(console.log);
  cloudinary.v2.api
  .delete_resources(['shoes', 'cld-sample-5', 'cld-sample-4', 'cld-sample', 'cld-sample-3', 'cld-sample-2', 'samples/upscale-face-1', 'samples/logo', 'samples/dessert-on-a-plate', 'samples/woman-on-a-football-field', 'samples/chair', 'samples/cup-on-a-table', 'samples/coffee', 'samples/man-portrait', 'samples/chair-and-coffee-table', 'samples/man-on-a-street', 'samples/man-on-a-escalator', 'samples/outdoor-woman', 'samples/look-up', 'samples/breakfast', 'samples/smile', 'samples/balloons', 'samples/shoe', 'samples/two-ladies', 'samples/landscapes/landscape-panorama', 'samples/animals/kitten-playing', 'samples/cloudinary-group', 'samples/landscapes/nature-mountains', 'samples/food/spices', 'samples/imagecon-group', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/leather-bag-gray', 'samples/ecommerce/car-interior-design', 'samples/landscapes/beach-boat', 'samples/people/bicycle', 'samples/people/jazz', 'samples/animals/three-dogs', 'samples/landscapes/architecture-signs', 'samples/people/boy-snow-hoodie', 'samples/bike', 'samples/ecommerce/shoes', 'samples/landscapes/girl-urban-view', 'samples/sheep', 'samples/people/smiling-man', 'samples/food/fish-vegetables', 'samples/food/pot-mussels', 'samples/animals/reindeer', 'samples/people/kitchen-bar', 'samples/cloudinary-logo-vector', 'samples/ecommerce/analog-classic', 'samples/animals/cat', 'samples/food/dessert', 'samples/cloudinary-icon', 'sample'], 
    { type: 'upload', resource_type: 'image' })
  .then(console.log); */
}

export default cloudinary;