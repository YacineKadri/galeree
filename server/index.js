const Express = require("express");
const app = Express();
const cors = require("cors");
const router = require("./router");
const port = 4000;
const ADOBE_API_URL = 'https://image.adobe.io/pie/psdService/photoshopActions';

app.use(cors("*"));
app.use(Express.json());
app.use(Express.urlencoded({
  extended: true
}))

app.post('/api/adobe', async (req, res) => {
  try {
    const response = await fetch(ADOBE_API_URL, {
      headers: {
        "Authorization": 'Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2Nzc3OTU1MzM2MDdfOGJlM2JiZGQtOGY3NS00NzViLTk0MGYtZDdjNGExMGQxMzJlX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZWU5OWZjN2YwYTM0MDM4YmIxZTI2ZDY2YTI5MDQzOSIsInVzZXJfaWQiOiI0RkVBMjUxRDYzRjdDMjg1MEE0OTVDODFAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiI0RkVBMjUxRDYzRjdDMjg1MEE0OTVDODFAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJmZyI6IlhIWEZWTUpXRlBGNVlQNEtHTVFWWkhRQVJVPT09PT09IiwibW9pIjoiYmEwYTZmYiIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsImNyZWF0ZWRfYXQiOiIxNjc3Nzk1NTMzNjA3Iiwic2NvcGUiOiJvcGVuaWQsQWRvYmVJRCxyZWFkX29yZ2FuaXphdGlvbnMifQ.PUiX1QEy56IfkYgSWgF6ZpIFzHpDjOzWQNs1-xqYnnUOAFqPG4RywR5tJa5u54TXKFgI42NUa1iB87rqPXAFV7cPSawkWLiAgwTP7hIprLx6eewBHTPz9jXSybjjOgb5EG7luDw9rSfob2BlrOkPBsz7HKjLRK-SetC4TTgAu1yZt25KWws2YDFhx8bQ1k9Ucm7BV4Vi3wcrKnOr8ZA7HecKwQk7f5UGCWVSCQmaPriUm6iqitFeEaKPJeKAJc-qlWhr0DEk9DVSVgm3eFkJrIN6pF0SpD0e_gBZ-xZD_phbGOv8ScBEZ7DGnVqe74g0QsagSR-W0xQgN1vL4rAA5Q',
        'x-api-key': 'dee99fc7f0a34038bb1e26d66a290439',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Adobe API');
  }
});





app.use(router);
app.listen(port, () => console.log(`Server is running on port ${port}`));