# mongoScrape
News scrape using Mongoose and Cheerio

## About
This app scrapes news information from the popular music site Brooklyn Vegan.
It's pulls some information from their current headlines - the article title, the URL for the article, and an excerpt from the article. 

On top of scraping this app saves the information into a a database on the server side. 

You can then click on a scraped article and leave a comment, which is also saved to the database. 

Finally you should be able to also display any comments left on an article. 

In the future there are a few tweaks I'd like to make to this including the ability to delete comments and save and delete articles to a special section. I'd also like to spend some more time working with the style. 

## Technologies used
This app was created on Node using Express, Body-Parser, Mongoose, Cheerio, Request, and Express Handlebars. Data is being committed to a MongoDB database on the server side. 
