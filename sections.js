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

    //wrap each frame for better css handling
    const wrapper = document.createElement("div");
    wrapper.className = "frame";
    frame.parentNode.insertBefore(wrapper, frame);
    wrapper.appendChild(frame);
});

// CAROUSEL
function updateCarousel(){
    sectionFrames.forEach((frame, index) => {
        const wrapper = frame.parentElement;
        wrapper.classList.remove("active", "near", "far");

        const distance = Math.abs(index - currentIndex);

        if (distance === 0) {
            wrapper.classList.add("active");
        } else if (distance === 1) {
            wrapper.classList.add("near");
        } else {
            wrapper.classList.add("far");
        }

        //only active and near frames are in color
        frame.src = distance <= 1
            ? frame.dataset.color
            : frame.dataset.monotone;
    });

    const frameWidth = sectionFrames[0].getBoundingClientRect().width + 40;
    const containerWidth = document.querySelector(".carousel").offsetWidth;
    const offset = containerWidth / 2 - frameWidth / 2 - currentIndex * frameWidth;

    frames.style.transform = `translateX(${offset}px)`;
}

// BUTTONS
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