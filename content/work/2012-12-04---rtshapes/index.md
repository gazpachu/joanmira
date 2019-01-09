---
title: "rtShapes demo"
cover: "images/logo.jpg"
location: UK
---

<p class="work-links">
<a class="btn icon icon-external" href="http://open.joanmira.com/rtshapes" target="_blank">Launch website</a>
<a class="btn icon icon-external" href="https://github.com/gazpachu/rtshapes" target="_blank">Source code</a>
</p>

![](./images/1.jpg)

UPDATE: Unfortunately, getUserMedia() no longer works without HTTPS, so the demo is not working. I will fix it whenever is posible. Thanks.

This is the first demo of my series of experiments with real time shape recognition using HTML5 [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), [OpenCV](http://docs.opencv.org/3.1.0/d9/d6d/tutorial_table_of_content_aruco.html#gsc.tab=0) and [Box2D](https://github.com/hecht-software/box2dweb).

While I was working as a creative technologist at [WCRS](http://www.wcrs.com/), I started to play with Box2d a lot. I was also experimenting with Kinect and [OpenFrameworks](http://openframeworks.cc/) to recognise shapes/blobs in real time, which led me to build some demos mixing both technologies.

In this HTML5 demo, I'm using a webcam to get a live video stream of some shapes drawn in a paper sheet. These video is analysed with JavaScript (using OpenCV) to identify the shapes. Once we have the 2D coordinates of those shapes, I use Box2d to create their representation in the Box2d world.

In the following images, you can see how the lines drawn in the paper become static platforms that contain the other boxes falling from the top of the screen.

![](./images/2.jpg)

![](./images/3.jpg)
