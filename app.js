const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let dropdowns = document.querySelectorAll(".dropdown select");
let result = document.querySelector("#result");
let btn = document.querySelector("#btn");
let from = document.querySelector(".from_box select");
let to = document.querySelector(".to_box select");

for(let select of dropdowns)
{
  for(let code in countryList)
  {
    let option = document.createElement("option");
    option.innerText = code;
    option.value = code;
    if(select.name === "from" && option.value === "USD")
    {
      option.selected = "selected";
    }else if(select.name === "to" && option.value === "INR")
      {
        option.selected = "selected";
      }
    select.append(option);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag = (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector("#amount").value;
  if(amount==="" || amount===0)
  {
    amount=1;
  }
  let fromCurr = from.value.toLowerCase();
  let toCurr = to.value.toLowerCase();
  const URL = `${baseURL}${fromCurr}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let res = amount*data[fromCurr][toCurr];
  result.innerText=`${amount} ${from.value} = ${res} ${to.value}`;
});
