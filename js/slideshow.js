/*
    Page (in pages.js) parameters:

    image
    caption
    duration
    hideDuration
    next
    buttons 
        value
        next
    buttonOrder
*/

var SlideShow = function(content, caption, actionBar) {
    this.content = content;
    this.caption = caption;
    this.actionBar = actionBar;
};

SlideShow.prototype.load = function(id, pages) {
    this.id = id;
    this.pages = pages;

    this.reset();
};

SlideShow.prototype.reset = function() {
    this.content.empty();
    this.caption.empty();
    this.actionBar.empty().removeData();

    if (this.timeout !== undefined) {
        clearTimeout(this.timeout);
        delete this.timeout;
    }
};

SlideShow.prototype.playSlide = function(idx) {
    this.reset();

    this.position = idx;

    var page = this.pages[idx];
    
    if (page.image !== undefined) {
        this.content.append('<img src="' + page.image + '">');
    }
    
    if (page.caption !== undefined) {
        this.caption.append('<p>' + page.caption +'</p>');
    }

    if (page.buttons !== undefined) {
        if (page.buttonOrder !== undefined) {
            eval(page.buttonOrder);
        }

        for (var i = 0; i < page.buttons.length; i++) {
            var button = page.buttons[i];
            this.actionBar.append('<button type="button" onclick="slideShow.pressButton(' + i + ')">' + button.value + '</button>')
        };
    }

    if (page.duration !== undefined) {
        if (page.next !== undefined) {
            var duration = evaluateInt(page.duration);

            if (page.hideDuration === undefined 
                    || !page.hideDuration) {
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

            this.timeout = setTimeout((function() {
                this.playSlide(evaluateInt(page.next));
                delete this.timeout;
            }).bind(this), duration * 1000);
        }
    }
};

SlideShow.prototype.pressButton = function(idx) {
    var page = this.pages[this.position];
    var button = page.buttons[idx];

    if (button.next !== undefined) {
        this.playSlide(evaluateInt(button.next));
    }
};

function evaluateInt(string) {
    if (isNaN(string)) {
        return eval(string);
    }
    return string;
}
