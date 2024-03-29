const express = require('express')
const app = express()
const _ = require('underscore')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 9001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Check to see if we have the settings we need.
var settings = [ 'TAKESHAPE_PROJECTID', 'TAKESHAPE_KEY', 'ALGOLIA_APPID', 'ALGOLIA_ADMIN_KEY' ]
var hasSettings = true;
_.each(settings, setting => {
	if (!process.env[setting]) {
		console.log('Missing Settings', setting);
		hasSettings = false;
	}
})

// If we have a missing value, then stop the server.
if (!hasSettings) return process.exit(22);

// Setup the routes.
app.post('/webhookDrinks', require('./routes/webhookDrinks'))
app.post('/webhookMixed', require('./routes/webhookMixed'))

app.get('/rebuildDrinks', require('./routes/rebuildDrinks'))
app.get('/rebuildMixed', require('./routes/rebuildMixed'))

app.listen(PORT);

console.log('')
console.log('Starting Chug')
console.log(`Listening on port ${PORT}...`);
