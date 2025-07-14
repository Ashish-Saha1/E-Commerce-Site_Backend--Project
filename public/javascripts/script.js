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





  const flashMsg = document.querySelector('.flash-msg');
  
  setTimeout(() => {
    flashMsg.classList.add('hide-flash')
  }, 2000);