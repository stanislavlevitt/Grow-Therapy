**Project for Grow Therapy**
<br/>

## Starting Locally

**From the terminal run:**

<pre>
git clone the repository
npm install
npm run start
</pre>

**After npm start**<br />
The App will start running in development mode.<br />
Open [http://localhost:8080/](http://localhost:8080/)<br />

## App Walk through

---
## View Most Popular Articles For a Month<br />
<p align="center"><strong>In order to view the most popular articles for a month. Visit your localhost and enter the url "http://localhost:8080/api/wiki/monthly/article-view/{year}/{month}"
</strong></p>

Example : [http://localhost:8080/api/wiki/monthly/article-view/2016/5](http://localhost:8080/api/wiki/monthly/article-view/2016/5)<br />

## View Most Popular Articles For a Week<br />
<p align="center"><strong>In order to view the most popular articles for a week. Visit your localhost and enter the url "http://localhost:8080/api/wiki/weekly/article-view/{year}/{month}/{week}"
</strong></p>

Example : [http://localhost:8080/api/wiki/weekly/article-view/2016/5/4](http://localhost:8080/api/wiki/weekly/article-view/2016/5/4)<br />

## Get View Count of Given Article For a Week<br />
<p align="center"><strong>In order to view the total view count for a given article on a given week. Visit your localhost and enter the url "http://localhost:8080/api/wiki/monthly/article-views/{article}/{year}/{month}/{week}"</strong></p>

Example : [http://localhost:8080/api/wiki/weekly/article-views/Albert_Einstein/2016/4/3](http://localhost:8080/api/wiki/weekly/article-views/Albert_Einstein/2016/4/3)<br />

## Get View Count of Given Article For a Month<br />
<p align="center"><strong>In order to view the total view count for a given article on a given month. Visit your localhost and enter the url "http://localhost:8080/api/wiki/monthly/article-views/{article}/{year}/{month}"</strong></p>

Example : [http://localhost:8080/api/wiki/monthly/article-views/Albert_Einstein/2016/3](http://localhost:8080/api/wiki/monthly/article-views/Albert_Einstein/2016/3)<br />


## Get Day of Month With Highest Views For an Article<br />
<p align="center"><strong>In order to view the day of the month with the highest views for a given article. Visit your localhost and enter the url "http://localhost:8080/api/wiki/monthly/best-view/{article}/{year}/{month}"</strong></p>

Example : [http://localhost:8080/api/wiki/monthly/best-view/Albert_Einstein/2016/04](http://localhost:8080/api/wiki/monthly/best-view/Albert_Einstein/2016/04)<br />
