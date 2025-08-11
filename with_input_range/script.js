// Compatibilità IE11: usare var al posto di const/let e gestire sia "input" che "change".
(function () {
  var range = document.getElementById('myRange');
  var rangeValue = document.getElementById('rangeValue');

  var rangeInverse = document.getElementById('myRangeInverse');
  var rangeValueInverse = document.getElementById('rangeValueInverse');

  function setValue(val) {
    if (rangeValue && 'textContent' in rangeValue) {
      rangeValue.textContent = val;
    } else if (rangeValue) {
      rangeValue.innerText = val; // fallback per vecchie versioni di IE
    }
  }

  function setValueInverse(val) {
    if (rangeValueInverse && 'textContent' in rangeValueInverse) {
      rangeValueInverse.textContent = val;
    } else if (rangeValueInverse) {
      rangeValueInverse.innerText = val;
    }
  }

  if (!range || !rangeValue) {
    return;
  }

  // inizializza il valore mostrato
  setValue(range.value);

  if (rangeInverse && rangeValueInverse) {
    setValueInverse(rangeInverse.value);
  }

  function onUpdate() {
    setValue(range.value);
  }

  function onUpdateInverse() {
    setValueInverse(rangeInverse.value);
  }

  if (range.addEventListener) {
    range.addEventListener('input', onUpdate, false); // moderno (supportato da IE11)
    range.addEventListener('change', onUpdate, false); // per sicurezza in IE durante il drop
  } else if (range.attachEvent) {
    // fallback per modalità legacy
    range.attachEvent('onchange', onUpdate);
  }

  if (rangeInverse) {
    if (rangeInverse.addEventListener) {
      rangeInverse.addEventListener('input', onUpdateInverse, false);
      rangeInverse.addEventListener('change', onUpdateInverse, false);
    } else if (rangeInverse.attachEvent) {
      rangeInverse.attachEvent('onchange', onUpdateInverse);
    }
  }
})();