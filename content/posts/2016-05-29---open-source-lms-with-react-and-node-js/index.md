---
title: "Open Source LMS with React and Node.js"
cover: images/online-learning.jpg
category: work
---

**UPDATE 08/2016**: The project has been renamed from **Hypatia** to **Nekomy** and [this is the temporal website](https://nekomy.com) and [Github repository](https://github.com/nekomy/nekomy-platform). Please refer to that site for the latest news regarding the project. Thanks!

If everything goes as expected, next semester I will start my final project for my university degree. I decided to take advantage of that "obligation" to make something useful for the community and at the same time improve my React and Node.js skills. That's how I arrived to the idea of building an **Open Source Learning Management System**.

Another reason why I chose to build an LMS is because I keep seeing how things could be done better in my university's virtual campus. I particularly **have a lot of things to say regarding the way students interact with each other and with the teacher**. The current system does not provide an agile communication. It feels slow, with popup windows, cluttered with signatures and other non-relevant data. I want to build a platform that takes the best out of other successful products (that I use in my work), like [Slack](https://slack.com/) or [Trello](https://trello.com/) and adapt them for educational environments.

In the last days, I've been searching the web and the [GitHub repositories for JS LMS projects](https://github.com/search?l=JavaScript&o=desc&q=LMS&s=stars&type=Repositories&utf8=%E2%9C%93), trying to see if there's anything like that already going on, but **I haven't found any** with a strong presence (which is good news). I'm not sure if I would start the project if somebody else already did. Maybe I would anyway! :)

Of course there are other LMS with APIs and modern stacks, like [Canvas LMS](https://www.canvaslms.com/try-canvas) or [Blackboard](http://www.blackboard.com/learning-management-system/blackboard-learn.aspx) (41% of market share), [D2L](http://www.d2l.com/), [Kaanu](https://www.kannu.com/), but they are not using the same stack I want to use and they are not targeting developers. At the same time, I feel that having more open source options out there would be better for everyone.

I know it sounds like a very strong commitment for just one person and a humongous side-project (as I'm still working full-time), but this is going to be like a playground for me, where I can learn about the tech I like and at the same time produce something useful.

Here are some of the requirements I already thought about:

- The final goal is to offer something to the community that feels as **the Wordpress of the LMS**. Something that is flexible enough to suit the majority of needs by being very opened and easy to extend / scale

- So far, I want to use a similar **tech stack** to the one used in project [Wordpress Calypso](https://developer.wordpress.com/calypso/). The increasingly popular [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/),  [Flux](https://facebook.github.io/flux/), [Babel.js](https://babeljs.io/) for ES6, [Webpack](https://webpack.github.io/) as the bundler, [Node.js](https://nodejs.org/en/) as the backend platform and perhaps [Loopback](https://loopback.io/) for building the API

- The UX and **responsive plain design** have to be spot-on. This is a very important requirement, as I don't want to create something that feels like [Moodle](https://moodle.org/) (23% of market share), which has a very old-school UI

- The homepage will display a list of available courses, the same way [Udemy](https://www.udemy.com/) does it

- It needs to be **real time**, with agile communication like [Slack](https://slack.com/). No more forums, emails or other slow and cluttered systems to talk to each other

- I want to include **quizzes**, something similar to what I did with [Quizwars](http://quizwars.herokuapp.com/) and probably get some inspiration from [QuizUp](https://www.quizup.com/)

- It needs to **integrate easily** with [Google Docs](https://www.google.com/docs/about/), [Trello](https://trello.com/), [Dropbox](https://www.dropbox.com) and other external tools. I want to use the Internet as a CMS!

- It needs to have an **open REST API**, so users could create their own front-ends

- It has to be **social** and implement **learning analytics**

- It needs to have a **catchy name** with a free .com and .org domain (this is going to be hard)
