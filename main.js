let bar = document.querySelector(".bar");
let inputFrom = document.querySelector(".inputFrom");
let inputTo = document.querySelector(".inputTo");
let paragraphFrom = document.querySelector(".paragraphFrom");
let paragraphTo = document.querySelector(".paragraphTo");
let From, To;
AllEve();
function AllEve() {
  bar.addEventListener("click", currCalculate);
  inputFrom.addEventListener("keyup", getDataByFrom);
  inputTo.addEventListener("keyup", getDataByTo);
}
function currCalculate(e) {
  Array.from(e.target.parentElement.children).forEach((x) =>x.removeAttribute("style"));
  if (e.target.parentElement.className.indexOf("optionsFrom") !== -1) {
    e.target.setAttribute("style", "background: #833AE0;color:#fff");
    From = e.target.textContent;
    getDataByFrom();
  } else if (e.target.parentElement.className.indexOf("optionsTo") !== -1) {
    e.target.setAttribute("style", "background: #833AE0;color:#fff");
    To = e.target.textContent;
    getDataByFrom();
  }
}
async function getDataByFrom() {
  const response = await fetch(`https://api.exchangerate.host/latest?base=${From}&symbols=${To}`);
  const data = await response.json();
  inputTo.value =( Object.values(data.rates)[0] * inputFrom.value).toFixed(5);
  if(From && To){
  paragraphFrom.textContent = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)}`;
  paragraphTo.textContent = `1 ${Object.keys(data.rates)} = ${(1/Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
  }
}
async function getDataByTo() {
  const response = await fetch(`https://api.exchangerate.host/latest?base=${From}&symbols=${To}`);
  const data = await response.json();
  inputFrom.value = (inputTo.value / Object.values(data.rates)[0]).toFixed(2);
}