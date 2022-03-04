// let controller = new ScrollMagic.Controller();

// let exploreScene = new ScrollMagic.Scene({
//     triggerElement: ".hike-exp",
//     triggerHook: 0.5
// })
//     .addIndicators({ colorStart: "white", colorTrigger: "white" })
//     .setClassToggle(".hike-exp", "active")
//     .addTo(controller);

let controller;
let slideScene;
let pageScene;

function animateSlides() {
    // Initialise controller
    controller = new ScrollMagic.Controller();

    let sliders = document.querySelectorAll(".slide");
    let nav = document.querySelectorAll(".nav-header");
    // Loop over each slide
    sliders.forEach((slide, index, slides) => {
        let revealText = slide.querySelectorAll(".reveal-text");
        let Img = slide.querySelectorAll("img");
        let heroImgContainer = slide.querySelector(".hero-img");
        let heroText = slide.querySelectorAll(".hero-desc");
        let revealImg = slide.querySelectorAll(".reveal-img");
        // GSAP
        let slideT1 = gsap.timeline({
            defaults: { duration: 1.2, ease: "power3.inOut" }
        })
        slideT1.fromTo(revealImg, { x: "0%" }, { x: "100%" })
        slideT1.fromTo(Img, { scale: "2" }, { scale: "1" }, "-=1")
        slideT1.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.85")
        slideT1.fromTo(nav, { y: "-100%" }, { y: "0%"}, "-=0.60")
        // Create Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.15,
            reverse: true
        })
            .setTween(slideT1)
            .addIndicators({
                colorStart: "white",
                colorTrigger: "white",
                name: 'slide'
            })
            .addTo(controller)
        // New animation
        let pageT1 = gsap.timeline()
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        console.log(nextSlide);
        pageT1.fromTo(nextSlide, { y: "0%" }, { y: "50%" })
        // pageT1.fromTo(slide, { opacity: 1 }, { opacity: 0, scale: 0.5 })
        pageT1.fromTo(heroImgContainer, { opacity: 1 }, { opacity: 0, scale: 2,transform:"translate(-40%) rotate(30deg)"})
        pageT1.fromTo(heroText, { opacity: 1 }, { opacity: 0, scale: 1,transform:"translate(50%)" },"-=0.5")
        pageT1.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5")
        // Create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0,
            duration: "100%",
            reverse: true
        })
            .setPin(slide, { pushFollowers: true })
            .setTween(pageT1)
            .addIndicators({
                colorStart: "white",
                colorTrigger: "white",
                name: 'page',
                indent: 200
            })
            .addTo(controller)
    })
}

let mouse = document.querySelector(".cursor");
let mouseText = document.querySelector(".cursor-text");
let hamBurger = document.querySelector(".ham-burger");

function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
    let item = e.target;
    if (item.classList.contains("ham-burger") || item.id === "logo") {
        mouse.classList.add("nav-active");
    }
    else {
        mouse.classList.remove("nav-active");
    }

    
    if (item.classList.contains("explore")) {
        mouse.classList.add("exp-active");
        mouseText.innerText = "Tap";
        gsap.to(".title-swipe", 1, { transform: "translateY(0%)" });
    }
    else {
        mouse.classList.remove("exp-active");
        mouseText.innerText = "";
        gsap.to(".title-swipe", 1, { transform: "translateY(100%)" });
    }
}
function navLogoToggle(e) {
    if(!e.target.classList.contains("active")){
        e.target.classList.add("active");
        gsap.to(".line1", 0.5, { rotate: "45deg", y: "5px", background: "black" });
        gsap.to(".line2", 0.5, { rotate: "-45deg", y: "-5px", background: "black" });
        gsap.to("#logo", 0.5, { color: "black" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(3000px at 100% -10%)" });
        // To remove the scrolling option during navbar expands
        document.body.classList.add("hide");
    }
    else{
        e.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0deg", y: "0px", background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0deg", y: "0px", background: "white" });
        gsap.to("#logo", 0.5, { color: "white" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
    }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
hamBurger.addEventListener("click", navLogoToggle);


animateSlides();

