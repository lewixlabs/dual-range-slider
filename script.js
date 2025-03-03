// Utilizziamo una sintassi ES5 per migliorare la compatibilità con IE
document.addEventListener('DOMContentLoaded', function() {
  var slider = document.querySelector('.slider-container');
  var range = document.querySelector('.slider-range');
  var thumbLeft = document.querySelector('.thumb-left');
  var thumbRight = document.querySelector('.thumb-right');
  
  // Riferimenti alle textbox readonly per visualizzare i valori correnti
  var minDisplay = document.getElementById('min-display');
  var maxDisplay = document.getElementById('max-display');
  
  var isDraggingLeft = false;
  var isDraggingRight = false;
  
  // Definizione dei valori iniziali del range
  var minRange = 1.99
  var maxRange = 159.99;
  
  // Valori correnti iniziali basati su percentuali (ad es. 20% e 80%)
  var leftValue = minRange + (maxRange - minRange) * 0;
  var rightValue = minRange + (maxRange - minRange) * 1;
  
  function updatePositions() {
    var leftPercent = ((leftValue - minRange) / (maxRange - minRange)) * 100;
    var rightPercent = ((rightValue - minRange) / (maxRange - minRange)) * 100;
    thumbLeft.style.left = leftPercent + "%";
    thumbRight.style.left = rightPercent + "%";
    range.style.left = leftPercent + "%";
    range.style.right = (100 - rightPercent) + "%";
    minDisplay.value = leftValue.toFixed(2);
    maxDisplay.value = rightValue.toFixed(2);
  }
  
  updatePositions();
  
  thumbLeft.addEventListener('mousedown', function() {
    isDraggingLeft = true;
  });
  thumbLeft.addEventListener('touchstart', function() {
    isDraggingLeft = true;
  });

  thumbRight.addEventListener('mousedown', function() {
    isDraggingRight = true;
  });
  thumbRight.addEventListener('touchstart', function() {
    isDraggingRight = true;
  });
  
  document.addEventListener('mouseup', function() {
    isDraggingLeft = false;
    isDraggingRight = false;
  });
  document.addEventListener('touchend', function() {
    isDraggingLeft = false;
    isDraggingRight = false;
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDraggingLeft && !isDraggingRight) {
      return;
    }
    var rect = slider.getBoundingClientRect();
    var posPercent = ((e.clientX - rect.left) / rect.width) * 100;
    posPercent = Math.max(0, Math.min(100, posPercent));
    var newValue = minRange + ((maxRange - minRange) * (posPercent / 100));
    
    if (isDraggingLeft) {
      newValue = Math.min(newValue, rightValue);
      leftValue = newValue;
    }
    if (isDraggingRight) {
      newValue = Math.max(newValue, leftValue);
      rightValue = newValue;
    }
    updatePositions();
  });

  document.addEventListener('touchmove', function(e) {
    if (!isDraggingLeft && !isDraggingRight) {
      return;
    }
    var rect = slider.getBoundingClientRect();
    var posPercent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    posPercent = Math.max(0, Math.min(100, posPercent));
    var newValue = minRange + ((maxRange - minRange) * (posPercent / 100));
    
    if (isDraggingLeft) {
      newValue = Math.min(newValue, rightValue);
      leftValue = newValue;
    }
    if (isDraggingRight) {
      newValue = Math.max(newValue, leftValue);
      rightValue = newValue;
    }
    updatePositions();
  });
});