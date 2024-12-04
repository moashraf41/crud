var productName = document.getElementById("productNameInput");
var productCategory = document.getElementById("productCategoryInput");
var productPrice = document.getElementById("productPriceInput");
var productDescription = document.getElementById("productDescriptionInput");
var productSearch = document.getElementById("search");

// Initialize products from localStorage, or create an empty array if none exists
var products = JSON.parse(localStorage.getItem("products")) || [];

// Variable to track if we are editing an existing product
var editIndex = -1;

// Display stored data on page load
window.onload = function () {
  ShowData();
};

function validateForm() {
  let isValid = true;

  // Validate Product Name
  const nameMessage = document.getElementById("nameMessage");
  const nameRegex = /^[A-Z][a-zA-Z]{2,14}$/; // Starts with a capital letter and length between 3 and 15 characters

  if (!productName.value.match(nameRegex)) {
    productName.classList.add("invalid");
    productName.classList.remove("valid");
    nameMessage.textContent =
      "الاسم يجب أن يبدأ بحرف كبير ويكون بين 3 و 15 حرفًا.";
    isValid = false;
  } else {
    productName.classList.add("valid");
    productName.classList.remove("invalid");
    nameMessage.textContent = "";
  }

  // Validate Product Category
  const categoryMessage = document.getElementById("categoryMessage");
  const allowedCategories = ["food", "juice", "drink", "bakery"];

  if (!allowedCategories.includes(productCategory.value.toLowerCase())) {
    productCategory.classList.add("invalid");
    productCategory.classList.remove("valid");
    categoryMessage.textContent =
      "الكاتيجوري يجب أن يكون: food, juice, drink, bakery.";
    isValid = false;
  } else {
    productCategory.classList.add("valid");
    productCategory.classList.remove("invalid");
    categoryMessage.textContent = "";
  }

  // Validate Product Price
  const priceMessage = document.getElementById("priceMessage");

  if (productPrice.value <= 0) {
    productPrice.classList.add("invalid");
    productPrice.classList.remove("valid");
    priceMessage.textContent = "السعر يجب أن يكون أكبر من صفر.";
    isValid = false;
  } else {
    productPrice.classList.add("valid");
    productPrice.classList.remove("invalid");
    priceMessage.textContent = "";
  }

  // Validate Product Description
  const descriptionMessage = document.getElementById("descriptionMessage");

  if (productDescription.value.length > 100) {
    productDescription.classList.add("invalid");
    productDescription.classList.remove("valid");
    descriptionMessage.textContent = "الوصف يجب أن يكون أقل من 100 حرف.";
    isValid = false;
  } else {
    productDescription.classList.add("valid");
    productDescription.classList.remove("invalid");
    descriptionMessage.textContent = "";
  }

  // Submit the form if all fields are valid
  if (isValid) {
    getProduct();
  }
}

function getProduct() {
  var p_name = productName.value;
  var p_Category = productCategory.value;
  var p_Price = productPrice.value;
  var p_Description = productDescription.value;

  var product = {
    name: p_name,
    Category: p_Category,
    Price: p_Price,
    Description: p_Description,
  };

  if (editIndex === -1) {
    // Add a new product
    products.push(product);
  } else {
    // Update an existing product
    products[editIndex] = product;
    editIndex = -1;
  }

  // Save updated products array to localStorage
  localStorage.setItem("products", JSON.stringify(products));
  ShowData();
  clear();
}

function ShowData(filteredProducts = products) {
  var cartona = "";
  for (let i = 0; i < filteredProducts.length; i++) {
    cartona += ` 
      <tr>
        <th scope="row">${filteredProducts[i].name}</th>
        <td>${filteredProducts[i].Category}</td>
        <td>${filteredProducts[i].Price}</td>
        <td>${filteredProducts[i].Description}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
          <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button>
        </td>
      </tr>`;
  }
  document.getElementById("t_body").innerHTML = cartona;
}

function deleteProduct(index) {
  products.splice(index, 1); // Remove the product from the array
  localStorage.setItem("products", JSON.stringify(products)); // Update localStorage
  ShowData(); // Refresh the table
}

function updateProduct(index) {
  productName.value = products[index].name;
  productCategory.value = products[index].Category;
  productPrice.value = products[index].Price;
  productDescription.value = products[index].Description;
  editIndex = index; // Set edit index to update later
}

function clear() {
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productDescription.value = "";
}

function Search() {
  const searchValue = productSearch.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
  ShowData(filteredProducts);
}
