var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var bckg = new Image;
bckg.setAttribute('crossorigin', 'anonymous');
bckg.src ="https://i.imgur.com/ooRPEpR.png";

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = 800;
            canvas.height = 800;
            ctx.drawImage(img, 90, 90, 620, 620);
            ctx.drawImage(bckg, 0, 0, 800, 800);
        }
        img.src = event.target.result;
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
