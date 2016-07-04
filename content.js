var elements = document.getElementsByTagName('*');

var dodgersToOther = [
    [['Dodgers', 'dodgers', 'Los Angeles Dodgers', 'los angeles dodgers', 'LA Dodgers', 'la dodgers' ], 'worst team in the MLB'],
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(dodgersToOther, modifyWords) {
    return dodgersToOther.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(dodgersToOther, identity).concat(makeRegexToTargetWords(dodgersToOther, capitalizeFirstLetter)).concat(makeRegexToTargetWords(dodgersToOther, toUpperCase));

function replaceTextWithRegexes(text, dodgersToOther) {
    for (var k = 0; k < dodgersToOther.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}