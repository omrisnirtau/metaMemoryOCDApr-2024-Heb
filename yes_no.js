import {subNum, inArray, create_words_list, shuffling, concatListsYN, resetUsedArray, studyListPracticeYN, testListPracticeYN, studyListBlock1_YN, testListBlock1_YN, studyListBlock2_YN, testListBlock2_YN} from "./helpful_functions.js" 
import {init_study_practice_start, init_study_1, init_test, end_test, choice_test_phase_instructions_yes_no, confidence_test_phase_instructions, fund_test_phase_instructions, fund_test_phase_start_practice, fund_test_phase_end_practice, second_task_choice_practice_instructions_yes_no, second_task_confidence_and_fund_practice_instructions_yes_no, second_phase_end_practice, updateSum, SharedSum} from "./instructions.js"
var yes_no_timeline = []
var trial_length = 60;
var practice_length = 20;
var countToFB = 1;
var countToNW = 0;
var subBR = 0;
var trials2FB = [11,11,11,14,14,14,17,17,17];
trials2FB = shuffling(trials2FB);
var randomized_fund_side = Math.random()


var tagListsYN = function (list1, list2) {
    var return_list = [];
    for (var i = 0; i < list1.length; i++) { //study list, these are old words
        if (subNum % 2 === 0) { //old is on the right (68)
            return_list[i] = {
                stimulus: list1[i]['stimulus'],
                correct: 68
            };
        }
        else {
            return_list[i] = { //old is on the left (65)
                stimulus: list1[i]['stimulus'],
                correct: 65
            };
        }
    };
    for (var i = 0; i < list2.length; i++) { //test list only, these are new words
        if (subNum % 2 === 0) { //new is on the left (65)
            return_list[i+list1.length] = {
                stimulus: list2[i]['stimulus'],
                correct: 65
            };
        }
        else {
            return_list[i+list1.length] = { //new is on the right (68)
                stimulus: list2[i]['stimulus'],
                correct: 68
            };
        }
    };
    //return_list = shuffling(return_list)
    return return_list;
}

var testListPracticeYesNoconcat = tagListsYN(studyListPracticeYN.map(stimulus => ({ stimulus })), testListPracticeYN.slice(Math.floor(testListPracticeYN.length / 2)).map(stimulus => ({ stimulus })));
var testListBlock1_YesNoconcat = tagListsYN(testListBlock1_YN.slice(0, Math.ceil(testListBlock1_YN.length / 2)).map(stimulus => ({ stimulus })), testListBlock1_YN.slice(Math.floor(testListBlock1_YN.length / 2)).map(stimulus => ({ stimulus })));
var testListBlock2_YesNoconcat = tagListsYN(testListBlock2_YN.slice(0, Math.ceil(testListBlock2_YN.length / 2)).map(stimulus => ({ stimulus })), testListBlock2_YN.slice(Math.floor(testListBlock2_YN.length / 2)).map(stimulus => ({ stimulus })));

//shuffle the lists
shuffling(testListPracticeYesNoconcat);
shuffling(testListBlock1_YesNoconcat);
shuffling(testListBlock2_YesNoconcat);

console.log("testListPracticeYN", testListPracticeYN)
console.log("studyListPracticeYN", studyListPracticeYN)
console.log("testListPracticeYesNoconcat", testListPracticeYesNoconcat)
console.log("testListBlock1_YN", testListBlock1_YN)
console.log("studyListBlock1_YN", studyListBlock1_YN)
console.log("testListBlock1_YesNoconcat", testListBlock1_YesNoconcat)
console.log("testListBlock2_YN", testListBlock2_YN)
console.log("studyListBlock2_YN", studyListBlock2_YN)
console.log("testListBlock2_YesNoconcat", testListBlock2_YesNoconcat)

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
                NW_practice.stimulus = "<span dir='rtl' lang=he'><p> מעולה! המילה האחרונה הייתה מילה לא אמיתית, ולחצת על מקש הרווח.</span>" + 
                "<span dir='rtl' lang=he'><p> עבודה טובה :) </p></span>";
            } else {
                NW_practice.stimulus = "<span dir='rtl' lang=he'><p> המילה האחרונה הייתה מילה לא אמיתית ולא לחצת על מקש הרווח.</span>" + 
                "<span dir='rtl' lang=he'><p> שים לב לכך בפעם הבאה. </p></span>";
            };
        } else {
            if (jsPsych.data.get().filter({test_part: 'Study'}).last(1).select('key_press').values == 32) {
                NW_practice.trial_duration = null,
                NW_practice.choices = [75], // the key-code for the 'k' key
                NW_practice.response_ends_trial= true,
                NW_practice.stimulus = "<span dir='rtl' lang=he'><p> המילה האחרונה הייתה מילה אמיתית בעברית ולחצת על מקש הרווח.</span>" + 
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
var nonsA = [{stimulus:'abins'}, {stimulus:'adregn'},{stimulus:'ceaon'}, {stimulus:'cosmut'}];
var nonsB = [{stimulus:'niamed'}, {stimulus:'zear'},{stimulus:'rueabu'}, {stimulus:'yatch'}];
var practiceNons = [{stimulus:'eddlas'}, {stimulus:'cadcor'}];

/* Creating a timeline variable for the study and test phases - stimulus parameter changes according */ 
var study = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [32], /* key codes for space bar */
    data: {test_part: 'Study'},
    trial_duration: 1300,
};

// Define the key choices for old/new based on participant ID
/* new version with 3-steps decision process */
var choice_test = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [65,68], /* key codes for left right arrows */
    data: {test_part: 'Test', target_resp: jsPsych.timelineVariable('correct')},
    prompt: '', // set initially to empty
    on_start: function(trial){
        // Choose the prompt image based on the participant's ID
        if (subNum % 2 === 0) {
            trial.prompt = '<img src="images/decision_AAA_left_new.png" width=436 height=215></img>';
            trial.data.new_sign_location = 'left'; //a label that indicates the location of the new sign
        } else {
            trial.prompt = '<img src="images/decision_AAA_right_new.png" width=436 height=215></img>';
            trial.data.new_sign_location = 'right'; //a label that indicates the location of the new sign
        }
    },

    on_finish: function(data){
        if (data.target_resp == data.key_press){
            data.correct = 1
        } else {
            data.correct = 0
        };
        console.log("choice test", "stimulus:", jsPsych.currentTrial().stimulus, "data.target_resp:", data.target_resp, "data.key_press:", data.key_press, "data.correct:", data.correct)
        subBR = (jsPsych.data.get().filter({test_part: 'Test'}).last(countToFB).select('correct').mean())*100;
    }
};
var choice_feedback = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: [32],
    trial_duration: 1000,
    data: "",
    on_start: function(choice_feedback){
        //present the chosen word and decision
        // Get the last key press from the Test part
        var lastKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];
        var stim = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('stimulus').values[0];
        // Check the condition for the prompt based on counterbalancing and last key press
        if (subNum % 2 === 0 && lastKeyPress === 65) {
            // "New" was chosen and was on the left
            //confidence_test.prompt = '<img src="images/conf_scale_BBB_n.png" width=655 height=280></img>';
            choice_feedback.stimulus = "<br><img src='images/decision_feedback_new_left_chosen.png' width=436 height=215>";
        }
        if (subNum % 2 !== 0 && lastKeyPress === 68) {
            // "New" was chosen and was on the right
            choice_feedback.stimulus = "<br><img src='images/decision_feedback_new_right_chosen.png' width=436 height=215>";
        }
        if (subNum % 2 == 0 && lastKeyPress === 68) {
            // "Old" was chosen and was on the right
            choice_feedback.stimulus = "<br><img src='images/decision_feedback_old_right_chosen.png' width=436 height=215>";
        }
        if (subNum % 2 !== 0 && lastKeyPress === 65) {
            // "Old" was chosen and was on the left
            //confidence_test.prompt = '<img src="images/conf_scale_BBB_o.png" width=655 height=280></img>';
            choice_feedback.stimulus = "<br><img src='images/decision_feedback_old_left_chosen.png' width=436 height=215>";
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
    on_start: function(confidence_test) {
        confidence_test.start = Math.random() * 50 + 50; // Random value between 50 and 100
        /*
        //present the chosen word and decision
        // Get the last key press from the Test part
        var lastKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];
        var stim = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('stimulus').values[0];
        // Check the condition for the prompt based on counterbalancing and last key press
        if ((subNum % 2 === 0 && lastKeyPress === 37) || (subNum % 2 !== 0 && lastKeyPress === 39)) {
            // "New" was chosen
            //confidence_test.prompt = '<img src="images/conf_scale_BBB_n.png" width=655 height=280></img>';
            confidence_test.prompt = '<br>' + stim + '<br><br> <b> New <br></b>';
        } else {
            // "Old" was chosen
            //confidence_test.prompt = '<img src="images/conf_scale_BBB_o.png" width=655 height=280></img>';
            confidence_test.prompt = '<br>' + stim + '<br><br> <b> Old <br></b>';
        }
        */
    },
    on_finish: function(data){
        data.confidence_rating = data.response;
        console.log("confidence test", "data.confidence_rating:", data.confidence_rating)
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
        //present the chosen decision, and last word      
        var lastKeyPress = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('key_press').values[0];// Get the last correst score from the Test part
        var stim = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('stimulus').values[0];
        // Check the condition for the prompt based on counterbalancing and last key press
        if ((subNum % 2 === 0 && lastKeyPress === 37) || (subNum % 2 !== 0 && lastKeyPress === 39)) {
            // "New" was chosen
            fund_test.prompt += '<br>' + stim + '<br><br> <b> New <br></b>';
        } else {
            // "Old" was chosen
            fund_test.prompt += '<br>' + stim + '<br><br> <b> Old <br></b>';
        }
        */
    },
    on_finish: function(data){
        var lastCorrectScore = jsPsych.data.get().filter({test_part: 'Test'}).last(1).select('correct').values[0];
        var fundAddition = 0;
        
        if(data.button_pressed === '1'){ //subject pressed on the right-button when "add to fund" button was on the right
            if(lastCorrectScore === 1){
                fundAddition = 1;
            }
            if(lastCorrectScore === 0){
                fundAddition = -4;
            }
        }  
        data.fund_addition = fundAddition //add the proper fund addition to the data
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
    timeline_variables: [...studyListPracticeYN.map(stimulus => ({ stimulus })),...practiceNons],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: true,
            Phase: 'YN',
            Block: -1},
        };

var TEST_practice_choice = {
    timeline: [fixation, choice_test, choice_feedback],
    timeline_variables: [...testListPracticeYesNoconcat.slice(0,3)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: true,
            Phase: 'YN',
            Block: -1},

};

var TEST_practice_confidence = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test],
    timeline_variables: [...testListPracticeYesNoconcat.slice(3,6)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: true,
            Phase: 'YN',
            Block: -1},

};

var TEST_practice_fund = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test],
    timeline_variables: [...testListPracticeYesNoconcat.slice(6, 10)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: true,
            Phase: 'YN',
            Block: -1},

};

var TEST_practice_confidence_and_fund = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test],
    timeline_variables: [...testListPracticeYesNoconcat.slice(3, 10)],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: true,
            Phase: 'YN',
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

import { Check_Accuracy } from "./helpful_functions.js";


export var randomized = Math.random()
if (randomized > 0.5){
    console.log("yes no first")
    yes_no_timeline.push(STUDY_practice, choice_test_phase_instructions_yes_no, TEST_practice_choice, confidence_test_phase_instructions, TEST_practice_confidence, fund_test_phase_instructions, TEST_comprehension_check, comprehension_check_timeline, fund_test_phase_start_practice, TEST_practice_fund, Check_Accuracy);
}
else{
    console.log("2afc first")
    yes_no_timeline.push(STUDY_practice, second_task_choice_practice_instructions_yes_no, TEST_practice_choice, second_task_confidence_and_fund_practice_instructions_yes_no, TEST_practice_confidence_and_fund);
}



// BLOCK 1 - creating an "inner timeline" - a timeline of fixation-stimuli sequence to be repeated in the big timeline
// here is the place to decide how many repetitions each trial type will have
var STUDY1 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListBlock1_YN.map(stimulus => ({ stimulus })), ...nonsA],
    response_ends_trial: false,
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 1},
};
if(randomized > 0.5) {
    yes_no_timeline.push(fund_test_phase_end_practice);
}
else{
    yes_no_timeline.push(second_phase_end_practice);
}
yes_no_timeline.push(STUDY1);


var TEST1 = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test, FB],
    timeline_variables: [...testListBlock1_YesNoconcat],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 1},
};

yes_no_timeline.push(TEST1);
if(randomized > 0.5) {
    yes_no_timeline.push(end_first_test_first_phase);
}
else{
    yes_no_timeline.push(end_first_test_second_phase);
}

// BLOCK 2 - again, creating an "inner timeline" - a timeline of fixation-stimuli sequence to be repeated in the big timeline
// here is the place to decide how many repetitions each trial type will have

var STUDY2 = {
    timeline: [fixation, study],
    timeline_variables: [...studyListBlock2_YN.map(stimulus => ({ stimulus })), ...nonsB],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Study",
            Practice: false,
            Phase: 'YN',
            Block: 2},
};

yes_no_timeline.push(STUDY2);


var TEST2 = {
    timeline: [fixation, choice_test, choice_feedback, confidence_test, fund_test, FB],
    timeline_variables: [...testListBlock2_YesNoconcat],
    randomize_order: true,
    repetitions: 1,
    data: {TestOrStudy: "Test",
            Practice: false,
            Phase: 'YN',
            Block: 2},
};

yes_no_timeline.push(TEST2);
if(randomized > 0.5){
    yes_no_timeline.push(end_first_phase, eyes_relax);
}
else{
    yes_no_timeline.push(end_second_phase);
}

export {yes_no_timeline};