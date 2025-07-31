// Nav bar starts

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

document.querySelectorAll('.qty-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.dataset.id;
    const action = button.dataset.action;

    const qtySpan = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtySpan.textContent);

    // Prevent decrementing below 1
    if (action === 'dec' && currentQty <= 1) return;

    try {
      const res = await fetch('/users/update-cart-quantity', {
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
      
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update quantity');
    }
  });
});
