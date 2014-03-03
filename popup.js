$( document ).ready(function() {
    var text = [];
    var offset = [];
    var text_length = 0;
    var punctuation = [",",".","?","!",";",":"];
    var back = 40;
    var i = 0;
    var delay = 10;
    var display = 70;
    var wait_s = 0;
    var wait_l = 250;
    var display_time_remaining = 500;
    var wait_time_remaining = 0;
    var waiting = false;
    var interval = null;
    $("#go").click(function() {
        if (interval == null) {
            getSelectedText();
            interval = setInterval(writeWord,delay);
            $("#go").html("Pause");
        } else {
            clearInterval(interval);
            interval = null;
            $("#go").html("Start");
        }
    });

    function writeWord() {
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
                    displayWord("DONE! ", 5);
                    clearInterval(interval);
                    interval = null;
                    $("#go").html("Start");
                    i = 0;
                }
                display_time_remaining = display;
                waiting = false;
            }
        } else {
            waiting = true;
            if (punctuation.indexOf(text[i].slice(-1)) > -1) {
                console.log(text[i]);
                wait_time_remaining = wait_l;
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
        display -= 10;
    });

    $("button#minus").click(function(){
        display += 10;
    });
});

function displayWord(word, index) {
    $('td#first').html(word.substring(0,index));
    $('td#second').html("<b>" + word[index] + "</b>"+ word.substring(index+1));
}

