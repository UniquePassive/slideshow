// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
    var counter = array.length;

    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);

        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function randomItem(items) {
    items.sort(function(a, b) {
        return (a[1] < b[1]) ? -1 : ((a[1] == b[1] ? 0 : 1));
    });

    var max = 0;
    for (var i = 0; i < items.length; i++) {
        max += items[i][1];
    }
    var rand = getRandomArbitrary(0, max);

    var cumulativeChance = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i][1] != 0) {
            cumulativeChance += items[i][1];

            if (cumulativeChance >= rand) {
                break;
            }
        }
    }

    return items[i][0];
}
