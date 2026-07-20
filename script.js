// ===============================
// Typing Animation
// ===============================

var typed = new Typed(".typing", {

    strings: [
        "Graphic Designer",
        "Computer Science Student",
        "Creative Thinker",
        "Brand Designer",
        "Freelancer"
    ],

    typeSpeed: 80,

    backSpeed: 45,

    backDelay: 1500,

    loop: true

});


// ===============================
// Custom Cursor
// ===============================

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e)=>{

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});


// ===============================
// Navbar Active Link
// ===============================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))

        .scrollIntoView({

            behavior:"smooth"

        });

    });

});


// ===============================
// Scroll Reveal
// ===============================

ScrollReveal().reveal(

'.hero-left,.hero-right',

{

distance:'80px',

duration:1800,

origin:'bottom',

reset:false

}

);

ScrollReveal().reveal(

'.about',

{

delay:200,

distance:'60px',

origin:'left'

}

);

ScrollReveal().reveal(

'.skill',

{

interval:200,

distance:'60px',

origin:'bottom'

}

);

ScrollReveal().reveal(

'.card',

{

interval:150,

distance:'60px',

origin:'bottom'

}

);

ScrollReveal().reveal(

'.portfolio-card',

{

interval:150,

distance:'70px',

origin:'bottom'

}

);

ScrollReveal().reveal(

'.contact-box',

{

distance:'80px',

origin:'right'

}

);


// ===============================
// Header Background on Scroll
// ===============================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>80){

header.style.background="rgba(8,15,30,.9)";

header.style.backdropFilter="blur(20px)";

}else{

header.style.background="rgba(255,255,255,.05)";

}

});


// ===============================
// Portfolio Hover Effect
// ===============================

document.querySelectorAll(".portfolio-card")

.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,

rgba(0,212,255,.25),

rgba(255,255,255,.05))`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="rgba(255,255,255,.05)";

});

});


// ===============================
// Button Ripple Effect
// ===============================

document.querySelectorAll(".btn,.btn2")

.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});


// ===============================
// Experience Counter
// ===============================

const exp=document.querySelector(".experience h1");

let done=false;

window.addEventListener("scroll",()=>{

if(done) return;

const pos=exp.getBoundingClientRect().top;

if(pos<window.innerHeight-100){

done=true;

let count=0;

const timer=setInterval(()=>{

count++;

exp.innerHTML=count+" Year Professional Experience";

if(count>=1){

clearInterval(timer);

}

},400);

}

});


// ===============================
// Avatar Glow Animation
// ===============================

const avatar=document.querySelector(".avatar");

setInterval(()=>{

avatar.classList.toggle("glow");

},1800);


// ===============================
// Portfolio Lightbox (Full-screen, Zoom, Nav, Swipe)
// ===============================

(function(){

    const cards = document.querySelectorAll(".portfolio-card");
    const images = Array.from(cards).map(card=>{
        const img = card.querySelector("img");
        return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxImgWrapper = document.getElementById("lightboxImgWrapper");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");
    const zoomInBtn = document.getElementById("zoomInBtn");
    const zoomOutBtn = document.getElementById("zoomOutBtn");
    const zoomResetBtn = document.getElementById("zoomResetBtn");
    const counter = document.getElementById("lightboxCounter");

    let currentIndex = 0;
    let zoomLevel = 1;
    const minZoom = 1;
    const maxZoom = 3;
    const zoomStep = 0.5;

    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    let touchStartX = 0;
    let touchStartY = 0;

    function applyTransform(withTransition){
        lightboxImg.classList.toggle("dragging", !withTransition);
        lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
        lightboxImg.style.cursor = zoomLevel > minZoom ? "grab" : "default";
    }

    function resetZoom(){
        zoomLevel = 1;
        panX = 0;
        panY = 0;
        applyTransform(true);
    }

    function showImage(index){
        currentIndex = (index + images.length) % images.length;
        const item = images[currentIndex];
        lightboxImg.classList.remove("loaded");
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        counter.textContent = (currentIndex + 1) + " / " + images.length;
        resetZoom();
        lightboxImg.onload = ()=>{ lightboxImg.classList.add("loaded"); };
    }

    function openLightbox(index){
        showImage(index);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox(){
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        resetZoom();
    }

    function nextImage(){ showImage(currentIndex + 1); }
    function prevImage(){ showImage(currentIndex - 1); }

    function zoomIn(){
        zoomLevel = Math.min(maxZoom, zoomLevel + zoomStep);
        applyTransform(true);
    }

    function zoomOut(){
        zoomLevel = Math.max(minZoom, zoomLevel - zoomStep);
        if(zoomLevel === minZoom){ panX = 0; panY = 0; }
        applyTransform(true);
    }

    cards.forEach((card, index)=>{
        card.addEventListener("click", ()=> openLightbox(index));
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);
    zoomInBtn.addEventListener("click", zoomIn);
    zoomOutBtn.addEventListener("click", zoomOut);
    zoomResetBtn.addEventListener("click", resetZoom);

    // Click outside image closes lightbox
    lightbox.addEventListener("click", (e)=>{
        if(e.target === lightbox){
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", (e)=>{
        if(!lightbox.classList.contains("active")) return;
        if(e.key === "Escape") closeLightbox();
        else if(e.key === "ArrowRight") nextImage();
        else if(e.key === "ArrowLeft") prevImage();
        else if(e.key === "+" || e.key === "=") zoomIn();
        else if(e.key === "-" || e.key === "_") zoomOut();
    });

    // Mouse wheel zoom
    lightboxImgWrapper.addEventListener("wheel", (e)=>{
        e.preventDefault();
        if(e.deltaY < 0) zoomIn(); else zoomOut();
    }, { passive:false });

    // Drag to pan when zoomed (mouse)
    lightboxImg.addEventListener("mousedown", (e)=>{
        if(zoomLevel <= minZoom) return;
        isDragging = true;
        dragStartX = e.clientX - panX;
        dragStartY = e.clientY - panY;
        lightboxImg.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e)=>{
        if(!isDragging) return;
        panX = e.clientX - dragStartX;
        panY = e.clientY - dragStartY;
        applyTransform(false);
    });

    window.addEventListener("mouseup", ()=>{
        if(isDragging){
            isDragging = false;
            lightboxImg.style.cursor = zoomLevel > minZoom ? "grab" : "default";
        }
    });

    // Double click to toggle zoom
    lightboxImg.addEventListener("dblclick", ()=>{
        if(zoomLevel > minZoom) resetZoom();
        else { zoomLevel = 2; applyTransform(true); }
    });

    // Touch support: swipe to navigate, drag to pan when zoomed
    lightboxImgWrapper.addEventListener("touchstart", (e)=>{
        if(e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        if(zoomLevel > minZoom){
            isDragging = true;
            dragStartX = touchStartX - panX;
            dragStartY = touchStartY - panY;
        }
    }, { passive:true });

    lightboxImgWrapper.addEventListener("touchmove", (e)=>{
        if(zoomLevel > minZoom && isDragging && e.touches.length === 1){
            panX = e.touches[0].clientX - dragStartX;
            panY = e.touches[0].clientY - dragStartY;
            applyTransform(false);
        }
    }, { passive:true });

    lightboxImgWrapper.addEventListener("touchend", (e)=>{
        isDragging = false;
        if(zoomLevel > minZoom) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if(Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)){
            if(deltaX < 0) nextImage(); else prevImage();
        }
    });

})();


// ===============================
// Page Loading Animation
// ===============================

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});


// ===============================
// Console Message
// ===============================

console.log("%cPortfolio Designed by Ahmad Raza","color:#00d4ff;font-size:22px;font-weight:bold;");