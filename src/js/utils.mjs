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


export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback){
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header-page");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer-page");
  renderWithTemplate(footerTemplate, footerElement);
  cartCounter();
}

export function showBreadCrumb(data){
  const element = document.querySelector(".breacrumb")
  const queryString = window.location.search; //get all the url
  const urlParams = new URLSearchParams(queryString); //convert the url in a object
  if (urlParams.has("category")){
    element.innerHTML = `<p>Home > Category > ${getParam("category")} ${data} items</p>`;
  }
  else if(urlParams.has("product")){
    element.innerHTML = `<p>Home > Category > ${data}</p>`;
  }
}