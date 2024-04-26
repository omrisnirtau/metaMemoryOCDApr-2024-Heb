import {inArray, create_words_list, shuffling, concatListsYN} from "./helpful_functions.js" 
import {init_study_practice_start, end_study_practice, init_study_1, init_test_practice, init_test, end_test} from "./instructions.js"
import {subNum} from "./main.js"
var yes_no_timeline = []

var trial_length = 60; // Adjusted to create lists of 60 words
var practice_length = 10; 
var block = 0;
var numOfFB = 0;
var countToFB = 1;
var countToNW = 0;
var subBR = 0;
var condTargets = [];
var trials2FB = [11,11,11,14,14,14,17,17,17];
trials2FB = shuffling(trials2FB);

/* Creating a fixation screen that stays for "trial duration" and does not response to any key */
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: [32],
    trial_duration: 1000,
    data: {stimulus: '+'},
};

var FB = {
    type: 'html-keyboard-response',
    stimulus: ' ',
    choices: [32],
    trial_duration: 100,
    data: {stimulus: ''}
};

console.log('is this runing?')
var non_words_practice = {
    type: 'html-keyboard-response',
    stimulus: ' ',
    trial_duration: 100,
    data: {stimulus: 'Non-Word'},
    on_start: function(NW_practice) {
        if (inArray(N, jsPsych.data.get().filter({test_part: 'Study'}).last(1).select('stimulus').values)) {
            NW_practice.trial_duration = null,
            NW_practice.choices = [75], // the key-code for the 'k' key
            NW_practice.response_ends_trial= true,
            NW_practice.prompt = "<br>" + "<p> Press 'k' to continue </p>"
            if (jsPsych.data.get().filter({test_part: 'Study'}).last(1).select('key_press').values == 32) {
                NW_practice.stimulus = "<p> Amazing! the last item was a non-word, and you pressed the spacebar" + 
                "<p> Great job :) </p>";
            } else {
                NW_practice.stimulus = "<p> The last item was a non-word, but you did not press the spacebar" + 
                "<p> Keep that in mind for next time </p>";
            };
        } else {
            if (jsPsych.data.get().filter({test_part: 'Study'}).last(1).select('Study').values == 32) {
                NW_practice.trial_duration = null,
                NW_practice.choices = [75], // the key-code for the 'k' key
                NW_practice.response_ends_trial= true,
                NW_practice.stimulus = "<p> The last item was a legal word in English, but you pressed the spacebar" + 
                "<p> Pleae don't press any key for legal English words. </p>";
                NW_practice.prompt = "<br>" + "<p> Press 'k' to continue </p>"
            };
        }
    },
    on_finish: function () {
        if (countToNW == 3) {
            countToNW = 1;
            //numOfFB ++  
        } else {
            countToNW++
        }  
    }
};


// Creating all the word stimuli possible in this experiment, categorized into the 4 possible lists

// Creating all the word stimuli possible in this experiment
var all_words_1_1 = create_words_list(trial_length);
var all_words_1_2 = create_words_list(trial_length);
var all_words_1_3 = create_words_list(trial_length);
var all_words_1_4 = create_words_list(trial_length);
var all_words_2_1 = create_words_list(trial_length);
var all_words_2_2 = create_words_list(trial_length);
var all_words_2_3 = create_words_list(trial_length);
var all_words_2_4 = create_words_list(trial_length);

// Splitting each list into two parts: 30 for study, 30 new for test
//Block 1
var studyListA1 = all_words_1_1.slice(0, 30);
var testListA1 = all_words_1_1.slice(30, 60);

var studyListA2 = all_words_1_2.slice(0, 30);
var testListA2 = all_words_1_2.slice(30, 60);

var studyListA3 = all_words_1_3.slice(0, 30);
var testListA3 = all_words_1_3.slice(30, 60);

var studyListA4 = all_words_1_4.slice(0, 30);
var testListA4 = all_words_1_4.slice(30, 60);

//Block 2
var studyListB1 = all_words_2_1.slice(0, 30);
var testListB1 = all_words_2_1.slice(30, 60);

var studyListB2 = all_words_2_2.slice(0, 30);
var testListB2 = all_words_2_2.slice(30, 60);

var studyListB3 = all_words_2_3.slice(0, 30);
var testListB3 = all_words_2_3.slice(30, 60);

var studyListB4 = all_words_2_4.slice(0, 30);
var testListB4 = all_words_2_4.slice(30, 60);

var practiceList1 = create_words_list(practice_length);
var practiceList2 = create_words_list(practice_length);
var listpractice = concatListsYN(practice_length, practiceList1, practiceList2)


// Creating the non-words stimuli
var N = ['abins','adregn','alneg','beancse','cadcor','ceaon','cosmut','eddlas','fint','hadelr','livde','nesills','niamed','opavr','pough','relacp','rueabu','snait','srinop','terimb','yatch','zear'];
var nonsA = [{stimulus:'livde'}, {stimulus:'beancse'},{stimulus:'fint'}, {stimulus:'hadelr'},{stimulus:'rueabu'}, {stimulus:'yatch'}, {stimulus:'eddlas'}];
var nonsB = [{stimulus:'relacp'}, {stimulus:'snait'},{stimulus:'pough'}, {stimulus:'nesills'},{stimulus:'terimb'}, {stimulus:'cadcor'}, {stimulus:'alneg'}];
var practiceNons = [{stimulus:'srinop'}, {stimulus:'opavr'}];

/* Creating a timeline variable for the study and test phases - stimulus parameter changes according */ 
var study = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [32], /* key codes for space bar */
    data: {test_part: 'Study'},
    trial_duration: 1300,
};

// Define the key choices for old/new based on participant ID
var keyChoices = subNum % 2 === 0 ? [37, 39] : [39, 37]; // [left, right] for even IDs, [right, left] for odd IDs

/* new version with 2-steps decision process */
var testAAA = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [37,39], /* key codes for left right arrows */
    data: {test_part: 'Test', target_resp: jsPsych.timelineVariable('correct')},
    prompt: '', // set initially to empty
    on_start: function(trial){
        // Choose the prompt image based on the participant's ID
        if (subNum % 2 === 0) {
            trial.prompt = '<img src="images/decision_AAA_left_new.png" width=655 height=280></img>';
        } else {
            trial.prompt = '<img src="images/decision_AAA_right_new.png" width=655 height=280></img>';
        }
    },

    on_finish: function(data){
        if (data.target_resp == data.key_press){
            data.correct = 1
        } else {
            data.correct = 0
        };
        subBR = (jsPsych.data.get().filter({test_part: 'Test'}).last(countToFB).select('correct').mean())*100;
    }
};
var testBBB = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [49,50,51,52], /* key codes for numbers 1-4, accordingly */
    data: {test_part: 'Confidence'},
    prompt: '',
    on_start: function(testBBB) {
        // Get the last key press from the Test part
        var lastKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];

        // Check the condition for the prompt based on counterbalancing and last key press
        if ((subNum % 2 === 0 && lastKeyPress === 37) || (subNum % 2 !== 0 && lastKeyPress === 39)) {
            // "New" was chosen
            testBBB.prompt = '<img src="images/conf_scale_BBB_n.png" width=655 height=280></img>';
        } else {
            // "Old" was chosen
            testBBB.prompt = '<img src="images/conf_scale_BBB_o.png" width=655 height=280></img>';
        }
    },
    on_finish: function(data){
        data.confidence_rating = data.key_press - 48;
        subBR = (jsPsych.data.get().filter({test_part: 'Test'}).last(countToFB).select('correct').mean())*100;
    }
};



// PRACTICE - creating the "inner timeline" for the practice session
var STUDY_practice = {
    timeline: [fixation, study, non_words_practice],
    timeline_variables: [...practiceList1,...practiceNons],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: true,
            Phase: 'YN',
            Block: -1},
        };

var TEST_practice = {
    timeline: [fixation, testAAA, testBBB],
    timeline_variables: [...listpractice],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: true,
            Phase: 'YN',
            Block: -1},

};



import { Check_Accuracy } from "./helpful_functions.js";

export var randomized = Math.random()
console.log(randomized)    
if (randomized > 0.5){
    yes_no_timeline.push(init_study_practice_start, STUDY_practice, init_test_practice, TEST_practice, Check_Accuracy);
}
else{
    yes_no_timeline.push(init_study_practice_start, STUDY_practice, init_test_practice, TEST_practice);
}



// BLOCK 1 - creating an "inner timeline" - a timeline of fixation-stimuli sequence to be repeated in the big timeline
// here is the place to decide how many repetitions each trial type will have, and to randomize
// we will control randomization by participant number
var STUDY1_1 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListA1, ...nonsA],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 1) {
            return true;
        } else {
            return false;
        }
    }
};
var STUDY1_2 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListA2, ...nonsA],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 2){
            return true;
        } else {
            return false;
        }
    }
};
var STUDY1_3 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListA3, ...nonsB],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 3){
            return true;
        } else {
            return false;
        }
    }
};
var STUDY1_4 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListA4, ...nonsB],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 0){
            return true;
        } else {
            return false;
        }
    }
};
yes_no_timeline.push(end_study_practice, STUDY1_1, STUDY1_2, STUDY1_3, STUDY1_4);


var TEST1_1 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...testListA1],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 1) {
            return true;
        } else {
            return false;
        }
    },
};
var TEST1_2 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...testListA2],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 2) {
            return true;
        } else {
            return false;
        }
    },
};
var TEST1_3 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...testListA3],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 3) {
            return true;
        } else {
            return false;
        }
    },
};
var TEST1_4 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...testListA4],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 1},
    conditional_function: function(){
        if(subNum%4 == 0) {
            return true;
        } else {
            return false;
        }
    },
};
yes_no_timeline.push(init_test, TEST1_1, TEST1_2, TEST1_3, TEST1_4);


// BLOCK 2 - again, creating an "inner timeline" - a timeline of fixation-stimuli sequence to be repeated in the big timeline
// here is the place to decide how many repetitions each trial type will have, and to randomize
// we will control randomization by participant number
var STUDY2_1 = {
    timeline: [fixation, study],
    timeline_variables: [...listB1, ...nonsB],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 1){
            return true;
        } else {
            return false;
        }
    }
};
var STUDY2_2 = {
    timeline: [fixation, study],
    timeline_variables: [...listB2, ...nonsB],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 2){
            return true;
        } else {
            return false;
        }
    }
};
var STUDY2_3 = {
    timeline: [fixation, study],
    timeline_variables: [...listA1, ...nonsA],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 3){
            return true;
        } else {
            return false;
        }
    }
};
var STUDY2_4 = {
    timeline: [fixation, study],
    timeline_variables: [...listA2, ...nonsA],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 0){
            return true;
        } else {
            return false;
        }
    }
};
yes_no_timeline.push(init_study_1, STUDY2_1, STUDY2_2, STUDY2_3, STUDY2_4);


var TEST2_1 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...listB1B2],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 1) {
            return true;
        } else {
            return false;
        }
    },
};
var TEST2_2 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...listB2B1],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 2) {
            return true;
        } else {
            return false;
        }
    },
};
var TEST2_3 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...listA1A2],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 3) {
            return true;
        } else {
            return false;
        }
    },
};
var TEST2_4 = {
    timeline: [fixation, testAAA, testBBB, FB],
    timeline_variables: [...listA2A1],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 2},
    conditional_function: function(){
        if(subNum%4 == 0) {
            return true;
        } else {
            return false;
        }
    },
};
yes_no_timeline.push(init_test, TEST2_1, TEST2_2, TEST2_3, TEST2_4);

export {yes_no_timeline};