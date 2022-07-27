---
title: rtShapes demo
cover: /work/rtshapes/images/logo.jpg
location: UK
color: white
categories: wcrs open-source web installation prototype ux design cover webcam
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="http://open.joanmira.com/rtshapes" target="_blank">Launch website</a>
<a class="btn github" role="button" href="https://github.com/gazpachu/rtshapes" target="_blank">Source code</a>
</p>

![](/work/rtshapes/images/1.png)

This is the first demo of my series of experiments with real-time shape recognition using HTML5 [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), [OpenCV](http://docs.opencv.org/3.1.0/d9/d6d/tutorial_table_of_content_aruco.html#gsc.tab=0) and [Box2D](https://github.com/hecht-software/box2dweb).

While I was working as a creative technologist at [WCRS](http://www.wcrs.com/), I started to play with Box2d a lot. I was also experimenting with Kinect and [OpenFrameworks](http://openframeworks.cc/) to recognize shapes/blobs in real-time, which led me to build some demos mixing both technologies.

In this HTML5 demo, I'm using a webcam to get a live video stream of some shapes drawn on a paper sheet. This video is analyzed with JavaScript (using OpenCV) to identify the shapes. Once we have the 2D coordinates of those shapes, I use Box2d to create their representation in the Box2d world.

In the following images, you can see how the lines are drawn on the paper become static platforms that contain the other boxes falling from the top of the screen.

![](/work/rtshapes/images/2.jpg)

![](/work/rtshapes/images/3.jpg)
