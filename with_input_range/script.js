console.log("Ready!");

const range = document.querySelector(".rangeWrap");
const inputLeft = document.querySelector(".rangeInputLeft");
const inputRight = document.querySelector(".rangeInputRight");
const track = document.querySelector(".rangeTrack");
const trackFill = document.querySelector(".rangeTrackFill");
const thumbLeft = document.querySelector(".rangeThumbLeft");
const thumbRight = document.querySelector(".rangeThumbRight");

thumbLeft.addEventListener("mousedown", function () {
  inputLeft.focus();
});
thumbLeft.addEventListener("touchstart", function () {
  inputLeft.focus();
});
thumbRight.addEventListener("mousedown", function () {
  inputRight.focus();
});
thumbRight.addEventListener("touchstart", function () {
  inputRight.focus();
});

function getPosition(element) {
  var rect = element.getBoundingClientRect();
  return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Utility unificata per ottenere la coordinata X (mouse o touch)
function getClientX(evt) {
  if (evt.touches && evt.touches.length) return evt.touches[0].clientX;
  if (evt.changedTouches && evt.changedTouches.length) return evt.changedTouches[0].clientX;
  return evt.clientX;
}

var THUMB_SIZE = 32;
var THUMB_HALF = THUMB_SIZE / 2;
var START_TRACK = getPosition(track).x;
var TRACK_LENGTH = getPosition(track).width;

function init() {
  var defVal = getInputDefaultValues();
  inputLeft.value = defVal.start;
  inputRight.value = defVal.end;
  calcThumbPosition((defVal.start / 100) * TRACK_LENGTH, thumbLeft);
  calcThumbPosition((defVal.end / 100) * TRACK_LENGTH, thumbRight);
  calcTrackFill();
  showData();
}
init();

function getInputDefaultValues() {
  var min = parseInt(range.getAttribute("data-min"));
  var max = parseInt(range.getAttribute("data-max"));
  var start = parseInt(range.getAttribute("data-start"));
  var end = parseInt(range.getAttribute("data-end"));
  return { min: min, max: max, start: start, end: end };
}

function calcThumbPosition(x, thumb) {
  var thumbLeftX = getPosition(thumbLeft).x;
  var thumbRightX = getPosition(thumbRight).x;
  const newLeft = clamp(
    x - START_TRACK,
    thumb === thumbLeft ? 0 : thumbLeftX - START_TRACK + THUMB_HALF,
    thumb === thumbLeft ? thumbRightX - START_TRACK + THUMB_HALF : TRACK_LENGTH
  );
  thumb.style.left = newLeft + "px";
  return newLeft;
}

function calcTrackFill() {
  var thumbLeftX = getPosition(thumbLeft).x;
  var thumbRightX = getPosition(thumbRight).x;
  trackFill.style.left = (thumbLeftX - START_TRACK + 5) + "px";
  trackFill.style.width = (thumbRightX - thumbLeftX + 5) + "px";
}

function calcInputValues(input, newLeft) {
  var defVal = getInputDefaultValues();
  var min = defVal.min;
  var max = defVal.max;

  const perc = newLeft / TRACK_LENGTH;
  const newValue = perc * (max - min) + min;
  input.value = newValue;

  var changeEvt = document.createEvent("HTMLEvents");
  var inputEvt = document.createEvent("HTMLEvents");
  changeEvt.initEvent("change", true, false);
  inputEvt.initEvent("input", true, false);
  input.dispatchEvent(changeEvt);
  input.dispatchEvent(inputEvt);
}

function logInputValues() {
  console.log("inputLeft value", inputLeft.value);
  console.log("inputRight value", inputRight.value);
}

function handleChange(input, thumb) {
  function handleDown(evtDown) {
    evtDown.preventDefault();
    function handleMove(evtMove) {
      evtMove.preventDefault();
      var mouseX = getClientX(evtMove);
      var newLeft = calcThumbPosition(mouseX, thumb);
      calcTrackFill();
      calcInputValues(input, newLeft);
      logInputValues();
    }
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove, { passive: false });

    function handleUp() {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    }
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);
  }
  thumb.addEventListener("mousedown", handleDown);
  thumb.addEventListener("touchstart", handleDown, { passive: false });
}

handleChange(inputLeft, thumbLeft);
handleChange(inputRight, thumbRight);


// Show debugging data
function showData() {
  var minEl = document.querySelector("#min");
  var maxEl = document.querySelector("#max");
  var startEl = document.querySelector("#start");
  var endEl = document.querySelector("#end");

  var min = parseInt(range.getAttribute("data-min"));
  var max = parseInt(range.getAttribute("data-max"));

  minEl.innerHTML = min;
  maxEl.innerHTML = max;
  startEl.innerHTML = inputLeft.value;
  endEl.innerHTML = inputRight.value;
}
inputLeft.addEventListener("input", function () {
  showData();
});
inputRight.addEventListener("input", function () {
  showData();
});