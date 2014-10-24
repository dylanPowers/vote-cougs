var page = require('webpage').create();
var fs = require('fs');

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};

page.open('http://localhost:8000/index.html', function(status) {
  console.log('Status: ' + status);  
  var fan = phantom;
  page.evaluate(function() {    
    
  });
  // Do other things here...
  // phantom.exit();
});
