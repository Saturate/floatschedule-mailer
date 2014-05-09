'use strict';

(function($){
    var settings = {
        manager: "kib@netcompany.com",
    };

    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getFullYear(), weekNo];
    }

    function createMailTo () {
        var senderName = 'Allan Kimmer Jensen';
        var subject = 'Status - UGE'  + getWeekNumber(new Date())[1] + senderName;

        document.location.href = 'mailto:' + settings.manager + '?subject=' + subject;
    }

    $(document).on('click', '.gen-status-mail', function() {
        var $person = $(this).closest('.person');

        var rowId = $person.data('row_id');

        var $today,
            $weekDays,
            projects = [];

        $today = $('.calenderGrid .staff#row-' + rowId).find('.today');
        $weekDays = $().add($today)
            .add($today.prevUntil( '.weekend', 'div' ))
            .add($today.nextUntil( '.weekend', 'div' ));

        $.each($weekDays, function() {
            var title = $('.jobStrip', this).attr('title');

            if(title) {
                projects.push(title);
            }

        });

        console.log(projects);

    });

    $('.person p').append('<div class="gen-status-mail" style="font-size:11px;position:relative;top:-15px;left:121px;cursor:pointer;">Status Mail</div>');

}(jQuery));
