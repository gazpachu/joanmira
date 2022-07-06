---
title: "Lighthouse"
cover: "images/logo.png"
location: UK
color: "#122d59"
categories: vodafone react redux webpack web-app highcharts ux inverted
template: project
---

<style>
.loader {
  border-radius: 100px;
}
</style>

![](/work/lighthouse/images/1.png)

Lighthouse is a centralised visualisation app to help users navigate a complex sea of data, guiding them towards actionable insights.

The way it works is very simple. There's a navigation menu with categories (we call them topics) and each one of them has subcategories with insights. Each insight consists of a question and an answer, represented with a chart and a table with data. The insights can be saved as favourites, sent to a friend or even downloaded as a CSV file. Users can also search for insights, check the log of changes for each insight and more important than anything else, apply filters to the insights.

The filtering functionality is what makes Lighthouse so powerful, as it allows users to truly find the data they need on each insight. There are default filters on each insight and also users can lock or unlock filters.

This was my second big app while working at Vodafone. To build it, I created a new react boilerplate from scratch and also used redux to manage the app global state. I've also implemented a system to send the JSON API responses from the API endpoints directly to redux. The app is fully responsive and compatible with all browsers except Internet Explorer.

In this project, I was in charge of a big part of the front-end build. The only components I was not responsible of were the tables and charts.

The app became very popular within the Vodafone Sales department and until now, it's the most successful app we have developed in my team.

![](/work/lighthouse/images/2.jpg "Home page")

![](/work/lighthouse/images/3.jpg "Insight page with dummy data")

![](/work/lighthouse/images/4.jpg "Navigation")

![](/work/lighthouse/images/5.jpg "Filters")

![](/work/lighthouse/images/6.jpg "Search and logs")

<p style="text-align: center">
  <img class="loader" src="/work/lighthouse/images/loader.gif" alt="laoder" />
</p>
