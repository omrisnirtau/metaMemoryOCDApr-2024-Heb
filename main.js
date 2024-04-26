import {getRandomInt, create_words_list, shuffling, word_bank} from "./helpful_functions.js";



/* Creating the empty timeline */
var timeline = [];





/* Opening fullscreen */
timeline.push({
    type: 'fullscreen',
    message: "<span dir='rtl' lang=he'><p style=text-align:center>הניסוי יעבור למסך מלא כשתלחצו על הכפתור: </p></span>",
    fullscreen_mode: true
});

/* Creating the first few screens of the experiment, the 'welcome' message */
import {instructions_2afc, instructions_yes_no,
        second_task_instructions_2afc, second_task_instructions_yes_no, end_test}
        from "./instructions.js"


import {yes_no_timeline} from "./yes_no.js";
import {afc_timeline} from "./2afc.js";
import {OCI_DASS_timeline} from "./oci_dass.js"

import { randomized } from "./yes_no.js";
if (randomized > 0.5){
    timeline.push(instructions_yes_no);
    timeline = timeline.concat(yes_no_timeline);
    timeline.push(end_test);
    timeline.push(second_task_instructions_2afc);
    timeline = timeline.concat(afc_timeline);
    var firstTask = 'yes_no'; //a label that indicated 'yes_no' test is performed first
}
else{
    timeline.push(instructions_2afc);
    timeline = timeline.concat(afc_timeline);
    timeline.push(end_test);
    timeline.push(second_task_instructions_yes_no);
    timeline = timeline.concat(yes_no_timeline);
    var firstTask = '2afc'; //a label that indicated '2afc' test is performed first
}

timeline = timeline.concat(OCI_DASS_timeline);

timeline[0].data = { //add the first task label to the data
    first_task: firstTask
};

var worker_comments = {
    type: 'survey-text',
    preamble: '<h1>Your Thoughts<h1>',
    questions: [{
    prompt: "That's it! Before we thank you, we would appreciate if you could share " +
        "any thoughts you had about the experiment, or anything we should " +
        "take into account when analyzing your data.",
    pleaceholder: "your comments here",
    rows: 4,
    columns: 40,
    name: 'worker_comments'
    }]
};
timeline.push(worker_comments);

/* Creating the last window in the experiment to end the experiment */
var end_exp = {
    type: "html-keyboard-response",
    stimulus: "<h4> We are done! </h4>" +
    "<p> Thank you for your participance in our experiment. </p>" +
    "<br>" + "<p> In order to complete the study, you have to go back to Prolific and insert this completion code: <br><br> C1F3EENJ <br> This page will close in 20 seconds, please wait. </p>" + "<br>",
    choices: jsPsych.NO_KEYS,
    trial_duration: 20000,
    on_start: function(){
        // jsPsych.data.addProperties(jatos.urlQueryParameters);
        var resultJson = jsPsych.data.get().csv();
        // jatos.submitResultData(resultJson);
    }
};
timeline.push(end_exp);

var images = ['images/studyExample1.png', 'images/testExample_AAA_2AFC.png', 'images/keyboardExample.png',
              'images/2afc_image.png', 'images/decision_AAA_left_new.png', 'images/decision_AAA_right_new.png', 
              'images/conf_scale_BBB.png', 'images/conf_scale_BBB_n.png', 'images/conf_scale_BBB_o.png',
              'images/testExample_AAA_left_new.png', 'images/testExample_AAA_right_new.png','images/testExample_BBB.png'];


jsPsych.data.get().defaultExportFormat = 'csv';

jsPsych.init({
    timeline: timeline,
    preload_images: images,
	on_finish: function () {
        // jsPsych.data.addProperties(jatos.urlQueryParameters);
        var resultJson = jsPsych.data.get().csv();
        // jatos.submitResultData(resultJson, jatos.startNextComponent);
      }
});

