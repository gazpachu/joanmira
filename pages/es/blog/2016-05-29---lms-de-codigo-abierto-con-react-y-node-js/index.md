---
title: LMS de código abierto con React y Node.js
description: Una nueva luz en el mundo de los sistemas de gestión del aprendizaje de código abierto con mi punto de vista
cover: /blog/open-source-lms-with-react-and-node-js/images/online-learning.jpg
template: post
category: work
---

**ACTUALIZACIÓN 08/2016**: Por favor, consulta [esta página](https://joanmira.com/hypatia) para conocer las últimas noticias sobre el proyecto. ¡Gracias!

Si todo va como se espera, el próximo semestre comenzaré mi proyecto final de carrera universitaria. Decidí aprovechar esa "obligación" para hacer algo útil para la comunidad y al mismo tiempo mejorar mis habilidades en React y Node.js. Así fue como llegué a la idea de construir un **Sistema de Gestión de Aprendizaje de Código Abierto**.

Otra razón por la que elegí construir un LMS es que sigo viendo cómo se podrían hacer mejor las cosas en el campus virtual de mi universidad. Particularmente **tengo muchas cosas que decir con respecto a la forma en que los estudiantes interactúan entre sí y con el profesor**. El sistema actual no proporciona una comunicación ágil. Se siente lento, con ventanas emergentes, abarrotado de firmas y otros datos no relevantes. Quiero construir una plataforma que tome lo mejor de otros productos de éxito (que uso en mi trabajo), como [Slack](https://slack.com/) o [Trello](https://trello.com/) y los adapte para entornos educativos.

En los últimos días, he estado buscando en la web y en los [repositorios de GitHub para proyectos de JS LMS](https://github.com/search?l=JavaScript&o=desc&q=LMS&s=stars&type=Repositories&utf8=%E2%9C%93), tratando de ver si hay algo así ya en marcha, pero **no he encontrado ninguno** con una presencia fuerte (lo cual es una buena noticia). No estoy seguro de si empezaría el proyecto si alguien ya lo ha hecho. De todos modos, ¡quizás si lo haría!

Por supuesto, hay otros LMS con APIs y stacks modernos, como [Canvas LMS](https://www.canvaslms.com/try-canvas) o [Blackboard](http://www.blackboard.com/learning-management-system/blackboard-learn.aspx) (41% de la cuota de mercado), [D2L](http://www.d2l.com/), [Kaanu](https://www.kannu.com/), pero no están usando el mismo stack que yo quiero usar y no se dirigen a los desarrolladores. Al mismo tiempo, creo que tener más opciones de código abierto sería mejor para todos.

Sé que suena como un compromiso muy fuerte para una sola persona y un enorme proyecto paralelo (ya que todavía estoy trabajando a tiempo completo), pero esto va a ser como un patio de recreo para mí, donde puedo aprender sobre la tecnología que me gusta y al mismo tiempo producir algo útil.

Estos son algunos de los requisitos en los que ya he pensado:

- El objetivo final es ofrecer algo a la comunidad que se sienta como **el WordPress de los LMS**. Algo lo suficientemente flexible como para adaptarse a la mayoría de las necesidades siendo muy abierto y fácil de extender / escalar

- Hasta ahora, quiero utilizar una tecnología similar a la utilizada en el proyecto [WordPress Calypso](https://developer.wordpress.com/calypso/). El cada vez más popular [React](https://facebook.github.io/react/) y [React Native](https://facebook.github.io/react-native/), [Flux](https://facebook.github.io/flux/), [Babel.js](https://babeljs.io/) para ES6, [Webpack](https://webpack.github.io/) como bundler, [Node.js](https://nodejs.org/en/) como plataforma backend y quizás [Loopback](https://loopback.io/) para construir la API

- La UX y el **diseño responsivo** tienen que ser perfectos. Este es un requisito muy importante, ya que no quiero crear algo que se parezca a [Moodle](https://moodle.org/) (23% de la cuota de mercado), que tiene una interfaz de usuario muy antigua.

- La página de inicio mostrará una lista de cursos disponibles, de la misma manera que lo hace [Udemy](https://www.udemy.com/)

- Tiene que ser **en tiempo real**, con una comunicación ágil como [Slack](https://slack.com/). No más foros, correos electrónicos u otros sistemas lentos y desordenados para hablar entre los estudiantes y profesores

- Quiero incluir **cuestiones**, algo similar a lo que hice con [Quizwars](http://quizwars.herokuapp.com/) y probablemente inspirarme en [QuizUp](https://www.quizup.com/)

- Necesita **integrarse fácilmente** con [Google Docs](https://www.google.com/docs/about/), [Trello](https://trello.com/), [Dropbox](https://www.dropbox.com) y otras herramientas externas. ¡Quiero usar Internet como un CMS!

- Tiene que tener una **API REST abierta**, para que los usuarios puedan crear sus front-ends

- Tiene que ser **social** e implementar **análisis de aprendizaje**

- Tiene que tener un **nombre atractivo** con un dominio gratuito .com y .org (esto va a ser difícil)