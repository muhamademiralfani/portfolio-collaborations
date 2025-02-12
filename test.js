const image = "https://res.cloudinary.com/dm9yt0fkb/image/upload/v1739369485/projects/67acabfc0b9f0ee2743a31a7-0.jpg";

const publicId = image.split('/');
console.log();
console.log(`${publicId[publicId.length - 2]}/${publicId[publicId.length - 1].split(".")[0]}`);


// const imagePublicIds = project.images.map((imageUrl) => {
//     const parts = imageUrl.split("/");
//     return parts[parts.length - 1].split(".")[0]; // Extract public_id from URL
//   });