

let container = document.getElementById("container");
let btncontainer = document.getElementById("btn-container");

async function getData() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP Request : ${response.statusText}`);
        }
        let result = await response.json();
        localStorage.setItem("products", JSON.stringify(result));
        createButton();
        displayData();
    } catch (err) {
        console.error(err);
    }
}
function createButton() {
    btncontainer.innerHTML = ``; // Clear existing content

    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let categories = Array.from(new Set(products.map(obj => obj.category)));

        let select = document.createElement("select");

        let defaultOption = document.createElement("option");
        defaultOption.textContent = "Select Category";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });

        select.addEventListener("change", (event) => {
            filterData(event.target.value);
        });

        btncontainer.appendChild(select);
    }
}
function filterData(category) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = products.filter(obj => obj.category === category);
        displayData(result);
    }
}

function displayData(filterProducts) {
    container.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (filterProducts !== undefined) {
        products = filterProducts;
    }
    if (products.length === 0) {
        container.innerHTML = "No data Available";
    } else {
        products.forEach(obj => {
            let item = document.createElement("div");
            item.innerHTML = `
                <p>Category : ${obj.category}</p>
                <img src=${obj.image}>
                <h3>Title : ${obj.title}</h3>
                <p>Rating : ${obj.rating.rate}</p>
            `;
            container.appendChild(item);
        })
    }
}



window.onload = getData;