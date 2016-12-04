var SlideShow = function(content, caption, actionBar) {
    this.content = content;
    this.caption = caption;
    this.actionBar = actionBar;
};

SlideShow.prototype.load = function(id, pages) {
    this.id = id;
    this.pages = pages;
};

SlideShow.prototype.reset = function() {
    this.content.empty();
    this.caption.empty();
    this.actionBar.empty().removeData();
};

SlideShow.prototype.start = function() {
    this.position = 0;
    this.playSlide(this.position);
};

SlideShow.prototype.pressButton = function(idx) {
    var page = this.pages[this.position];
    var button = page.buttons[idx];

    if (this.timeout != undefined 
        && (this.cancelTimeout === undefined || this.cancelTimeout)) {
        clearTimeout(this.timeout);
    }

    if (button.next != undefined) {
        this.playSlide(button.next);
    }
};

/*
    Page parameters:

    image
    caption
    duration
    hideDuration
    next
    buttons 
        value
        next
    randomButtonOrder
*/

SlideShow.prototype.playSlide = function(idx) {
    var page = this.pages[idx];

    this.reset();
    
    if (page.image != undefined) {
        this.content.append('<img src="slides/' + this.id + '/' + page.image + '">');
    }
    
    if (page.caption != undefined) {
        this.caption.append('<p>' + page.caption +'</p>');
    }

    if (page.buttons != undefined) {
        if (page.randomButtonOrder != undefined
                && page.randomButtonOrder) {
            shuffle(page.buttons);
        }

        for (var i = 0; i < page.buttons.length; i++) {
            var button = page.buttons[i];
            this.actionBar.append('<button type="button" onclick="slideShow.pressButton(' + i + ')">' + button.value + '</button>')
        };
    }

    if (page.duration != undefined) {
        if (page.next != undefined) {
            var duration = page.duration;

            if (isNaN(duration)) {
                if (duration.indexOf("-") !== -1) {
                    // "10-30" -> random(10, 30)
                    var splitDuration = duration.split("-");
                    duration = getRandomInt(parseInt(splitDuration[0]), parseInt(splitDuration[1]));
                }
            }

            if (page.hideDuration === undefined || !page.hideDuration) {
                this.actionBar.circleProgress({
                    value: 1,
                    thickness: 10,
                    fill: {
                        color: '#01a252'
                    },
                    animation: {
                        duration: duration * 1000
                    }
                });
            }

            var self = this;
            this.timeout = setTimeout(function() {
                self.playSlide(page.next);
                delete self.timeout;
            }, duration * 1000);
        }
    }
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}