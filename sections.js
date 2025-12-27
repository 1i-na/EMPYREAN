"use strict";

const sectionFrames = document.querySelectorAll(".section_frames");

// SECTION FRAMES COLOR CHANGE

sectionFrames.forEach(frame => {
    const img = frame.src;
    const color = img.replace("_monotone", "_color");
    frame.addEventListener("mouseover", () => frame.src = color);
    frame.addEventListener("mouseout", () => frame.src = img);
});


// CAROUSEL

const frames = document.getElementById("frames");
const backBtn = document.getElementById("back_button");
const nextBtn = document.getElementById("next_button");

let currentIndex = 2;

function updateCarousel(){
    sectionFrames.forEach((frame, index) => {
        frame.classList.toggle("active", index === currentIndex);
    });

    const frameWidth = sectionFrames[0].getBoundingClientRect().width + 40;
    const containerWidth = document.querySelector(".carousel").offsetWidth;
    const offset = containerWidth / 2 - frameWidth / 2 - currentIndex * frameWidth;
    frames.style.transform = `translateX(${offset}px)`;
}

backBtn.addEventListener("click", () => {
    if (currentIndex > 0){
        currentIndex --;
        updateCarousel();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < sectionFrames.length - 1){
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();