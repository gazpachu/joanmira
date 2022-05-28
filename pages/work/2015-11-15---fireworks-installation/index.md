---
title: "SapientNitro Fireworks installation"
cover: "images/logo.png"
location: UK
color: "#58B85F"
categories: sapientnitro prototype design kinect openni openframeworks creative-tech inverted open-source
template: project
---

<p class="align-center">
<a class="btn" role="button" href="https://github.com/gazpachu/fireworks" target="_blank">Source code</a>
</p>

<iframe width="100%" height="550" src="https://www.youtube.com/embed/pgPIYp36Miw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## A Kinect driven hand tracking experiment

The aim of this experiment is to showcase the hand tracking capabilities of an Xbox Kinect camera connected to a computer.  Using a simple vertical hand gesture recognition, the app is able to create multiple fireworks along the horizontal axis which get fired from the bottom of the screen.

To increase the dynamism of the experiment, the app uses random values for the fireworks colours, trail size, gravity, amount of particles, fading, damping, etc...

To maximise the audiovisual appeal, the app also features these techniques:

- 2D Skybox with a seamless background texture
- Parallax effect (some clouds moving faster than the sky)
- Base soundtrack playing in a loop and 7 different sound effects, including a crowd of people cheering after a rich round of continuous fireworks
- Dynamic blur effect using shaders for the hand calibration overlay

![](/work/fireworks-installation/images/fireworks-experiment.jpg)

## Tech used

This app has been coded in an Apple MacBook, using the Xcode IDE. The programming language used is C++ and the main library is OpenFrameworks, a set of open source tools widely used around the world for artistic installations and creative applications.

There are also a few OF add-ons worth mentioning:

- **ofxKinect**: an API/Interface to interact with Kinect from OF
- **ofxOpenNI**: a wrapper for OpenNI (for the hand tracking logic)
- **ofxBlur**: for the blur functionality

All the images and sounds have been obtained from free stock repositories.

This app can be adapted to any screen size and it works in both, landscape and portrait mode. It can also work in Windows and Linux, although a Mac (with a decent CPU) is preferred due to a higher support by the community.

Note: Kinect cameras cannot be connected to mobile devices or tablets, although their touch screen can be used as controllers for similar apps.

The demo was installed in Eden House’s exhibit area (SapientNitro's office) to allow visitors and employees to use it.

![](/work/fireworks-installation/images/1.jpg "Wall installation")
