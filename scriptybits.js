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

  // Reset cookies
  PD_ck8374733 = 0;
  docCookies.removeAll();

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

// Source: developer.mozilla.org/en-US/docs/Web/API/document.cookie
var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  removeAll: function() {
    var outSide = this;
    this.keys().forEach(function(item) {
      outSide.removeItem(item, '/');
    });
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

doVote();


