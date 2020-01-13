var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var bckg = new Image;
var aspectRatio =1;
bckg.setAttribute('crossorigin', 'anonymous');
bckg.src ="https://i.imgur.com/ooRPEpR.png";

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var inputImage = new Image();
        inputImage.onload = function(){

          // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;

            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputHeight / aspectRatio;
            }

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * .5;
            const outputY = (outputHeight - inputHeight) * .5;

            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;

            // draw our image at position 0, 0 on the canvas
            canvas.width = outputWidth;
            canvas.height = outputHeight;
            ctx.drawImage(inputImage, outputX, outputY);
            ctx.drawImage(bckg, 0, 0, outputHeight, outputWidth);
      }
      inputImage.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}
function download_image(){
  var canvas = document.getElementById("imageCanvas");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
}
function crop(url, aspectRatio) {

    // we return a Promise that gets resolved with our canvas element
    return new Promise(resolve => {

        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {

            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;

            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputHeight / aspectRatio;
            }

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * .5;
            const outputY = (outputHeight - inputHeight) * .5;

            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;

            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d');
            ctx.drawImage(inputImage, outputX, outputY);
            resolve(outputImage);
        };

        // start loading our image
        inputImage.src = url;
    })

}
