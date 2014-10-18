// Switch to results view
//PD_vote8374733(1);

var voteCount = 0;

var voteUrl = "http://static.polldaddy.com/p/8374733.js";
var messageEl = _$("message");
var lastAttemptEl = _$("last-attempt");
var nextAttemptEl = _$("next-attempt");

function doVote() {
  // Switch to vote view
  PDV_go8374733();

  var POLL_ID = 8374733;

  var answerArr = window['PDV_A' + POLL_ID];
  var answer = "";
  for (var i = 0; i < answerArr.length; ++i) {
    if (answerArr[i][1] === 'Washington State') {
      answer = answerArr[1][0];
    }
  }

  if (answer == "") {
    messageEl.textContent = "Something broke :( Where's the WSU option?";
    lastAttemptEl = "";
    nextAttemptEl = "";
  } else {
    _$("PDI_answer" + answer).checked = true;
    var blob = {pageX: 100, pageY: 100};

    PD_prevote8374733(blob);
  }
}

var pd_callback = function(resultString) {
  var jsonR = JSON.parse(resultString);
  if (jsonR["result"] !== "load") {
    if (jsonR["result"] === "registered") {
      ++voteCount;
      var hour = 1 * 60 * 60 * 1000;
      timeOut(hour);
    } else {
      randomTimeOut();
    }

    messageEl.textContent = voteCount + " successful Coug votes made....Go Cougs!";
    lastAttemptEl.textContent = "Last attempt made at " + simplyTime(new Date(Date.now()));
  }
}

function timeOut(millis) {
  var date = new Date(Date.now() + millis)
  nextAttemptEl.textContent = "Next attempt at " + simplyTime(date);
                              ;
  setTimeout(doVote, millis);
}

// Throw em off our tails
function randomTimeOut() {
  var rand5to15 = Math.random() * 5 + 5;
  var millis = rand5to15 * 60 * 1000;
  timeOut(millis);
}

function simplyTime(date) {
  return date.toLocaleTimeString();
}
doVote();


