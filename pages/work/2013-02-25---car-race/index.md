---
title: Draw a car race
cover: /work/car-race/images/logo.png
location: UK
color: "#2BCFFA"
categories: wcrs prototype kinect opencv box2d openframeworks animation design creative-tech inverted open-source
template: project
---

<p class="align-center">
<a class="btn github" role="button" href="https://github.com/gazpachu/opencv-box2d-race" target="_blank">Car race source code</a>
<a class="btn github" role="button" href="https://github.com/gazpachu/opencv-box2d-platformer" target="_blank">Platformer source code</a>
</p>

This project was so cool. It was about loading a track and the obstacles from a real drawing and then playing a car race on that track on the computer!

To capture the shapes from the paper, I used a webcam and the OpenCV library. These shapes were then transformed into Box2d bodies and added to the physics world in the app.

The cars and the rest of the logic were all C++ and OpenFrameworks. All the captured shapes were static bodies that the cars could collide with. There was a marker also to define the start/end point.

![](/work/car-race/images/1.jpg)

![](/work/car-race/images/3.jpg)

Later on, I also started to play with the idea of using characters rather than cars and platforms rather than a track. The idea was that the user would draw the platforms and the characters on paper and the app would load all this information into the game.

![](/work/car-race/images/2.jpg)
