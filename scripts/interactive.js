//Source of code: https://medium.com/@gurjitmehta/smooth-scroll-with-javascript-571283e9a3cd

window.onload = () => {
  ScrollingNav();
  menu();
};

function menu() {
  const menu = document.querySelector(".menu");
  const burgerButton = document.querySelector('.burger-menu');
  function toggleClass() {
    menu.classList.toggle('is-active')
  }
  
  burgerButton.addEventListener('click', () => toggleClass())
  menu.addEventListener('click', () => toggleClass())


}

function ScrollingNav() {
    //Main method for scroll
  	const easeInCubic = function (t) { return t*t*t }
 
  const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
   const runtime = currentTime - startTime;
   let progress = runtime / duration;
   
   progress = Math.min(progress, 1);
   
   const ease = easeInCubic(progress);
   
   window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
if(runtime < duration){
     requestAnimationFrame((timestamp) => {
       const currentTime = timestamp || new Date().getTime();
       scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
     })
   }
  }


  //select all element with class 'Scroll'
  const scrollElements = document.querySelectorAll('.scroll');


  //Adding event to each element
  scrollElements.forEach( elem => {
    elem.addEventListener('click', elem => {
        elem.preventDefault();

        //1 getting the element id to scroll
        const scrollElemId = elem.target.href.split('#')[1]
        //2 Finding the node from the document
        const scrollEndElem = document.getElementById(scrollElemId)
        //3 animating the node
        const anim = requestAnimationFrame((timestamp) => {
            const stamp = timestamp || new Date().getTime();
            const duration = 600;
            const start = stamp;

            const startScrollOffset = window.pageYOffset;

            const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
      
            scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })
    } )
  })

}

