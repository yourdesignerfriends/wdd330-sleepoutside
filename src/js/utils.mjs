// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//get parameter from url

export function getParam(param){
  const queryString = window.location.search; //get all the url
  const urlParams = new URLSearchParams(queryString); //convert the url in a object
  const productCode = urlParams.get(param);// get the code of the product
  return productCode;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function cartCounter(){
  const cartItems = getLocalStorage("so-cart") || [];
  let count = 0;
  if(cartItems.length > 0){
    cartItems.forEach(item => count++);
    document.querySelector(".cartCounter").style.display = "block";
    document.querySelector(".cartCounter").innerHTML = count;
  }
  else{
    document.querySelector(".cartCounter").style.display = "none";
  }
  
}
