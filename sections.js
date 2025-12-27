"use strict";

const sectionFrames = document.querySelectorAll(".section_frames");

const frames = document.getElementById("frames");
const backBtn = document.getElementById("back_button");
const nextBtn = document.getElementById("next_button");

let currentIndex = 2;

// SECTION FRAMES COLOR CHANGE
sectionFrames.forEach(frame => {
    frame.dataset.monotone = frame.src;
    frame.dataset.color = frame.src.replace("_monotone", "_color");
});

// CAROUSEL

function updateCarousel(){
    sectionFrames.forEach((frame, index) => {
        const isActive = index === currentIndex;
        frame.classList.toggle("active", index === currentIndex);
        frame.src = isActive ? frame.dataset.color : frame.dataset.monotone;
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

// FRAMES DEPTH
sectionFrames.forEach((frame, index) => {
    frame.classList.remove("active", "near");

    if (index === currentIndex){
        frame.classList.add("active");
    } else if (Math.abs(index - currentIndex) === 1){
        frame.classList.add("near");
    }
});