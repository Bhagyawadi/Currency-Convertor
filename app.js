const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;
    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;
    select.append(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  const amountInput = document.querySelector(".amount input");
  let amtVal = parseFloat(amountInput.value);

  if (!amtVal || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;
  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amtVal}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const result = data.result;
    msg.innerText = `${amtVal} ${from} = ${result.toFixed(2)} ${to}`;
    msg.style.color = "black";
  } catch (err) {
    msg.innerText = "Error fetching exchange rate.";
    msg.style.color = "red";
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);
