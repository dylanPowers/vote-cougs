// Switch to results view
//PD_vote8374733(1);

var voteCount = 0;

var voteUrl = "http://static.polldaddy.com/p/8374733.js";

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
    _$("message").textContent = "Something broke :( Where's the WSU option?";
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

    _$("message").textContent = voteCount + " successful votes made";
    _$("last-attempt").textContent = "Last attempt made at " + new Date(Date.now());
  }
}

function timeOut(millis) {
  setTimeout(doVote, millis);
}

// Throw em off our tails
function randomTimeOut() {
  var rand5to15 = Math.random() * 10 + 5;
  var millis = rand5to15 * 60 * 1000;
  timeOut(millis);
}

doVote();


