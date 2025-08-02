// Nav bar starts

//const { application } = require("express");

let manuIcon = document.querySelector('.manu-icon');
let manuBar = document.querySelector('.hide-manu');

  manuIcon.addEventListener('click', function(){
    if(manuBar.className === "hide-manu"){
        manuBar.classList.remove('hide-manu')
    }else{
        manuBar.classList.add('hide-manu')
    }
    
  })




//Flash msg manage

  const flashMsg = document.querySelectorAll('.flash-msg');
  
  setTimeout(() => {
    for(let i of flashMsg){
      i.classList.add('hide-flash')
    }
  }, 2000);





  const password = document.querySelectorAll('.pass');
  const checkbox = document.getElementById('checkbox');

  if(checkbox){
      checkbox.addEventListener('change', function(){
    for(let i of password){
        if(this.checked){
        i.type = 'text'
    }else{
      i.type = 'password'
    }
    }
  
  })
  }





   //Increse or decrease input Quantity & calculate total amount as well in product details page

    const plus = document.querySelector('.plus');
    const minus = document.querySelector('.minus');
    let inputQty = document.querySelector('.inputQty');

     
   

    
    const totalCountCalculate = ()=>{
        const productPrice = document.querySelector('.product-price');
        const productQty = document.querySelector('.inputQty');
        const totalPrice = document.querySelector('.totalPrice');

        return totalPrice.innerHTML = Number(productPrice.textContent) * Number(productQty.value);

    }



  if(plus){
    plus.addEventListener('click', function(e){
    e.preventDefault()
    inputQty.value ++
    totalCountCalculate()
  })
  }


  
    if(minus){
       minus.addEventListener('click', function(e){
        e.preventDefault()
        if(inputQty.value < 2){
          console.log( '1 is the value');
          
        }else{
          inputQty.value --
          totalCountCalculate()
        }
          
      })
    }


    

    if(inputQty){
      inputQty.addEventListener('input', function(e){
        e.preventDefault();
        inputQty.value = inputQty.value.replace(/[^0-9]/ig, "0")
        if(inputQty.value < 0){
          console.log('Input value is smaller then 0');
        }
        totalCountCalculate()
      })
    }
     // Ends Here Increse or decrease input Quantity & calculate total amount as well in product details page




// --------------------Update cart count -----------------------


    //Here is a reuse function for total cart amount calculation
async function updateCartTotalAmount() {
  try {
    const amountRes = await fetch('/users/cart-amount-total-api');
    const totalAmountRes = await amountRes.json();

    const subtotal = document.querySelector(".subtotal");
    const totalCost = document.querySelector(".total-cost");

    if (subtotal && totalCost) {
      subtotal.innerText = totalAmountRes.totalAmount;
      totalCost.innerText = totalAmountRes.totalAmount;
    }
  } catch (err) {
    console.error("Error updating cart total amount:", err);
  }
}




    //this is for click button which is fetch backend api
document.querySelectorAll('.qty-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.dataset.id;
    const action = button.dataset.action;

    const qtySpan = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtySpan.textContent);

    // Prevent decrementing below 1
    if (action === 'dec' && currentQty <= 1) return;

    try {
      const res = await fetch('/users/update-cart-quantity-api', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, action })
      });

      const data = await res.json();

      if (res.ok) {
        // Update the visible quantity instantly
        qtySpan.textContent = action === 'inc' ? currentQty + 1 : currentQty - 1;


        //Here implement another fetch for update cart count in cart haeder & total cart item
      const countRes = await fetch('/users/cart-count-api');
      const countData = await countRes.json();

        //Update this countData to DOM
        const cartIcon = document.querySelector('.cart-item-count');
        const cartSummary = document.querySelector('.cart-summary-span');
              if(cartIcon && cartSummary){
                cartIcon.innerText = countData.total;
                cartSummary.innerText = countData.total;
              }else{
                alert("CartIcon is wrong from script.js")
              }


    
  //Here implement another fetch for update cart amount in total cart item sum
      updateCartTotalAmount()


      
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update quantity');
    }
  });
});



// This event listener is for total amount stable if reload page total amonut is stable 
document.addEventListener('DOMContentLoaded', updateCartTotalAmount);




//Delete all products from cart

const deleteAllBtn = document.querySelector('.deleteAll-btn');

deleteAllBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/users/remove-from-cart-all', {
      method: 'POST', // ✅ correct method
      headers: {
        'Content-Type': 'application/json' // optional, since you're not sending a body
      }
    });

    const data = await res.json();
    console.log(data.Mess); // should show: Successfully deleted all products

    // Optional: reload cart page or update UI
    // window.location.reload();
  } catch (error) {
    console.error('Error:', error);
  }
});



