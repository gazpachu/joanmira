---
title: "ICA Art Rules case study"
cover: "images/logo.jpg"
location: UK
color: black
categories: sapientnitro animation shortlisted web-app ruby box2d inverted creative-tech
template: project
---

<p class="align-center">
<a class="btn" role="button" href="http://work.joanmira.com/demos/artrules/" target="_blank" rel="noopener noreferrer">Check animation prototypes</a>
</p>

The [ICA, Institute of Contemporary Art](https://www.ica.org.uk/), has been in the forefront for arts for decades. It was finding difficulties keeping up with today’s social media age and needed to be part of the online art conversation. We ([SapientNitro](http://www.sapientnitro.com/), London) built a platform to encourage people to challenge what art really means.

![](/work/artrules/images/12.png)

My role in this project was mainly in the rendering and animations of the art rules. Tech used includes: Ruby on Rails (RoR), HAML, Heroku, Github, SASS, CSS3 animations and Javascript Box2d 2D physics.

The major challenge in this project was to achieve fast animations on tablet devices. The performance on desktops and laptops was fine. I had to explore different ways of rendering the circles with the physics, mostly with canvas or DOM elements and CSS3.

At the end, due to the full screen nature of the animations, I decided to use DOM elements and apply realtime CSS3 transformations (hardware accelerated) to animate the circles. I used Box2d to calculate the physics for the attraction forces, collisions and pushing the colliding circles around when resizing one of them.

The mouse wheel and the swipe events in touch devices, were used as circle generators. The user could scroll left and right to move all the circles and generate new ones. As soon as the circles were out of the screen, they died and a new one were created on the other side of the screen. So, in a way, it was sort of generative art :-)

I really enjoyed working on this project, as I love arts and creative stuff and it was also quite challenging (because Box2d with DOM elements was unexplored terrotory for me and the rest of the team). It was also my first project in SapientNitro, so it really helped me to create a good reputation around me.

Featured on:

- [SapientNitro](http://www.sapient.co.in/en-us/news/press-releases/year2013/sapientnitro-creates-innovative-social-media-campaign-for-the-institute-of-contemporary-arts.html)
- [CampaignLive](https://www.campaignlive.co.uk/article/institute-contemporary-arts-art-rules-sapientnitro/1208923)
- [DesignWeek](https://www.designweek.co.uk/issues/july-2013/sapient-nitro-creates-art-rules-social-network-for-ica/)
- [TheGuardian](https://www.theguardian.com/commentisfree/2013/aug/29/ica-art-rules-crowdsourced)
- [TheGuardian](https://www.theguardian.com/culture/2013/jul/31/art-rules-ica-twitter-online-debate)
- [LATimes](https://www.latimes.com/entertainment/arts/culture/la-et-cm-ica-art-rules-20130801-story.html)
- [ArtReview](https://artreview.com/news/ica_art_rules/)
- [Artsy](https://www.artsy.net/article/glenn-michael-ebert-who-makes-the-rules-of-art-number-whatisart)


![](/work/artrules/images/wall-installation.jpg "Installation of the project on a wall in SapientNitro's office")

![](/work/artrules/images/1.jpg)

![](/work/artrules/images/3.jpg)

![](/work/artrules/images/4.jpg)

![](/work/artrules/images/2.jpg)

![](/work/artrules/images/5.jpg)

![](/work/artrules/images/6.jpg)

![](/work/artrules/images/7.jpg)

![](/work/artrules/images/8.jpg)

![](/work/artrules/images/9.jpg)

![](/work/artrules/images/10.jpg)

![](/work/artrules/images/11.jpg "Projection of the project over the facade of Tate Modern in London")
