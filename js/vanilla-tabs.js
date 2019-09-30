/*
 * Plugin Name: Vanilla Tabs
 * Version: 0.4.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaTabs
 * JavaScriptUtilities Vanilla Tabs may be freely distributed under the MIT license.
 */

var vanillaTabs = function(settings) {
    var self = this,
        triggers = false,
        targets = false;

    /* Settings */
    var _settings = {
        classCurrent: 'is-current',
        baseAttr: 'data-vanilla-tabs',
        callBackTab: function(i) {}
    };

    // Set new values
    for (var attr2 in settings) {
        _settings[attr2] = settings[attr2];
    }

    self.init = function(settings) {
        // Check if triggers and targets exists
        if (!_settings.triggers || !_settings.targets) {
            return false;
        }
        triggers = _settings.triggers;
        targets = _settings.targets;

        // Prevent double launch
        if (!triggers[0] || triggers[0].getAttribute(_settings.baseAttr)) {
            return;
        }

        // Set triggers
        (function() {
            var i = 0;
            triggers.forEach(function(el) {
                el.setAttribute(_settings.baseAttr, '1');
                el.setAttribute('data-i', i++);
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Get trigger number
                    var i = parseInt(el.getAttribute('data-i'), 10);
                    // Set called tab
                    self.setTab(i);
                }, 1);
            });
        }());

        // Go to tab #1
        self.setTab(0);
    };

    self.setTab = function(i) {
        var classCurrent = _settings.classCurrent,
            callBackTab = _settings.callBackTab;

        if (!triggers[i] || !targets[i]) {
            return;
        }

        // Remove class on all triggers and targets
        triggers.forEach(function(el, iEl) {
            el.classList[iEl == i ? 'add' : 'remove'](classCurrent);
            el.setAttribute('aria-selected', iEl == i ? 'true' : 'false');
        });

        // Set active
        targets.forEach(function(el, iEl) {
            el.classList[iEl == i ? 'add' : 'remove'](classCurrent);
            el.setAttribute('aria-hidden', iEl == i ? 'false' : 'true');
        });

        // Launch callback
        if (typeof callBackTab == 'function') {
            callBackTab(i);
        }
    };

    self.init(settings);
    return self;
};
