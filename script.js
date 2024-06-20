const apiurl = "https://fakestoreapi.com/products";
const outputdata = document.getElementById("output");
const searchElem = document.getElementById("Search");
const buttonElem = document.getElementById("button-logic");

let products_data = [];

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

function livesearch() {
    let input = searchElem.value.trim().toLowerCase();
    let filterdata = products_data.filter(product =>
        product.title.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input)
    );
    displaydata(filterdata,input);
}

function performsearch() {
    let input = searchElem.value.trim().toLowerCase();
    let filterdata = products_data.filter(product =>
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
        html += `<div>
                    <p>Title: ${title}</p>
                    <p>Description: ${description}</p>
                </div>`;
    });
    outputdata.innerHTML = html;
}