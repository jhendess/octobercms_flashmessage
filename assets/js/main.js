/**
 * Taken and adapted from https://gist.github.com/kdallas/17e07f9b50b066a13bdd
 */

$(window).on('ajaxErrorMessage', function (event, message) {
    event.preventDefault();
});

$(document).ajaxError(function (event, obj, context, status) {
    var message = '';
    var showfm = function (message) {
        var msgTxt = (typeof message === 'object') ? message[key][0] : message;

        if (document.flashflag) {
            document.romanov_flashoptions.message = msgTxt;
            document.romanov_flashsettings.type = 'danger';
            $.notify(document.romanov_flashoptions, document.romanov_flashsettings);
        } else {
            $.notify({
                icon: 'icon-exclamation-sign',
                message: msgTxt
            }, {
                type: 'danger'
            });
        }
    };
    if (typeof status.responseJSON === 'undefined') {

        if (typeof status.responseText != 'undefined') {
            message = status.responseText.match(/^\"(.*)\"\s/)[1];
        }

    } else {
        message = status.responseJSON.X_OCTOBER_ERROR_FIELDS;
    }
    if (typeof message === 'object') {
        // Don't render form validations -> use formerror component instead
    } else if (message != '') {
        showfm(message);
    }
});


$(document).ajaxSuccess(function (event, obj, context, data) {
    if (typeof data.msgs !== 'undefined') {
        if (data != '') {
            $.each(data.msgs, function (type, msg) {
                data.options.message = msg;
                var icon = '';
                //	switch (t) {
                switch (type) {
                    case 'success':
                    case 'info':
                        icon = 'icon-ok-sign';
                        break;
                    case 'danger':
                        icon = 'icon-exclamation-sign';
                        break;
                }
                data.options.icon = icon;
                data.settings.type = type;
                $.notify(data.options, data.settings);
            });
        }
    }
});