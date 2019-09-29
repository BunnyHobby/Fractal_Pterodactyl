import hsl2rgb from '@charlesstover/hsl2rgb';

var inputFrom = document.querySelector("#from input");
var inputTo = document.querySelector("#to input");
var valFrom = document.querySelector("#from span");
var valTo = document.querySelector("#to span");

var inputKa = document.querySelector("#ka input");
var inputKb = document.querySelector("#kb input");
var valKa = document.querySelector("#ka span");
var valKb = document.querySelector("#kb span");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var c = {}
var cw = canvas.width = 600;
c.x = cw / 2;
var ch = canvas.height = 400;
c.y = ch / 2;
ctx.fillStyle = "#fff";
var raport = ch / cw;

var rgb, R, G, B;

// constants for the Julia set
//var ka = -0.8;
//var kb = 0.156;

var ka = parseFloat(inputKa.value);
console.log(ka)
var kb = parseFloat(inputKb.value);
var from = parseFloat(inputFrom.value);
var to = parseFloat(inputTo.value);

var rad = Math.PI / 180;
var max_iterations = 32;

var imgData = ctx.createImageData(cw, ch);
var pixels = imgData.data;

function JuliaSet(max_iterations, from, to) {

  // iterate over the pixels in the image
  for (var x = 0; x < imgData.width; x++) {
    for (var y = 0; y < imgData.height; y++) {
      var i = (x + y * imgData.width) * 4;

      // get the components of the current point z := a+bi
      var a = map(x, 0, imgData.width, from, to);
      var b = map(y, 0, imgData.height, from * raport, to * raport);
      
      var n = 0;
      for (n = 0; n < max_iterations; n++) {

        //  PART I: Replace the current value of z with the next
        //          iterate, z^2 + k.  Since we don't have complex
        //          numbers , you should write out this calculation
        //          in terms of the two real components a,b of z=a+bi,
        //          replacing the old values of b and a with your new values.
        //          The complex constant k is also given by two components,
        //          ka and kb. HINT: Make sure not to overwrite the value of
        //          a until you are done computing the new value for b!!
      
        
        // a = a; // Do something more interesting here!!
          // b = b; // Do something more interesting here!!
	  var xtemp = a*a - b*b;
	  a = xtemp + x;
	  b = 2*a*b + y;

        // PART II: Terminate the loop if the norm of z gets too big—for
        // instance, you might check whether the squared norm is bigger
        // than 64.  (Why 64?  What happens if you change this value? Well,
        // Try it!) 
        if (a*a + b*b >= 16) {
          break;
        }

      }

      //////////////////////////////////////// 
      var hue = n * n * Math.cos(n * rad) % 255;
   
	rgb = hsl2rgb(180 + hue / 2, 75, 50);
      R = rgb[0];
      G = rgb[1];
      B = rgb[2];
      ////////////////////////////////////////

      if (n === max_iterations) {
        R = 0;
        G = 0;
        B = 0;
      }

      pixels[i + 0] = R;
      pixels[i + 1] = G;
      pixels[i + 2] = B;
      pixels[i + 3] = 255;

    }
  }
  ctx.putImageData(imgData, 0, 0);

}

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  ctx.clearRect(0, 0, cw, ch);
  JuliaSet(max_iterations, from, to);
}

requestId = window.requestAnimationFrame(Draw);

// eventos
inputKa.addEventListener('input', function() {
  ka = parseFloat(this.value);
  valKa.innerHTML = ka;
}, false);
inputKb.addEventListener('input', function() {
  kb = parseFloat(this.value);
  valKb.innerHTML = kb;
}, false);

inputFrom.addEventListener('input', function() {
  from = parseFloat(this.value);
  valFrom.innerHTML = from;
}, false);
inputTo.addEventListener('input', function() {
  to = parseFloat(this.value);
  valTo.innerHTML = to;
}, false);

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + n * u;
}
