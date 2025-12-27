"use strict";

// sections color change
const scaleSection = document.getElementById("scale_frame");
scaleSection.addEventListener("mouseover", function() {
    scaleSection.src = "assets/sections/scale_color.png";
});
scaleSection.addEventListener("mouseout", function() {
    scaleSection.src = "assets/sections/scale_monotone.png";
});


const tailSection = document.getElementById("tail_frame");
tailSection.addEventListener("mouseover", function() {
    tailSection.src = "assets/sections/tail_color.png";
});
tailSection.addEventListener("mouseout", function() {
    tailSection.src = "assets/sections/tail_monotone.png";
});


const hornSection = document.getElementById("horn_frame");
hornSection.addEventListener("mouseover", function() {
    hornSection.src = "assets/sections/horn_color.png";
});
hornSection.addEventListener("mouseout", function() {
    hornSection.src = "assets/sections/horn_monotone.png";
});


const flameSection = document.getElementById("flame_frame");
flameSection.addEventListener("mouseover", function() {
    flameSection.src = "assets/sections/flame_color.png";
});
flameSection.addEventListener("mouseout", function() {
    flameSection.src = "assets/sections/flame_monotone.png";
});


const fangSection = document.getElementById("fang_frame");
fangSection.addEventListener("mouseover", function() {
    fangSection.src = "assets/sections/fang_color.png";
});
fangSection.addEventListener("mouseout", function() {
    fangSection.src = "assets/sections/fang_monotone.png";
});


const clawSection = document.getElementById("claw_frame");
clawSection.addEventListener("mouseover", function() {
    clawSection.src = "assets/sections/claw_color.png";
});
clawSection.addEventListener("mouseout", function() {
    clawSection.src = "assets/sections/claw_monotone.png";
});