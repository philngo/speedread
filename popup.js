$( document ).ready(function() {
    var ticks = 0;
    var text = [];
    var offset = [];
    var text_length = 0;
    var punctuation_l = [".","?","!"];
    var punctuation_sl = [",",";",":"];
    var back = 40;
    var i = 0;
    var delay = 10;
    var display = 70;
    var wait_s = 0;
    var wait_l = 250;
    var wait_sl = 150;
    var display_time_remaining = 500;
    var wait_time_remaining = 0;
    var waiting = false;
    var interval = null;

    $("input").keypress(function(key){
        if(key.which == 13) {
            startStop();
        }
    });

    $("#go").click(function() {
        startStop();
    });

    function startStop() {
        if (interval == null) {
            getSelectedText();
            interval = setInterval(writeWord,delay);
            $("#go").html("Pause");
        } else {
            clearInterval(interval);
            interval = null;
            $("#go").html("Start");
        }

    }

    function writeWord() {
        ticks++;
        if (display_time_remaining > 0) {
            displayWord(text[i], offset[i]);
            display_time_remaining -= delay;
            return;
        }
        if (waiting) {
            if (wait_time_remaining > 0) {
                displayWord(" ",0);
                wait_time_remaining -= delay;
            } else {
                i+=1;
                if (i == text_length) {
                    var wpm = Math.round(text_length * 60000 / ticks / delay)
                    displayWord("DONE!-WPM: " + wpm, 5);
                    clearInterval(interval);
                    interval = null;
                    $("#go").html("Start");
                    i = 0;
                    ticks = 0;
                }
                display_time_remaining = display;
                waiting = false;
            }
        } else {
            waiting = true;
            if (punctuation_l.indexOf(text[i].slice(-1)) > -1) {
                console.log(text[i]);
                wait_time_remaining = wait_l;
            } else if (punctuation_sl.indexOf(text[i].slice(-1)) > -1){
                wait_time_remaining = wait_sl;
            } else {
                wait_time_remaining = wait_s;
            }
        }
    }
    function getSelectedText() {
        var offset_key = [0,0,1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7];
        text = $("#text_selection").val().split(" ");
        offset = text.map(function(word) {
            return offset_key[word.length];
        });
        text_length = text.length;
    }

    $("button#back").click(function(){
        i -= back;
        if (i < 0) {
            i = 0;
        }
    });

    $("button#plus").click(function(){
        display -= 5;
    });

    $("button#minus").click(function(){
        display += 5;
    });
});

function displayWord(word, index) {
    var part1 = word.substring(0,index);
    var part2 = word[index];
    var part3 = word.substring(index + 1);
    if (part1 != undefined)
        $('td#first').html(part1);
    if (part2 != undefined)
        $('td#second').html("<b>" + part2 + "</b>"+ part3);
}

