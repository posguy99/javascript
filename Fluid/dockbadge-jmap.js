/*
Fluid App Userscript
FastMail web interface
URL pattern: *fastmail.com/mail/*
*/

setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 10000);

INBOX_ONLY = true;
FILTERED = [ "Drafts", "Trash", "Spam" ];

function updateDockBadge()
{
    var count = 0;
    var tree = document.getElementsByClassName("v-MailboxSource");
    if (!tree)
    {
        // console.log("no tree")
        return;
    }

    for (i = 0;  i < tree.length; i++)
    {
        name = tree[i].getElementsByClassName("app-source-name")[0].innerText;
        if (FILTERED.indexOf(name) > -1)
        {
            // console.log(name)
            badge = 0
        } else {
           badge = tree[i].getElementsByClassName("v-MailboxSource-badge")[0].innerText;
        }
        // console.log("name: " + name + ", badge: " + badge);

        if (badge)
        {
            if (! INBOX_ONLY || name == "Inbox")
            {
                if (FILTERED.indexOf(name) == -1)
                {
                    count += parseInt(badge);
                } else {
                    // console.log("filtered: " + name);
                }
            }
        }
    }

    // console.log("new count: " + count + ", current count: " + window.fluid.dockBadge);
    if (count > window.fluid.dockBadge)
    {
        notification = {
            title: "FastMail",
            description: "You have " + count + " unread message" + ((count > 1) ? "s" : ""),
            priority: 1,
            sticky: false,
            identifier: "fastmail",
            icon: window.fluid.resourcePath + "appl.icns",
            // icon: "https://www.fastmail.com/static/favicons/touch-icon-196x196.png",
        };
        // console.log("show notification")
        // window.fluid.showGrowlNotification(notification);
        window.fluid.showUserNotification(notification);
        window.fluid.dockBadge = count;
    } else if (count > 0) {
        window.fluid.dockBadge = count;
    } else {
        window.fluid.dockBadge = "";
    }
}
