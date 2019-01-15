# Tree Stocks
#### A MERN Stack website for viewing financial news and stock prices from the cannabis industry

Data provided for free by IEX. [View IEX’s Terms of Use](https://iextrading.com/api-exhibit-a/)

## API

The API for this app was built using Node.js and Express.js.
Data is handled using MongoDB and Mongoose.
Stock data and news stories are provided by the [IEX Trading API](https://iextrading.com/developer/docs/)

#### Routes

Routes are divided into three groups: User routes, Stock routes and Secure routes. Only secure routes require authentication, which is implemented using Passport.js and JWT. User routes enable the creation of new users and logins and logouts. Stock routes provide stock prices, news and charts. Secure routes allow the creation and modification of user stock watchlists.

#### User Authentication

User authentication is handled by Passport using the local and JWT strategies.

## Client

The client for this app was built using React and Gatsby. Plots are rendered using Plot.ly's [React library](https://plot.ly/javascript/react/) and data from IEX.

Page routing is handled by Gatsby. JS files in the src/pages folder are all accessible as routes.