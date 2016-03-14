// Userscript for Fluid App to enable dock badge and desktop notifications for Fastmail.
//
// Author: @lylo
// https://gist.github.com/lylo/7786717

window.fluid.dockBadge = '';

// for tracking when to notify
var previousUnreadCount = 0;

// Main polling
var readyStateCheckInterval = setInterval(function() {
  if(document.readyState === "complete") {
    setInterval(updateDockBadge, 1000);
    clearInterval(readyStateCheckInterval);
  }
}, 100);


function updateDockBadge() {
  var currentUnreadCount = 0;

  var tree = document.getElementsByClassName("v-FolderTree")[0];
  for(i = 0; i < tree.childNodes.length; ++i) {
    name = tree.childNodes[i].getElementsByClassName("v-FolderSource-name")[0].innerText;
    badge = tree.childNodes[i].getElementsByClassName("v-FolderSource-badge")[0].innerText;

    // if you only want to report on the Inbox, change the following line to
    // if (badge && name && name == "Inbox")
    if (badge && name && name == "Inbox") {
      if(parseInt(badge) > 0) {
        currentUnreadCount += parseInt(badge);
      }
    }
  }

  if(currentUnreadCount == 0) {
    window.fluid.dockBadge = '';
    previousUnreadCount = 0;
  } else {
    // update dock with new count
    window.fluid.dockBadge = currentUnreadCount;

    // determine how many new mails there are and notify
    var unreadMailCount = currentUnreadCount - previousUnreadCount;
    if(unreadMailCount > 0) {
      notify(unreadMailCount);

      previousUnreadCount = currentUnreadCount;
    }
  }
}


// Creates a Notification Center message, if supported
function notify(count) {
  var supportsWebkitNotifications = ('webkitNotifications' in window);

  if(count > 0 && supportsWebkitNotifications) {
    if(webkitNotifications.checkPermission() == 0) {
      body = (count == 1) ? '1 new message' : count + ' new messages';

      webkitNotifications.createNotification(
        null,
        'You got mail',
        body
      ).show();
    }
  }
}
