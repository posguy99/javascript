// use for patterns:
// https://login.microsoftonline.com/*
// https://outlook.office365.com/*

// desktop badge count for https://outlook.office365.com/

(function () {
    var logging = false;

    function log () {
        return logging && console.log.apply(console, ['badge:'].concat(Array.prototype.slice.apply(arguments)));
    }

    function getBadge() {
        return window.fluid.dockBadge;
    }

    function setBadge(val) {
        window.fluid.dockBadge = val;
    }

    function setOrRemoveBadge(val) {
        if (!val) {
            val = undefined;
        }

        return setBadge(val);
    }

    function extractCountFromUnreadText(text, fallback) {
        var res = text.match(/\s*\d+\s*/);

        if (res && res.length > 0) {
            return parseInt(res[0].trim(), 10);
        }

        return fallback;
    }

    function check() {
        log('checking...')

        var loginPanel = document.querySelector('[id="login_panel"]');

        if (loginPanel) {
            setBadge('!');
        } else {
            // attempt to locate the unread count
            var favouriteTree = document.querySelector('[id="MailFolderPane.FavoritesFolders"]');
            var firstFavourite = favouriteTree && favouriteTree.querySelector('[role=treeitem]');
            var unreadSpan = firstFavourite && firstFavourite.querySelector('span[id$=".ucount"]');
            var text = '' + (unreadSpan || {}).innerText;
            var newBadge = extractCountFromUnreadText(text, 0);
            // newBadge should always be an integer here

            setOrRemoveBadge(newBadge);
        }

        window.setTimeout(check, 5000);
    };
    check();
})();
