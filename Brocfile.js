/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import("bower_components/jquery.cookie/jquery.cookie.js");
app.import("bower_components/timepicker/jquery.timepicker.js");
app.import("bower_components/lodash/dist/lodash.js");
app.import("bower_components/moment/moment.js");
app.import("bower_components/shapeshifter/shapeshifter.js");
app.import('bower_components/mixpanel/mixpanel.js');
app.import('bower_components/google-code-prettify/src/prettify.js');

app.import('bower_components/bootstrap/js/bootstrap-dropdown.js');
app.import('bower_components/bootstrap/js/bootstrap-modal.js');
app.import('bower_components/bootstrap/js/bootstrap-tooltip.js');
app.import('bower_components/bootstrap/js/bootstrap-popover.js');

app.import("bower_components/bootstrap-daterangepicker/daterangepicker.js");

app.import("vendor/ember-validations.prod.js");

module.exports = app.toTree();