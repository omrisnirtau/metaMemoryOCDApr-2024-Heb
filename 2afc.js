import {subNum, inArray, create_words_list, shuffling, concatLists, clean, studyListPractice2AFC, testListPractice2AFC, studyListBlock1_2AFC, testListBlock1_2AFC, studyListBlock2_2AFC, testListBlock2_2AFC} from "./helpful_functions.js" 
import {init_study_practice_start, init_study_1, init_test_practice, init_test, end_test, choice_test_phase_instructions_2afc, confidence_test_phase_instructions, fund_test_phase_instructions, fund_test_phase_start_practice, second_phase_end_practice, fund_test_phase_end_practice, updateSum, SharedSum} from "./instructions.js"

var afc_timeline = [];
var trial_length = 46;
var practice_length = 10; 
var countToFB = 1;
var countToNW = 0;
var subBR = 0;
var trials2FB = [11,11,11,14,14,14,17,17,17];
trials2FB = shuffling(trials2FB);
var randomized_fund_side = Math.random()

//creating the test lists so they can be read as timeline variables
var testListPractice2AFCconcat = concatLists(practice_length, testListPractice2AFC.slice(0, Math.ceil(testListPractice2AFC.length / 2)).map(stimulus => ({ stimulus })), testListPractice2AFC.slice(Math.floor(testListPractice2AFC.length / 2)).map(stimulus => ({ stimulus })));
var testListBlock1_2AFCconcat = concatLists(30, testListBlock1_2AFC.slice(0, Math.ceil(testListBlock1_2AFC.length / 2)).map(stimulus => ({ stimulus })), testListBlock1_2AFC.slice(Math.floor(testListBlock1_2AFC.length / 2)).map(stimulus => ({ stimulus })));
var testListBlock2_2AFCconcat = concatLists(30, testListBlock2_2AFC.slice(0, Math.ceil(testListBlock2_2AFC.length / 2)).map(stimulus => ({ stimulus })), testListBlock2_2AFC.slice(Math.floor(testListBlock2_2AFC.length / 2)).map(stimulus => ({ stimulus })));

console.log("testListPractice2AFC", testListPractice2AFC)
console.log("studyListPractice2AFC", studyListPractice2AFC)
console.log("testListPractice2AFCconcat", testListPractice2AFCconcat)
console.log("testListBlock1_2AFC", testListBlock1_2AFC)
console.log("studyListBlock1_2AFC", studyListBlock1_2AFC)
console.log("testListBlock1_2AFCconcat", testListBlock1_2AFCconcat)
console.log("testListBlock2_2AFC", testListBlock2_2AFC)
console.log("studyListBlock2_2AFC", studyListBlock2_2AFC)
console.log("testListBlock2_2AFCconcat", testListBlock2_2AFCconcat)

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
            NW_practice.prompt = "<br>" + "<span dir='rtl' lang=he'><p> לחץ על <bdi>&nbsp;'k'</bdi>כדי להמשיך </p></span>"
            if (jsPsych.data.get().filter({test_part: 'Study'}).last(1).select('key_press').values == 32) {
                NW_practice.stimulus ="<span dir='rtl' lang=he'><p> מעולה! המילה האחרונה הייתה מילה לא אמיתית, ולחצת על מקש הרווח.</span>" + 
                "<span dir='rtl' lang=he'><p> עבודה טובה :) </p></span>";
            } else {
                NW_practice.stimulus ="<span dir='rtl' lang=he'><p> המילה האחרונה הייתה מילה לא אמיתית ולא לחצת על מקש הרווח.</span>" + 
                "<span dir='rtl' lang=he'><p> שים לב לכך בפעם הבאה. </p></span>";
            };
        } else {
            if (jsPsych.data.get().filter({test_part: 'Study'}).last(1).select('key_press').values == 32) {
                NW_practice.trial_duration = null,
                NW_practice.choices = [75], // the key-code for the 'k' key
                NW_practice.response_ends_trial= true,
                NW_practice.stimulus ="<span dir='rtl' lang=he'><p> המילה האחרונה הייתה מילה אמיתית בעברית ולחצת על מקש הרווח.</span>" + 
                "<span dir='rtl' lang=he'><p> נא לא ללחוץ על מקש הרווח כשמופיעות מילים אמיתיות בעברית. </p></span>";
                NW_practice.prompt = "<br>" + "<span dir='rtl' lang=he'><p> לחץ על <bdi>&nbsp;'k'</bdi>כדי להמשיך  </p></span>"
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


// Creating the non-words stimuli
var N = ['abins','adregn','alneg','beancse','cadcor','ceaon','cosmut','eddlas','fint','hadelr','livde','nesills','niamed','opavr','pough','relacp','rueabu','snait','srinop','terimb','yatch','zear'];
var nonsA = [{stimulus:'livde'}, {stimulus:'beancse'},{stimulus:'fint'}, {stimulus:'hadelr'}];
var nonsB = [{stimulus:'relacp'}, {stimulus:'snait'},{stimulus:'pough'}, {stimulus:'nesills'}];
var practiceNons = [{stimulus:'srinop'}, {stimulus:'opavr'}];

/* Creating a timeline variable for the study and test phases - stimulus parameter changes according */ 
var study = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [32], /* key codes for space bar */
    data: {test_part: 'Study'},
    trial_duration: 1300,
};

// Global variable to store computed style object

/* new version with 3-steps decision process */
var choice_test = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'), 
    choices: [65,68], /* key codes for 'a' and 'd' */
    data: {test_part: 'Test', target_resp: jsPsych.timelineVariable('correct')},
    prompt: '<img src="images/2afc_image.png" width=436 height=210></img>',
    on_finish: function(data){
        data.stimulus = clean(this.stimulus);
        if (data.target_resp == data.key_press){
            data.correct = 1
        } else {
            data.correct = 0
        };

        subBR = (jsPsych.data.get().filter({test_part: 'Test'}).last(countToFB).select('correct').mean())*100;
        console.log("choice test", "stimulus:", jsPsych.currentTrial().stimulus, "data.target_resp:", data.target_resp, "data.key_press:", data.key_press, "data.correct:", data.correct)
    }
};
var choice_feedback = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: [32],
    trial_duration: 1000,
    data: "",
    on_start: function(choice_feedback){
            //present the chosen word
            var choiceKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];
            console.log("choice key press", choiceKeyPress);
            var stim = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('stimulus').values[0];
            var parts = stim.split('&emsp;&emsp;');
            parts = parts[0].split(',');
            var word1 = parts[0];
            var word2 = parts[1];
            console.log("word1", word1, "word2", word2);
            
            if(choiceKeyPress === 65){
                choice_feedback.stimulus = word1+`<span style="color: transparent; "font-family:'Quicksand', sans-serif;">'${word2}'</span><br><img src='images/blank_page.png' width=436 height=210>`;
            }
            else{
                choice_feedback.stimulus = `<span style="color: transparent;"font-family:'Quicksand', sans-serif;"">'${word1}'</span>`+word2+"<br><img src='images/blank_page.png' width=436 height=210>";
            }
    }
};


var confidence_test = {
    type: "html-slider-response",
    stimulus: "<span style='font-size:26px'>כמה אתם בטוחים בהחלטה שלכם?</span> <br><br><br>",
    labels: ['<span style="font-size:26px">100% (ביטחון מלא)</span>', '<span style="font-size:26px">50% (ניחוש)</span>'],
    min: 50,
    max: 100,
    start: 50,
    slider_width: 500,
    require_movement: true,
    data: {test_part: 'Confidence'},
    prompt: '',
    on_start: function(confidence_test){
        confidence_test.start = Math.random() * 50 + 50; // Random value between 50 and 100
        /*
        //present the chosen word
        var choiceKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];
        console.log("choice key press", choiceKeyPress);
        var stim = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('stimulus').values[0];
        var parts = stim.split('&emsp;&emsp;');
        parts = parts[0].split(',');
        var word1 = parts[0];
        var word2 = parts[1];
        console.log("word1", word1, "word2", word2);
        if(choiceKeyPress === 37){
            confidence_test.prompt = "<br>" + word1 + "<br>";
        }
        else{
            confidence_test.prompt = "<br>" + word2 + "<br>";
        }
        //confidence_test.prompt= '<img src="images/conf_scale_BBB.png" width=655 height=280></img>'
        */
    },
    on_finish: function(data){
        data.stimulus = clean(this.stimulus);
        data.confidence_rating = data.response;
        console.log("confidence test", "stimulus:", jsPsych.currentTrial().stimulus, "data.confidence_rating:", data.confidence_rating)
        subBR = (jsPsych.data.get().filter({test_part: 'Test'}).last(countToFB).select('correct').mean())*100;
    }
};
var fund_test = {
    type: "html-button-response-vertical",
    stimulus: "",
    choices: ['<span dir="rtl" lang="he"><p style="font-size:25px; ">הוספת ההחלטה לקופת הפרס</p></span>', '<span dir="rtl" lang="he"><p style="font-size:25px; ">דילוג על הוספת ההחלטה לקופת הפרס</p></span>'],
    data: {test_part: 'Fund'},
    prompt: '',
    on_start: function(fund_test) {
        /*
        //present chosen word
        var choiceKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];
        var stim = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('stimulus').values[0];
        var parts = stim.split('&emsp;&emsp;');
        parts = parts[0].split(',');
        var word1 = parts[0];
        var word2 = parts[1];
        if(choiceKeyPress == 37){
            fund_test.prompt = "<br>" + word1 + "<br>";
        }
        else{
            fund_test.prompt = "<br>" + word2 + "<br>";
        }
        */
    },
    on_finish: function(data){
        var lastCorrectScore = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('correct').values[0];
        var fundAddition = 0;
        if(data.button_pressed === '1'){ //subject pressed on the right-button when "add to fund" button was on the right
            if(lastCorrectScore == 1){
                fundAddition = 1;
            }
            if(lastCorrectScore == 0){
                fundAddition = -4;
            }
        }
        data.fund_addition = fundAddition; //add the proper fund addition to the data
        if(data.Practice == false){
            data.sum = updateSum(fundAddition);
        }
        console.log("fund test", "lastCorrectScore:", lastCorrectScore, "data.button_pressed:", data.button_pressed, "randomized_fund_side:", randomized_fund_side, "data.fund_addition:", data.fund_addition, "data.sum:", data.sum)
        console.log("SharedSum.sum", SharedSum.sum);
    }
};



// PRACTICE - creating the "inner timeline" for the practice session
var STUDY_practice = {
    timeline: [fixation, study, non_words_practice],
    timeline_variables: [...studyListPractice2AFC.map(stimulus => ({ stimulus })),...practiceNons],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
           Practice: true,
           Phase: '2AFC',
           Block: -1},
};

var TEST_practice_choice = {
    timeline: [fixation, choice_test, choice_feedback],
    timeline_variables: [...testListPractice2AFCconcat.slice(0,3)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
           Practice: true,
           Phase: '2AFC',
           Block: -1},
};

var TEST_practice_confidence = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test],
    timeline_variables: [...testListPractice2AFCconcat.slice(3,6)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
           Practice: true,
           Phase: '2AFC',
           Block: -1},
};

var TEST_practice_fund = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test],
    timeline_variables: [...testListPractice2AFCconcat.slice(6,10)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
           Practice: true,
           Phase: '2AFC',
           Block: -1},
};

var TEST_practice_confidence_and_fund = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test],
    timeline_variables: [...testListPractice2AFCconcat.slice(3,10)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
           Practice: true,
           Phase: '2AFC',
           Block: -1},
};



//comprehension question
var incorrectAttempts = 0;
var correctAnswer = '<span dir="rtl" lang="he"><p style="font-size:15.5px">אני אאבד ארבע נקודות אם אבצע החלטה לא נכונה ואבחר להוסיף את ההחלטה לקופת הפרס.</p></span>';
var question_options = [
    '<span dir="rtl" lang="he"><p style="font-size:15.5px">אני ארוויח נקודה אחת אם אני אבצע החלטה נכונה ואבחר לדלג על הוספת ההחלטה לקופת הפרס.</p></span>',
    '<span dir="rtl" lang="he"><p style="font-size:15.5px">אני אאבד נקודה אחת אם אני אבצע החלטה לא נכונה ואבחר להוסיף את ההחלטה לקופת הפרס.</p></span>',
    '<span dir="rtl" lang="he"><p style="font-size:15.5px">אני ארוויח ארבע נקודות אם אני אבצע החלטה נכונה ואבחר להוסיף את ההחלטה לקופת הפרס.</p></span>',
    '<span dir="rtl" lang="he"><p style="font-size:15.5px">אני אאבד ארבע נקודות אם אבצע החלטה לא נכונה ואבחר להוסיף את ההחלטה לקופת הפרס.</p></span>'
];



var TEST_comprehension_check = {
    type: "html-button-response",
    randomize_question_order: true,
    stimulus: '<span dir="rtl" lang="he"><p style="font-size:28px">לפני שנמשיך אנחנו רוצים לוודא שהבנתם איך עובדת קופת הפרס.</p></span><br><span dir="rtl" lang="he"><p style="font-size:28px">איזו אמירה מהאמירות הבאות נכונה? (יכולה להיות רק תשובה אחת נכונה).</p></span>',
    choices: question_options,
    prompt: '',
    margin_horizontal: '24px',
    on_start: function(TEST_comprehension_check) {
        TEST_comprehension_check.choices = shuffling(question_options);
    },
    on_finish: function(TEST_comprehension_check) {        
        var response = question_options[Number(TEST_comprehension_check.button_pressed)]; // Get the user's response
        console.log("data.button_pressed", TEST_comprehension_check.button_pressed, "response", response);
        // Check if the response matches the correct answer
        if (response !== correctAnswer) {
            incorrectAttempts++;
        }
        console.log("incorrectAttempts", incorrectAttempts);
    }
    
};

var TEST_second_comprehension_check = {
    type: "html-button-response",
    randomize_question_order: true,
    stimulus: '<span dir="rtl" lang="he"><p style="font-size:28px">לפני שנמשיך אנחנו רוצים לוודא שהבנתם איך עובדת קופת הפרס.</p></span><br><span dir="rtl" lang="he"><p style="font-size:28px">איזו אמירה מהאמירות הבאות נכונה? (יכולה להיות רק תשובה אחת נכונה).</p></span>',
    choices: shuffling(question_options),
    prompt: '',
    margin_horizontal: '24px',
    on_start: function(TEST_second_comprehension_check) {
        TEST_second_comprehension_check.choices = shuffling(question_options);
    },
    on_finish: function(TEST_second_comprehension_check) {        
        var response = question_options[Number(TEST_second_comprehension_check.button_pressed)]; // Get the user's response
        console.log("data.button_pressed", TEST_second_comprehension_check.button_pressed, "response", response);
        // Check if the response matches the correct answer
        if (response !== correctAnswer) {
            incorrectAttempts++;
            console.log("incorrectAttempts", incorrectAttempts);
            // If user was mistaken twice, end the experiment
            if (incorrectAttempts >= 2) {
                jsPsych.endExperiment('<span dir="rtl" lang="he"><pstyle="font-size:12px"><br>הניסוי הסתיים בגלל אחוזי הצלחה נמוכים בשלב האימון.<br><br> אנא הכנס את הקוד הבא ל-<bdi>Prolific</bdi>.<br><br> C1LEO3C4 <br></p></span>');
            }
        }

    }
    
};
var comprehension_check_timeline = {
    timeline: [TEST_second_comprehension_check],
    conditional_function: function(){
        if(incorrectAttempts == 1){
            return true;
        }
        else{
            return false;
        }
    }
}
var end_first_test_first_phase = {
    type: "html-keyboard-response",
    stimulus:  "<span dir='rtl' lang=he'><p> כל הכבוד! </p></span>" +
    "<span dir='rtl' lang=he'><p> השלמתם את הבלוק הראשון של מטלת הזיכרון הראשונה. </p></span>" +
    "<span dir='rtl' lang=he'><p> יש לכם עוד בלוק אחד במטלת זיכרון זו ובסך הכל עוד שלושה בלוקים. </p></span>" +
    '<span dir="rtl" lang="he"><p><b>סך הנקודות שבקופת הפרס שלכם הוא</b>:</p></span>' +
    "<br>" ,
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להמשיך. </p></span>",
    post_trial_gap: 1000,
    on_start: function(end_first_test_first_phase) {
        var lastSum = jsPsych.data.get().filter({test_part: 'Fund'}).last(1).select('sum').values[0];
        console.log(lastSum);
        end_first_test_first_phase.stimulus += lastSum + '<span dir="rtl" lang="he"> נקודות</span>'
    },
    on_finish: function () {
        countToFB = 1;
        console.log("SharedSum.sum", SharedSum.sum);
        console.log("jsPsych.data.get().filter({test_part: 'Fund'}).last(1).select('sum').values[0]", jsPsych.data.get().filter({test_part: 'Fund'}).last(1).select('sum').values[0])
    }
};
var end_first_test_second_phase = {
    type: "html-keyboard-response",
    stimulus:  "<span dir='rtl' lang=he'><p> מצוין! סיימתם את הבלוק הראשון במטלת הזיכרון השנייה. יש לכם עוד בלוק אחד כדי להשלים את מטלת הזיכרון השניה. </p></span>" +
    '<span dir="rtl" lang="he"><p><b>סך הנקודות שבקופת הפרס שלכם הוא</b>:</p> </span>' + 
    "<br>" ,
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להמשיך. </p></span>",
    post_trial_gap: 1000,
    on_start: function(end_first_test_second_phase) {
        var lastSum = jsPsych.data.get().filter({test_part: 'Fund'}).last(1).select('sum').values[0];
        console.log(lastSum);
        end_first_test_second_phase.stimulus += lastSum + '<span dir="rtl" lang="he"> נקודות</span>'
    },
    on_finish: function () {
        countToFB = 1;
    }
};
var end_first_phase = {
    type: "html-keyboard-response",
    stimulus:  "<span dir='rtl' lang=he'><p> מעולה! </p></span>" +
    "<span dir='rtl' lang=he'><p> סיימתם את מטלת הזיכרון הראשונה. </p></span>" +
    '<span dir="rtl" lang="he"><p><b>סך הנקודות שבקופת הפרס שלכם הוא</b>:</p></span> ' +
    "<br>" ,
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> אתם עומדים להתחיל את מטלת הזיכרון השניה. </p></span>",
    post_trial_gap: 1000,
    on_start: function(end_first_phase) {
        var lastSum = jsPsych.data.get().filter({test_part: 'Fund'}).last(1).select('sum').values[0];
        console.log(lastSum);
        end_first_phase.stimulus += lastSum + '<span dir="rtl" lang="he"> נקודות</span>'
    },
    on_finish: function () {
        countToFB = 1;
    }
};
var eyes_relax = {
    type: "html-keyboard-response",
    stimulus: "<span dir='rtl' lang=he'><p> לפני שנמשיך אנו מציעים שתקחו רגע כדי לתת לעיניים שלכם לנוח. </p></span>" +
    "<br>" ,
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להמשיך</p></span>",
    post_trial_gap: 1000,
    on_finish: function () {
        countToFB = 1;
    }
};

var end_second_phase = {
    type: "html-keyboard-response",
    stimulus:  "<span dir='rtl' lang=he'><p> סיימתם את החלק של מטלות הזיכרון! </p></span>" +
    '<span dir="rtl" lang="he"><p><b>סך הנקודות שבקופת הפרס שלכם הוא</b>:</p> </span>' + 
    "<br>" ,
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להתחיל את השלב האחרון של הניסוי. </p></span>",
    post_trial_gap: 1000,
    on_start: function(end_second_phase) {
        var lastSum = jsPsych.data.get().filter({test_part: 'Fund'}).last(1).select('sum').values[0];
        console.log(lastSum);
        end_second_phase.stimulus += lastSum + '<span dir="rtl" lang="he"> נקודות</span>'
    },
    on_finish: function () {
        countToFB = 1;
    }
};

import { randomized  } from "./yes_no.js";
import { Check_Accuracy } from "./helpful_functions.js";

if (randomized <= 0.5){
    afc_timeline.push(STUDY_practice, choice_test_phase_instructions_2afc, TEST_practice_choice, confidence_test_phase_instructions, TEST_practice_confidence, fund_test_phase_instructions, TEST_comprehension_check, comprehension_check_timeline, fund_test_phase_start_practice, TEST_practice_fund, Check_Accuracy);
}
else{
    afc_timeline.push(STUDY_practice, choice_test_phase_instructions_2afc, TEST_practice_choice);
}

// BLOCK 1 - creating an "inner timeline" - a timeline of fixation-stimuli sequence to be repeated in the big timeline
// here is the place to decide how many repetitions each trial type will have
var STUDY1 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListBlock1_2AFC.map(stimulus => ({ stimulus })), ...nonsA],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: '2AFC',
            Block: 1},
};
if(randomized <= 0.5) {
    afc_timeline.push(fund_test_phase_end_practice);
}
else{
    afc_timeline.push(second_phase_end_practice)
}
afc_timeline.push(STUDY1);


var TEST1 = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test, FB],
    timeline_variables: [...testListBlock1_2AFCconcat],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: '2AFC',
            Block: 1},
};

afc_timeline.push(TEST1);
if(randomized <= 0.5) {
    afc_timeline.push(end_first_test_first_phase);
}
else{
    afc_timeline.push(end_first_test_second_phase)
}

// BLOCK 2 - again, creating an "inner timeline" - a timeline of fixation-stimuli sequence to be repeated in the big timeline
// here is the place to decide how many repetitions each trial type will have
var STUDY2 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListBlock2_2AFC.map(stimulus => ({ stimulus })), ...nonsB],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: '2AFC',
            Block: 2},
};

afc_timeline.push(STUDY2);


var TEST2 = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test, FB],
    timeline_variables: [...testListBlock2_2AFCconcat],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: '2AFC',
            Block: 2},
};

afc_timeline.push(TEST2);
if(randomized <= 0.5) {
    afc_timeline.push(end_first_phase, eyes_relax);
}
else{
    afc_timeline.push(end_second_phase)
}





export {afc_timeline};