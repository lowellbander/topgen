/**
 * 
 * Created by lowellbander on 5/21/16.
 */

var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '.')));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
