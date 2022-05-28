---
title: "Bunjin RSS Reader"
cover: "images/logo.png"
location: Japan
color: "#F9D9EB"
categories: react firebase rss open-source web-app
template: project
---

<p class="align-center">
<a class="btn" role="button" href="https://bunjinapp.web.app/" target="_blank">Live App</a>
<a class="btn" role="button" href="https://github.com/gazpachu/bunjin" target="_blank">Github repository</a>
</p>

![](/work/bunjin/images/1.png)

The term "Bunjin" refers to a type of people in traditional society in China and 'an educated person who is good at literature.' [More info](https://www.japanese-wiki-corpus.org/history/Bunjin%20(Literati%20in%20China).html).

I created Bunjin because I wanted to have a proper dark theme and a very custom experience for my own RSS reading experience. You can say I'm very picky with UIs, especially if I have to use them every day...

Long time ago, I was very fond of [iGoogle](https://en.wikipedia.org/wiki/IGoogle), but when they decided to close it, I moved to [Netvibes](https://www.netvibes.com/en). For some time, I was happy, but I didn't really like the looks of the app. So one day, I decided to build my own RSS reader, and that's how Bunjin came to life.

The app is open source and anyone can use it, so feel fere to register your account and play around. The UI is not very polished yet (it only has the basics to make me feel good using it) and there are not many features. You can create infinite dashboards, tabs add feeds (widgets), which can be arranged in your preferred order and select the amount of stories to display on each widget.

The app uses a proxy to bypass the CORS issues with some feeds and it caches the content on a Firebase DB to minimize the external requests (some websites have a limit).
