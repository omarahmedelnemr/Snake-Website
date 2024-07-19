// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}



function goNext(event){
    console.log("Clicked")
    const old = document.querySelector(".old")
    const active = document.querySelector(".active")
    const sub_active = document.querySelector(".sub_active")
    const sub_sub_active = document.querySelector(".sub_sub_active")


    old.classList.remove('old')
    old.classList.add('sub_sub_active')

    active.classList.remove("active")
    active.classList.add("old")

    sub_active.classList.remove("sub_active")
    sub_active.classList.add("active")

    sub_sub_active.classList.remove("sub_sub_active")
    sub_sub_active.classList.add("sub_active")
    document.querySelector('#homepage').style.setProperty('--bg-image', `url("${sub_active.src}")`);

}


function goBack(event){
    console.log("Clicked")
    const old = document.querySelector(".old")
    const active = document.querySelector(".active")
    const sub_active = document.querySelector(".sub_active")
    const sub_sub_active = document.querySelector(".sub_sub_active")


    old.classList.remove('old')
    old.classList.add('active')

    active.classList.remove("active")
    active.classList.add("sub_active")

    sub_active.classList.remove("sub_active")
    sub_active.classList.add("sub_sub_active")

    sub_sub_active.classList.remove("sub_sub_active")
    sub_sub_active.classList.add("old")

    document.querySelector('#homepage').style.setProperty('--bg-image', `url("${old.src}")`);


    console.log(Array(document.querySelectorAll(".sliderImages img")).indexOf(old))
}