---
title: "WCRS DJ Wannabe installation"
cover: "images/logo.png"
location: UK
color: "#714762"
categories: wcrs prototype design kinect openni openframeworks creative-tech inverted open-source
template: project
---

<p class="align-center">
<a class="btn github" role="button" href="https://github.com/gazpachu/dj-wannabe" target="_blank">Source code</a>
</p>

![](/work/dj-wannabe/images/turn-tables.jpg)

## The idea

The objective was to be able to:

- play two music tracks at the same time
- control the playing speed of each track using the hands or the speed controls in the turntable
- scratch the virtual vinyls using only the hands in the air

To achieve this, I made a Kinect and OpenFrameworks driven turntable music experiment. The hand tracking was coded using the OpenNI library. It could track both hands and detect the up and down movement to trigger the scratching mode or the circular movement on top of the vinyls to increase or decrease the playing speed.
