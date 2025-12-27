"use strict";

// sections color change
const scaleSection = document.getElementById("scale_frame");
const tailSection = document.getElementById("tail_frame");
const hornSection = document.getElementById("horn_frame");

scaleSection.addEventListener("mouseover", function() {
    scaleSection.src = "assets/sections/scale_color.png";
});

scaleSection.addEventListener("mouseout", function() {
    scaleSection.src = "assets/sections/scale_monotone.png";
});

tailSection.addEventListener("mouseover", function() {
    tailSection.src = "assets/sections/tail_color.png";
});

tailSection.addEventListener("mouseout", function() {
    tailSection.src = "assets/sections/tail_monotone.png";
});

hornSection.addEventListener("mouseover", function() {
    hornSection.src = "assets/sections/horn_color.png";
});

hornSection.addEventListener("mouseout", function() {
    hornSection.src = "assets/sections/horn_monotone.png";
});