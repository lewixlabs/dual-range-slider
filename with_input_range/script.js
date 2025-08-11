(function() {
    var slider = document.querySelector('.slider-container');
    var track = document.querySelector('.slider-track');
    var thumbMin = document.getElementById('thumb-min');
    var thumbMax = document.getElementById('thumb-max');
    var inputMin = document.getElementById('input-min');
    var inputMax = document.getElementById('input-max');
    var valueMin = document.getElementById('value-min');
    var valueMax = document.getElementById('value-max');

    var min = 0;
    var max = 100;
    var step = 1;
    var sliderWidth = 400;
    var thumbWidth = 24;

    var dragging = null;

    function setThumbPositions(minValue, maxValue) {
        var minPos = ((minValue - min) / (max - min)) * (sliderWidth - thumbWidth);
        var maxPos = ((maxValue - min) / (max - min)) * (sliderWidth - thumbWidth);
        thumbMin.style.left = minPos + 'px';
        thumbMax.style.left = maxPos + 'px';
        valueMin.innerText = minValue;
        valueMax.innerText = maxValue;
        inputMin.value = minValue;
        inputMax.value = maxValue;
    }

    function clamp(val, minVal, maxVal) {
        return Math.max(minVal, Math.min(val, maxVal));
    }

    function onMouseDown(e) {
        dragging = e.target;
        document.attachEvent ? document.attachEvent('onmousemove', onMouseMove) : document.addEventListener('mousemove', onMouseMove);
        document.attachEvent ? document.attachEvent('onmouseup', onMouseUp) : document.addEventListener('mouseup', onMouseUp);
        e.preventDefault && e.preventDefault();
    }

    function onMouseMove(e) {
        var rect = slider.getBoundingClientRect();
        var x = (e.clientX || e.pageX) - rect.left;
        x = clamp(x, 0, sliderWidth - thumbWidth);
        var value = Math.round(min + (x / (sliderWidth - thumbWidth)) * (max - min));
        var minValue = parseInt(inputMin.value, 10);
        var maxValue = parseInt(inputMax.value, 10);
        if (dragging === thumbMin) {
            minValue = clamp(value, min, maxValue);
        } else if (dragging === thumbMax) {
            maxValue = clamp(value, minValue, max);
        }
        setThumbPositions(minValue, maxValue);
    }

    function onMouseUp(e) {
        document.detachEvent ? document.detachEvent('onmousemove', onMouseMove) : document.removeEventListener('mousemove', onMouseMove);
        document.detachEvent ? document.detachEvent('onmouseup', onMouseUp) : document.removeEventListener('mouseup', onMouseUp);
        dragging = null;
    }

    thumbMin.attachEvent ? thumbMin.attachEvent('onmousedown', onMouseDown) : thumbMin.addEventListener('mousedown', onMouseDown);
    thumbMax.attachEvent ? thumbMax.attachEvent('onmousedown', onMouseDown) : thumbMax.addEventListener('mousedown', onMouseDown);

    setThumbPositions(parseInt(inputMin.value, 10), parseInt(inputMax.value, 10));
})();
