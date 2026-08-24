const KM_PER_MI = 1.609344;
const MI_PER_KM = 1 / KM_PER_MI;

let fromUnit = "kilometer";
let toUnit = "mile";
let lastSource = null;

const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");
const fromUnitEl = document.getElementById("from-unit");
const toUnitEl = document.getElementById("to-unit");
const resultEl = document.getElementById("result");
const swapBtn = document.getElementById("swap-btn");
const convertBtn = document.getElementById("convert-btn");
const clearBtn = document.getElementById("clear-btn");

function convert(value, from, to) {
  if (from === to) return value;
  return from === "kilometer" ? value * MI_PER_KM : value * KM_PER_MI;
}

function formatNumber(n) {
  return parseFloat(n.toFixed(9)).toString();
}

function updateResult(sourceValue, sourceUnit, targetValue, targetUnit) {
  resultEl.innerHTML =
    `<strong>Result:</strong> ${sourceValue} ${sourceUnit} = ${targetValue} ${targetUnit}`;
}

function clearResult() {
  resultEl.innerHTML = "";
}

function recalcFromSource(sourceInput, sourceUnit, targetInput, targetUnit) {
  const raw = sourceInput.value.trim();
  const value = parseFloat(raw);

  if (raw === "" || Number.isNaN(value)) {
    targetInput.value = "";
    clearResult();
    return;
  }

  const converted = formatNumber(convert(value, sourceUnit, targetUnit));
  targetInput.value = converted;
  updateResult(raw, sourceUnit, converted, targetUnit);
}

fromInput.addEventListener("input", () => {
  lastSource = "from";
  recalcFromSource(fromInput, fromUnit, toInput, toUnit);
});

toInput.addEventListener("input", () => {
  lastSource = "to";
  recalcFromSource(toInput, toUnit, fromInput, fromUnit);
});

swapBtn.addEventListener("click", () => {
  [fromUnit, toUnit] = [toUnit, fromUnit];
  fromUnitEl.textContent = fromUnit;
  toUnitEl.textContent = toUnit;

  const fromValue = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = fromValue;

  if (lastSource === "from") {
    recalcFromSource(toInput, toUnit, fromInput, fromUnit);
    lastSource = "to";
  } else if (lastSource === "to") {
    recalcFromSource(fromInput, fromUnit, toInput, toUnit);
    lastSource = "from";
  } else {
    clearResult();
  }
});

convertBtn.addEventListener("click", () => {
  if (lastSource === "to") {
    recalcFromSource(toInput, toUnit, fromInput, fromUnit);
  } else {
    recalcFromSource(fromInput, fromUnit, toInput, toUnit);
  }
});

clearBtn.addEventListener("click", () => {
  fromInput.value = "";
  toInput.value = "";
  lastSource = null;
  clearResult();
});
