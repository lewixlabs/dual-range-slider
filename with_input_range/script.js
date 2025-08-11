// Compatibilità IE11: usare var al posto di const/let e gestire sia "input" che "change".
(function () {
  var range = document.getElementById('myRange');
  var rangeValue = document.getElementById('rangeValue');

  function setValue(val) {
    if (rangeValue && 'textContent' in rangeValue) {
      rangeValue.textContent = val;
    } else if (rangeValue) {
      rangeValue.innerText = val; // fallback per vecchie versioni di IE
    }
  }

  if (!range || !rangeValue) {
    return;
  }

  // inizializza il valore mostrato
  setValue(range.value);

  function onUpdate() {
    setValue(range.value);
  }

  if (range.addEventListener) {
    range.addEventListener('input', onUpdate, false); // moderno (supportato da IE11)
    range.addEventListener('change', onUpdate, false); // per sicurezza in IE durante il drop
  } else if (range.attachEvent) {
    // fallback per modalità legacy
    range.attachEvent('onchange', onUpdate);
  }
})();