let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
async function fetchData() {
  axios.get('https://zylalabs.com/api/313/get+apps+info+and+reviews+api/252/search+app?store=google&term=')
    .then(response => {
      // Handle the data
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
}
menu.onclick = ()=>{

    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
window.onscroll= () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

}
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", " ");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); 
}



