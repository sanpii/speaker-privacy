var privateWindow = 0;
var name = "browser.urlbar.autocomplete.enabled";
var originValue = require("sdk/preferences/service").get(name);

function setAutocomplete(value)
{
    require("sdk/preferences/service").set(name, value);
}

function closePrivateWindow()
{
    privateWindow--;

    if (privateWindow === 0) {
        setAutocomplete(originValue);
    }
}

function openPrivateWindow(window)
{
    if (require("sdk/private-browsing").isPrivate(window)) {
        privateWindow++;
        setAutocomplete(false);

        window.on("close", closePrivateWindow);
    }
}

var windows = require("sdk/windows").browserWindows;
windows.on("open", openPrivateWindow);
