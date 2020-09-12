var image;
var fgimage;
var bgimage;
var fcan;
var bcan;
var finput;
var binput;
var fheight;
var fwidth;
var bheight;
var bwidth;


function loadbg() {
  binput = document.getElementById("binput");
  bcan = document.getElementById("background");
  bgimage = new SimpleImage(binput);
  bgwidth = bgimage.getWidth();
  bgheight = bgimage.getHeight();
  bgimage.drawTo(bcan);
}

function loadfg() {
  finput = document.getElementById("finput");
  fcan = document.getElementById("foreground");
  bgimage = new SimpleImage(finput);
  fgimage = new SimpleImage(finput);
  fheight = fgimage.getHeight();
  fgwidth = fgimage.getWidth();
  fgimage.drawTo(fcan);
}

function code(x){
  if (x == 0)
  {
    return [0,0,0,0]
  }
  var a = []
  while(x > 0)
  {
    a.push(x%2)
    x = Math.floor(x/2)
  }
  while (a.length < 8)
  {
    a.push(0);
  }
  return a.slice(4,a.length); 
}
function combi(x){
  var val = 0;
  for (var i = 0; i <= x.length; ++i){
    if (x[i] === 1){
      val += Math.pow(2,i)
  }}
  return val
}

function uncode(x){
  var a = []
  while(x > 0)
  {
    a.push(x%2)
    x = Math.floor(x/2)
  }
  return a.slice(0,4); 
}
function combi(x){
  var val = 0;
  for (var i = 0; i <= x.length; ++i){
    if (x[i] === 1){
      val += Math.pow(2,i)
  }}
  return val
}

function hide() {
  alert("hiding your image")
  crop()
  image = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  for (let pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var fgpixel = fgimage.getPixel(x,y);
    var bgpixel = bgimage.getPixel(x,y);
    
    var fgred = code(fgpixel.getRed());
    var bgred = code(bgpixel.getRed());
    pixel.setRed(combi(bgred.concat(fgred)));
    
    var fgblue = code(fgpixel.getBlue());
    var bgblue = code(bgpixel.getBlue());
    pixel.setGreen(combi(bgblue.concat(fgblue)));
    
    var fgreen = code(fgpixel.getGreen());
    var bgreen = code(bgpixel.getGreen());
    pixel.setBlue(combi(bgreen.concat(fgreen)));
  }
  image.drawTo(fcan);
  alert("Complete");
}
function crop(){
  if (fwidth < bwidth){
    alert("cropping width");
  }if (bwidth < fwidth){
    alert('cropping width');
  }if (fheight < bheight){
    alert("cropping width");
  }if (bheight < fheight){
    alert("cropping width");
  }
}
function show() {
  alert("showing your image")
  image = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  for (let pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var fgpixel = fgimage.getPixel(x,y);
    var fgred = uncode(fgpixel.getRed());
    pixel.setRed(combi([0,0,0,0].concat(fgred)));
    var fgblue = uncode(fgpixel.getBlue());
    pixel.setGreen(combi([0,0,0,0].concat(fgblue)));
    var fgreen = uncode(fgpixel.getGreen());
    pixel.setBlue(combi([0,0,0,0].concat(fgreen)));
  }
  bcan = document.getElementById("background");
  image.drawTo(bcan);
  alert("Complete");
}

