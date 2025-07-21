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





   //Increse or decrease input Quantity

  const plus = document.querySelector('.plus');
  const minus = document.querySelector('.minus');
  const inputQty = document.querySelector('.inputQty');

  console.log(inputQty);

  if(plus){
     plus.addEventListener('click', function(e){
    e.preventDefault()
    inputQty.value ++
    
  })
  }


  
    if(minus){
       minus.addEventListener('click', function(e){
        e.preventDefault()
        if(inputQty.value < 2){
          console.log( '1 is the value');
          
        }else{
          inputQty.value --
        }
          
      })
    }
  




    const productPrice = document.querySelector('.product-price');
    const productQty = document.querySelector('.inputQty');
    const totalPrice = document.querySelector('.totalPrice');

    console.log(productPrice.innerHTML, productQty.value, totalPrice.innerHTML);
    
    totalPrice.value = Number(productPrice.innerHTML) * Number(productQty.value);
    console.log(totalPrice.innerHTML );
    