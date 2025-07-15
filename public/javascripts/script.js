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
  // const flashMsg = document.querySelector('.flash-msg');
  
  // setTimeout(() => {
  //   flashMsg.classList.add('hide-flash')
  // }, 2000);

   const flashMsg = document.querySelectorAll('.flash-msg');
  
  setTimeout(() => {
    for(let i of flashMsg){
       i.classList.add('hide-flash')
    }
  }, 2000);



  //Show hide password to front end

  // const password = document.querySelector('.pass');
  // const checkbox = document.getElementById('checkbox');

  // checkbox.addEventListener('change', function(){
  //   if(this.checked){
  //      password.type = 'text'
  //   }else{
  //     password.type = 'password'
  //   }
     
  // })

  const password = document.querySelectorAll('.pass');
  const checkbox = document.getElementById('checkbox');

  checkbox.addEventListener('change', function(){
    for(let i of password){
        if(this.checked){
       i.type = 'text'
    }else{
      i.type = 'password'
    }
    }
     
  })
