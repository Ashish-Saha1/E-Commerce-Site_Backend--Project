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



 


  // Nav bar Ends


  // let search = document.querySelector('.nav-search');
  // let cl = document.querySelector("#nav-container-1")


  // search.addEventListener('click',function(k){
  //   k.preventDefault()
  //   console.log('click')
  //   if(cl.className === "nav-container-1"){
  //     cl.classList.remove('nav-container-1')
  //   }else{
  //     cl.classList.add('nav-container-1')
  //   }
  // })