/*
 * Plugin Name: Vanilla Tabs
 * Version: 0.3.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaTabs
 * JavaScriptUtilities Vanilla Tabs may be freely distributed under the MIT license.
 */

var vanillaTabs = function(settings) {
    var self = this,
        triggers = false,
        targets = false;

    self.defaultSettings = {
        classCurrent: 'is-current',
        callBackTab: function(i) {}
    };

    self.init = function(settings) {
        self.getSettings(settings);
        // Check if triggers and targets exists
        if (!self.settings.triggers || !self.settings.targets) {
            return false;
        }
        triggers = self.settings.triggers;
        targets = self.settings.targets;
        // Prevent double launch
        if (!triggers[0] || triggers[0].getAttribute('data-vanilla-tabs')) {
            return;
        }

        // Set Elements & events
        self.setElements();
        self.setEvents();

        // Go to tab #1
        self.setTab(0);
    };

    self.setElements = function() {
        var i = 0;
        triggers.forEach(function(el) {
            el.setAttribute('data-vanilla-tabs', '1');
            el.setAttribute('data-i', i++);
        });
    };

    self.setEvents = function() {
        triggers.forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                // Get trigger number
                var i = parseInt(el.getAttribute('data-i'), 10);
                // Set called tab
                self.setTab(i);
            }, 1);
        });
    };

    self.setTab = function(i) {
        var classCurrent = self.settings.classCurrent,
            callBackTab = self.settings.callBackTab;
        if (!triggers[i] || !targets[i]) {
            return;
        }

        // Remove class on all triggers and targets
        triggers.forEach(function(el) {
            el.classList.remove(classCurrent);
        });
        targets.forEach(function(el) {
            el.classList.remove(classCurrent);
        });

        // Add class on current trigger & target
        triggers[i].classList.add(classCurrent);
        targets[i].classList.add(classCurrent);

        // Launch callback
        if (typeof callBackTab == 'function') {
            callBackTab(i);
        }
    };

    self.init(settings);
    return self;
};

/* Get Settings */
vanillaTabs.prototype.getSettings = function(settings) {
    if (typeof settings != 'object') {
        settings = {};
    }
    this.settings = {};
    // Set default values
    for (var attr in this.defaultSettings) {
        this.settings[attr] = this.defaultSettings[attr];
    }
    // Set new values
    for (var attr2 in settings) {
        this.settings[attr2] = settings[attr2];
    }
};
