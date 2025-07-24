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





   //Increse or decrease input Quantity & calculate total amount as well

    const plus = document.querySelector('.plus');
    const minus = document.querySelector('.minus');
    const inputQty = document.querySelector('.inputQty');


   

    
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

    console.log(inputQty.value);
    

    if(inputQty){
      inputQty.addEventListener('input', function(e){
        e.preventDefault();
        if(inputQty.value < 0){
          console.log('Input value is smaller then 0');
          
        }
        totalCountCalculate()
      })
    }
  




    // const productPrice = document.querySelector('.product-price');
    // const productQty = document.querySelector('.inputQty');
    // const totalPrice = document.querySelector('.totalPrice');

    // console.log(productPrice.textContent, productQty.value, totalPrice.textContent);
    
    //  totalPrice.innerHTML = Number(productPrice.textContent) * Number(productQty.value);
    // console.log(totalPrice.innerHTML );
    