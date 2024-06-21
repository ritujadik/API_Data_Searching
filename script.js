const apiurl = "https://fakestoreapi.com/products";
const outputdata = document.getElementById("output");
const searchElem = document.getElementById("Search");
const buttonElem = document.getElementById("button-logic");
const addElem = document.getElementById("add");
const add_productElem = document.getElementById("add-product")

let products_data = [];
let filterdata = [];

fetch(apiurl)
  .then(Response =>{
    if(!Response.ok){
        throw new Error ("Network response was not ok");    
    }
    return Response.json();
  })
  .then(data => {
    products_data = data;
    outputdata.textContent=JSON.stringify(data, null, 2);
  })
  .catch(Error => {
    console.error(error);
  });
searchElem.addEventListener("input",livesearch);
buttonElem.addEventListener("click",performsearch);
add_productElem.addEventListener("click",add_Product);

function livesearch() {
    let input = searchElem.value.trim().toLowerCase();
    filterdata = products_data.filter(product =>
        product.title.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input)
    );
    displaydata(filterdata,input);
}

function performsearch() {
    let input = searchElem.value.trim().toLowerCase();
    filterdata = products_data.filter(product =>
        product.title.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input)
    );
    displaydata(filterdata,input);        
}    

function displaydata(data,searchTerm) {
    let html = '';
    data.forEach(item => {
        let title = item.title.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
        let description = item.description.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
        html += `
        <div>
            <p>Title: ${title}</p>
            <p>Description: ${description}</p>
        </div>`;
});
  outputdata.innerHTML = html;
}

function add_Product() {

  if(filterdata.length>0) {
    const wishlistitem ={
      id:filterdata[0].id,
      title:filterdata[0].title,
      description:filterdata[0].description
    };
    saveToLocalStorage(wishlistitem);
    displaywishlist();
  }
}
function saveToLocalStorage(item) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.push(item);
  localStorage.setItem('wishlist',JSON.stringify(wishlist));
}

function loadWishlist() {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.forEach(item => {
    const new_item = document.createElement("li");
    new_item.textContent = item.title;
    addElem.append(new_item);
  });
}
function displaywishlist() {
  addElem.innerHTML = '';
  loadWishlist();
}
  