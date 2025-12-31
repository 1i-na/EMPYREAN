"use strict";

const sectionFrames = document.querySelectorAll(".section_frames");
const frames = document.getElementById("frames");
const backBtn = document.getElementById("back_button");
const nextBtn = document.getElementById("next_button");

// SECTION FRAMES COLORS
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
const frameWrappers = document.querySelectorAll(".frame");
const total = frameWrappers.length;
const step = 360 / total;
const radius = 350;
const radiusX = 500;
const radiusY = 250;

let angle = 0;

// 3D FRAME POSITIONING
frameWrappers.forEach((wrapper, index) => {
    const radians = (index * step - 90) * (Math.PI / 180);
    const x = radiusX * Math.cos(radians);
    const z = radiusY * Math.sin(radians);

    wrapper.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(0deg)`;
});

// ACTIVE FRAME HANDLING
function updateActiveFrame() {
    // Build depth list (convert NodeList → Array)
    const depthList = Array.from(frameWrappers).map((wrapper, i) => {
        const radians = (i * step - 90 + angle) * (Math.PI / 180);
        const z = radiusY * Math.sin(radians);
        return { wrapper, z };
    });

    // Sort by Z depth (closest to camera first)
    depthList.sort((a, b) => b.z - a.z);

    // Reset all frames
    frameWrappers.forEach(wrapper => {
        wrapper.classList.remove("active", "near", "far");
        const img = wrapper.querySelector("img");
        img.src = img.dataset.monotone;
    });

    // ACTIVE (front-facing)
    const active = depthList[0];
    active.wrapper.classList.add("active");

    //monotone -> color on hover
    active.wrapper.addEventListener("mouseover", () => {
        active.wrapper.querySelector("img").src = active.wrapper.querySelector("img").dataset.color;
    });
    active.wrapper.addEventListener("mouseout", () => {
        active.wrapper.querySelector("img").src = active.wrapper.querySelector("img").dataset.monotone;
    });

    // NEAR (left & right)
    depthList.slice(1, 3).forEach(item => {
        item.wrapper.classList.add("near");
    });

    // FAR (everything else)
    depthList.slice(3).forEach(item => {
        item.wrapper.classList.add("far");
    });
}

updateActiveFrame();

// BUTTONS
backBtn.addEventListener("click", () => {
    angle -= step;
    updateFramePositions();
    updateActiveFrame();
});

nextBtn.addEventListener("click", () => {
    angle += step;
    updateFramePositions();
    updateActiveFrame();
});

// UPDATE FRAME POSITIONS
function updateFramePositions() {
    frameWrappers.forEach((wrapper, index) => {
        const radians = (index * step - 90 + angle) * (Math.PI / 180);
        const x = radiusX * Math.cos(radians);
        const z = radiusY * Math.sin(radians);
        
        wrapper.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(0deg)`;
    });
}