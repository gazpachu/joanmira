---
title: "ICA Las reglas del arte"
cover: "images/logo.jpg"
location: Reino Unido
color: black
categories: sapientnitro animation shortlisted web-app ruby box2d inverted creative-tech
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="http://work.joanmira.com/demos/artrules/" target="_blank" rel="noopener noreferrer">Ver los prototipos</a>
</p>

El [ICA, Instituto de Arte Contemporáneo](https://www.ica.org.uk/), ha estado a la vanguardia del arte durante décadas. Tenía dificultades para seguir el ritmo de la era de las redes sociales y necesitaba formar parte de la conversación artística online. Nosotros ([SapientNitro](http://www.sapientnitro.com/), Londres) construimos una plataforma para animar a la gente a cuestionar lo que significa el arte.

![](/trabajo/artrules/images/12.png)

Mi papel en este proyecto consistió principalmente en el renderizado y las animaciones de las reglas del arte. La tecnología utilizada incluye: Ruby on Rails (RoR), HAML, Heroku, Github, SASS, animaciones CSS3 y física 2D Javascript Box2d.

El mayor reto de este proyecto fue conseguir animaciones rápidas en dispositivos tipo tablet. El rendimiento en ordenadores de sobremesa y portátiles estaba bien. Tuve que explorar diferentes formas de renderizar los círculos con la física, principalmente con elementos canvas o DOM y CSS3.

Al final, debido a la naturaleza de pantalla completa de las animaciones, decidí utilizar elementos DOM y aplicar transformaciones CSS3 en tiempo real (aceleradas por hardware) para animar los círculos. Utilicé Box2d para calcular la física de las fuerzas de atracción, las colisiones y el empuje de los círculos en colisión al cambiar el tamaño de uno de ellos.

La rueda del ratón y los eventos de deslizamiento en los dispositivos táctiles se utilizaron como generadores de círculos. El usuario podía desplazarse a izquierda y derecha para mover todos los círculos y generar otros nuevos. En cuanto los círculos salían de la pantalla, morían y se creaba uno nuevo en el otro lado de la pantalla. Así que, en cierto modo, era una especie de arte generativo :-)
Disfruté mucho trabajando en este proyecto, ya que me encanta el arte y los temas creativos, y también fue todo un reto (porque Box2d con elementos DOM era un territorio inexplorado para mí y para el resto del equipo). También fue mi primer proyecto en SapientNitro, así que me ayudó a crear una buena reputación a mi alrededor.

Destacado en:

- [SapientNitro](http://www.sapient.co.in/en-us/news/press-releases/year2013/sapientnitro-creates-innovative-social-media-campaign-for-the-institute-of-contemporary-arts.html)
- [CampaignLive](https://www.campaignlive.co.uk/article/institute-contemporary-arts-art-rules-sapientnitro/1208923)
- [DesignWeek](https://www.designweek.co.uk/issues/july-2013/sapient-nitro-creates-art-rules-social-network-for-ica/)
- [TheGuardian](https://www.theguardian.com/commentisfree/2013/aug/29/ica-art-rules-crowdsourced)
- [TheGuardian](https://www.theguardian.com/culture/2013/jul/31/art-rules-ica-twitter-online-debate)
- [LATimes](https://www.latimes.com/entertainment/arts/culture/la-et-cm-ica-art-rules-20130801-story.html)
- [ArtReview](https://artreview.com/news/ica_art_rules/)
- [Artsy](https://www.artsy.net/article/glenn-michael-ebert-who-makes-the-rules-of-art-number-whatisart)


![](/work/artrules/images/wall-installation.jpg "Instalación del proyecto en la oficina de SapientNitro")

![](/work/artrules/images/1.png)

![](/work/artrules/images/3.jpg)

![](/work/artrules/images/4.jpg)

![](/work/artrules/images/2.jpg)

![](/work/artrules/images/5.jpg)

![](/work/artrules/images/6.jpg)

![](/work/artrules/images/7.jpg)

![](/work/artrules/images/8.jpg)

![](/work/artrules/images/9.jpg)

![](/work/artrules/images/10.jpg)

![](/work/artrules/images/11.jpg "Proyección en la fachada del museo Tate Modern en Londres")
