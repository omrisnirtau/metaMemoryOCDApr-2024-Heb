// Helpful functions and variables

/* Declaring experiment parameters */
var subNum = getRandomInt(8) + 1
console.log("subNum: ",subNum)
export {subNum}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

export function clean(str) {
    if (str == null || str == "") {
        return str;
    }
    const finalString = str.replace('&emsp;&emsp;', ', ');
    return finalString;
}

export var inArray = function (Arr, str) {
    for (var i = 0; i < Arr.length; i++) {
        if (Arr[i] == str) {
            return true;
        }
    }
    return false;
};

export var concatLists = function (LEN, list1, list2) {
    var return_list = [];
    for (var i = 0; i < LEN; i++) {
        var randomized = Math.random()
        if (randomized > 0.5) {
            return_list[i] = {
                stimulus: list1[i]['stimulus'] + "&emsp;&emsp;" + list2[i]['stimulus'],
                correct: 65
            };
        }
        else {
            return_list[i] = {
                stimulus: list2[i]['stimulus'] + "&emsp;&emsp;" + list1[i]['stimulus'],
                correct: 68
            };
        }
    };
    return return_list;
};

export var concatListsYN = function (LEN, list1, list2) { //unused function
    var return_list = [];
    for (var i = 0; i < LEN; i++) {
        var randomized = Math.random()
        if (randomized > 0.5) {
            return_list[i] = {
                stimulus: list1[i]['stimulus'],
                correct: 39
            };
        }
        else {
            return_list[i] = {
                stimulus: list2[i]['stimulus'],
                correct: 37
            };
        }
    };
    return return_list;
}

export var shuffling = function (array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

var accuracy = 100;
export var Check_Accuracy = {
    type: 'html-keyboard-response',
    stimulus: '',
    trial_duration: 0,
    on_start: function () {
        const practiceData = jsPsych.data.get().filterCustom(function (trial) {
            return 'correct' in trial;
        }).filter({ TestOrStudy: "Test", Practice: true });

        const correctTrials = practiceData.filter({ correct: 1 });
        accuracy = (correctTrials.count() / practiceData.count()) * 100;
        if (accuracy < 60) {
            let message = "<p><br>Your experiment has ended due to low success in the practice stage.<br><br> Please insert the following completion code into Prolific.<br><br> C1LEO3C4 <br><br>The experiement will close in 20s, please do not close the page.</p>";
            this.stimulus = message;
            this.trial_duration = 20000;
        }

    },
    on_finish: function () {
        if ((accuracy < 60)) {
            // jsPsych.data.addProperties(jatos.urlQueryParameters);
            var resultJson = jsPsych.data.get().csv();
            // jatos.submitResultData(resultJson, jatos.startNextComponent);
            jsPsych.endExperiment();
        }
    }
}

export var create_words_list = function (num_of_words) {
    var arr = [];
    for (var i = 0; i < num_of_words; i++) {
        var rand = getRandomInt(word_bank.length);
        while (used[rand] == true) {
            rand = getRandomInt(word_bank.length);
        }
        arr[i] = { stimulus: word_bank[rand], };
        used[rand] = true;
    };
    return arr;
};

export var resetUsedArray = function resetUsedArray() {
    used.fill(false);
}


export const word_bank = [
    'account',
    'affair',
    'agent',
    'armor',
    'array',
    'arrow',
    'artist',
    'aspect',
    'attack',
    'baby',
    'bargain',
    'barrel',
    'basis',
    'basket',
    'battle',
    'beauty',
    'beaver',
    'bed',
    'bird',
    'black',
    'blessing',
    'blue',
    'bottom',
    'boundary',
    'bubble',
    'building',
    'business',
    'butcher',
    'butter',
    'cabin',
    'campaign',
    'canal',
    'candy',
    'cannon',
    'canvas',
    'captain',
    'carbon',
    'career',
    'castle',
    'cat',
    'chair',
    'chapel',
    'cherry',
    'circle',
    'circuit',
    'climate',
    'closet',
    'clothing',
    'coffee',
    'collar',
    'colonel',
    'column',
    'compass',
    'compound',
    'congress',
    'contract',
    'copy',
    'corner',
    'costume',
    'cotton',
    'county',
    'courage',
    'cousin',
    'crystal',
    'culture',
    'current',
    'daughter',
    'daylight',
    'degree',
    'desk',
    'detail',
    'device',
    'diamond',
    'diet',
    'dinner',
    'distance',
    'dog',
    'doorway',
    'double',
    'dragon',
    'duty',
    'eagle',
    'echo',
    'effect',
    'elbow',
    'elder',
    'empire',
    'engine',
    'error',
    'estate',
    'evening',
    'excess',
    'fabric',
    'factor',
    'failure',
    'farmer',
    'feature',
    'feeling',
    'figure',
    'finger',
    'fish',
    'flavor',
    'forehead',
    'forest',
    'fortune',
    'fountain',
    'frontier',
    'garden',
    'garment',
    'genius',
    'goddess',
    'goodbye',
    'green',
    'habit',
    'harbour',
    'heaven',
    'helmet',
    'hero',
    'hexagon',
    'horse',
    'husband',
    'image',
    'instant',
    'iron',
    'jacket',
    'journey',
    'judgment',
    'keeper',
    'kitchen',
    'kitten',
    'lady',
    'lamp',
    'language',
    'laughter',
    'lawyer',
    'leader',
    'learning',
    'lecture',
    'lemon',
    'letter',
    'level',
    'limit',
    'lion',
    'lover',
    'lumber',
    'machine',
    'major',
    'maker',
    'manner',
    'marble',
    'market',
    'marriage',
    'master',
    'mayor',
    'meadow',
    'meaning',
    'member',
    'merit',
    'message',
    'metal',
    'method',
    'million',
    'mission',
    'mistake',
    'mistress',
    'model',
    'moisture',
    'moment',
    'monkey',
    'motion',
    'motor',
    'mountain',
    'movie',
    'muscle',
    'nation',
    'navy',
    'notion',
    'novel',
    'number',
    'object',
    'ocean',
    'octagon',
    'onion',
    'orange',
    'orchard',
    'organ',
    'outline',
    'oven',
    'owner',
    'package',
    'palace',
    'paper',
    'parent',
    'partner',
    'passage',
    'patience',
    'pattern',
    'penny',
    'pepper',
    'perfume',
    'person',
    'picture',
    'pigeon',
    'pillow',
    'pink',
    'planet',
    'platform',
    'pocket',
    'police',
    'pony',
    'powder',
    'prayer',
    'pressure',
    'princess',
    'problem',
    'product',
    'program',
    'project',
    'province',
    'pursuit',
    'puzzle',
    'rabbit',
    'reading',
    'reason',
    'receipt',
    'red',
    'relief',
    'research',
    'resort',
    'resource',
    'ribbon',
    'rider',
    'rival',
    'river',
    'robin',
    'sandwich',
    'scatter',
    'science',
    'section',
    'sentence',
    'series',
    'servant',
    'service',
    'shepherd',
    'shower',
    'silence',
    'singer',
    'single',
    'sister',
    'slipper',
    'sofa',
    'soldier',
    'sparrow',
    'spirit',
    'square',
    'squirrel',
    'standard',
    'station',
    'steamer',
    'stocking',
    'stomach',
    'story',
    'subject',
    'success',
    'sugar',
    'summer',
    'system',
    'table',
    'teacher',
    'temper',
    'tennis',
    'theater',
    'theory',
    'thunder',
    'training',
    'trapeze',
    'treasure',
    'triangle',
    'triumph',
    'trouble',
    'twilight',
    'uncle',
    'unit',
    'valley',
    'vessel',
    'voyage',
    'wagon',
    'willow',
    'window',
    'witness',
    'wrinkle',
    'writer',
    'writing',
    'yellow'
];

const used = Array(word_bank.length).fill(false);

/* Creating a new list of the entire words for the experiment */  
/* create a new array of words for the experiment */ 


var all_words_list = shuffling(word_bank);
console.log('this is the full words_list',  all_words_list);

//Practice words for YN
export var studyListPracticeYN = all_words_list.slice(0, 10);// 10 new words for YN practice learning 
export var testListPracticeYN = all_words_list.slice(0, 20);// 10 old words + 10 new words for YN practice test 
//Block 1 words for YN
export var studyListBlock1_YN = all_words_list.slice(20, 50);// 30 new words for YN block 1
export var testListBlock1_YN = all_words_list.slice(20, 80);// 30 old words + 30 new words for YN block 1
//Block 2 words for YN
export var studyListBlock2_YN = all_words_list.slice(80, 110);// 30 new words for YN block 2
export var testListBlock2_YN = all_words_list.slice(80, 140);// 30 old words + 30 new words for YN block 2

//Practice words for 2AFC
export var studyListPractice2AFC = all_words_list.slice(140, 150);// 10 new words for 2AFC practice learning
export var testListPractice2AFC = all_words_list.slice(140, 160);// 10 old words + 10 new words for 2AFC practice test
//Block 1 words for 2AFC
export var studyListBlock1_2AFC = all_words_list.slice(160, 190);// 30 new words for 2AFC block 1
export var testListBlock1_2AFC = all_words_list.slice(160, 220);// 30 old words + 30 new words for 2AFC block 1
//Block 2 words for 2AFC
export var studyListBlock2_2AFC = all_words_list.slice(220, 250);// 30 new words for 2AFC block 2
export var testListBlock2_2AFC = all_words_list.slice(220, 280);// 30 old words + 30 new words for 2AFC block 2 

