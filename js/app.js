var ourXValue = 200;
var minFreq = 150;
var maxFreq = 1200;
var minX = -62;
var maxX = 62;

var types = ["sine", "square", "sawtooth", "triangle", "custom"];
var ourType = types[0];

var context = new AudioContext();
oscillator = context.createOscillator();
oscillator.connect(context.destination);
oscillator.type = ourType;
oscillator.frequency.value = ourXValue;
oscillator.start(0);

var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');

var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();

function mapXToFreq(x) {
  var freqRange = maxFreq - minFreq;
  var xRange = maxX - minX;
  var f = (x+62)*(freqRange/xRange);
  return f;
}

function mapYToType(y) {
  var index = Math.round(y/5);
  return types[index];
}

document.addEventListener('headtrackingEvent',
  function (event) {
    ourXValue = mapXToFreq(event.x);
    oscillator.frequency.value = ourXValue;
    ourType = String(mapYToType(event.y));
    oscillator.type = ourType;
  }
);
