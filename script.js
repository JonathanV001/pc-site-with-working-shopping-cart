const toggleButton = document.getElementsByClassName('toggle-button')[0];
const dropDownLinks = document.getElementsByClassName('dropdown')[0];

toggleButton.addEventListener('click', () => {
    dropDownLinks.classList.toggle('active')
})

const shoppingCartButton = document.getElementsByClassName('material-symbols-outlined')[0];
const shoppingMenu = document.getElementsByClassName('shoppingMenu')[0];
const closeCart = document.querySelector("#close-cart"); //make the elements something visiable
                
shoppingCartButton.onclick = () => {
    shoppingMenu.classList.add('active');                      
};

closeCart.onclick = () => {
    shoppingMenu.classList.remove('active');           
};       

// Cart Working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

// Making Function
function ready(){
    //Remove items from cart on click of the remove button (need to make later)
    var removeCartButtons = document.getElementsByClassName('cart-remove'); //not sure what tob pass here
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName('button');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //press image to add to cart
    var addCart = document.getElementsByClassName('imageButton');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

//Buy button
function buyButtonClicked(){
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

//Remove Items From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

//Add to cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('productTitle')[0].innerText;
    console.log(title);
    var price = shopProducts.getElementsByClassName('productPrice')[0].innerText;
    console.log(price);
    var productImg = shopProducts.getElementsByClassName("productImage")[0].src;
    console.log(productImg);
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert("You have already added this item to the cart");
        return;
        }
    }

    var cartBoxContent = `
                        <img src = "${productImg}" alt = "" class = "cart-img"> 
                        <div class="detail-box"> 
                            <div class="cart-product-title">${title}</div> 
                            <div class="cart-price">${price}</div> 
                            <input type="number" value="1" class="cart-quantity"> 
                        </div> 
                        <i class="bx bxs-trash-alt cart-remove"></i>`;


    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
}

//update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('shoppingMenu')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');//this is extra container in shoppingMenu for the individual items
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];//make class like this that has the price on an item
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]; //same as above
        var quantity = quantityElement.value; //make an atrtribute for value (reps quantity)
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        total = total + (price * quantity);
    }
        // If price Contain some Cents Value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total; //make element with class totla  price
}


