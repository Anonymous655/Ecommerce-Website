//   console.log("jkdfh")
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeBtns = document.getElementsByClassName("remove-btn");
    for (let i = 0; i < removeBtns.length; i++) {
        let removeBtn = removeBtns[i];
        removeBtn.addEventListener("click", rmvBtn)
    }

    document.getElementById("btn").addEventListener("click", ordered);
    
    
    let quantityInput = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener("change", quantityChanged)
    }
    
}
function rmvBtn(e){
    e.target.parentElement.parentElement.remove()
    updateTotal()
}
function quantityChanged(e) {
    let input2 = e.target;
    // console.log(input2)
    if (isNaN(input2.value) || input2.value <= 0) {
        input2.value = 1;
    }
    updateTotal();
}
function ordered(){
    alert("Thank You for your order");
    let cart = document.getElementsByClassName("cart")[0];
    let rows = cart.getElementsByClassName("row");
    while(rows.length > 1){
        cart.removeChild(cart.lastChild)
    }
    updateTotal()

}



let atcButtons = document.getElementsByClassName("atc");
for (let i = 0; i < atcButtons.length; i++) {
    button = atcButtons[i];
    button.addEventListener('click', added)
}
function added(e) {
    let btn = e.target;
    let container = btn.parentElement.parentElement;
    let title = container.getElementsByClassName("album")[0].innerText;
    let price = container.getElementsByClassName("price")[0].innerText;
    let imgsrc = container.querySelector("img").src;
    // console.log(imgsrc)
    addRow(title, price, imgsrc)
    updateTotal()
}

function addRow(title, price, imgsrc) {
    let cart = document.getElementsByClassName("cart")[0];
    let row = document.createElement("div")
    let itemNames = cart.getElementsByClassName("productName");
    for(let i = 0; i<itemNames.length; i++){
        if(itemNames[i].innerText == title){
            alert("Item is already added")
            return
        }
    }
    row.innerHTML = `
            <div class="added-products pieces">
              <img
                src="${imgsrc}"
                alt=""
                class="tshirt-img"
              />
            <div class="tshirt img-text productName">${title}</div>
            </div>
          <div class="pieces price2">${price}</div>
          <div class="pieces quantity pieces">
            <input type="number" value="1" class="cart-quantity" />
            <button class="remove-btn">REMOVE</button>
          </div>
            
      </div>`

    cart.appendChild(row);
    row.classList.add("row")
    row.classList.add("rows")
    row.getElementsByClassName("remove-btn")[0].addEventListener("click", rmvBtn)
    row.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)
    // console.log(removeBtns)
    
}










function updateTotal() {
    let cartRows = document.getElementsByClassName("rows");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceTag = cartRow.getElementsByClassName("price2")[0];
        let quantityTag = cartRow.getElementsByClassName("cart-quantity")[0];
        let price = priceTag.innerText.replace("$", "");
        let quantity = quantityTag.value;
        total = total + (price * quantity)
        total = Math.round(total * 100) / 100
        // console.log(total)
    }
    document.getElementsByClassName("t-amount")[0].innerText = `$` + total;
}
