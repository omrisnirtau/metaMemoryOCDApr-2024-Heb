var OCI_DASS_timeline = [];

var OCI_instructions = {
    type: 'instructions',
    pages: function () {
      return [
        '<p>In the next part you will see statements that refer to experiences that many people have in their everyday lives. Overall, there are three questionnaires in this part. We will start with the first one, comprised of 20 items. Mark the number that best describes how much that experience has distressed or bothered you during the <b>PAST MONTH.</b>'
      ]
    },
    show_clickable_nav: true,
    key_forward: 'space'
  }


  var likert_scale = [
    
    "Not at all - 0",
    "A little - 1",
    "Moderately -2",
    "A lot -3",
    "Extremly - 4"
  ];
  //I've edited the plugin's css for font/color adjustments

  //to write a genral funbction that gets question and returns likert survey 
  //input is list of strings. 


  var likert_trial_oci_1 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 1/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "I have saved up so many things that they get in the way.", name: 'OCI-1', labels: likert_scale, required: true },
      { prompt: "I check things more often than necessary.", name: 'OCI-2', labels: likert_scale, required: true },
      { prompt: "I get upset if objects are not arranged properly.", name: 'OCI-3', labels: likert_scale, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);
      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_1', question: question, answer_oci: questions[question] })
      }

    }
  };

  var likert_trial_oci_2 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 2/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "I feel compelled to count while I am doing things.", name: 'OCI-4', labels: likert_scale, required: true },
      { prompt: "I find it difficult to touch an object when I know it has been touched by strangers or certain people.", name: 'OCI-5', labels: likert_scale, required: true },
      { prompt: "I find it difficult to control my own thoughts.", name: 'OCI-6', labels: likert_scale, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);
      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_2', question: question, answer_oci: questions[question] })
      }

    }
  };

  var likert_trial_oci_3 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 3/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "I collect things I don't need.", name: 'OCI-7', labels: likert_scale, required: true },
      { prompt: "I repeatedly check doors, windows, drawers, etc.", name: 'OCI-8', labels: likert_scale, required: true },
      { prompt: "I get upset if others change the way I have arranged things.", name: 'OCI-9', labels: likert_scale, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_3', question: question, answer_oci: questions[question] })
      }

    }
  };

  var likert_trial_oci_4 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 4/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "I feel I have to repeat certain numbers.", name: 'OCI-10', labels: likert_scale, required: true },
      { prompt: "If you read this question, check the option 'Not at all' ", name: 'OCI-Attention_check_1', labels: likert_scale, required: true },
      { prompt: "I sometimes have to wash or clean myself simply because I feel contaminated.", name: 'OCI-11', labels: likert_scale, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_4', question: question, answer_oci: questions[question] })
      }

    }
  };

  var likert_trial_oci_5 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 5/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "I am upset by unpleasant thoughts that come into my mind against my will.", name: 'OCI-12', labels: likert_scale, required: true },
      { prompt: "I avoid throwing things away because I am afraid I might need them later.", name: 'OCI-13', labels: likert_scale, required: true },
      { prompt: "I repeatedly check gas and water taps and light switches after turning them off.", name: 'OCI-14', labels: likert_scale, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_5', question: question, answer_oci: questions[question] })
      }

    }
  };


  var likert_trial_oci_6 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 6/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "If you read this question, check the option 'Moderately' ", name: 'OCI-Attention_check_2', labels: likert_scale, required: true },
      { prompt: "I need things to be arranged in a particular way.", name: 'OCI-15', labels: likert_scale, required: true },
      { prompt: "I feel that there are good and bad numbers.", name: 'OCI-16', labels: likert_scale, required: true },

    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_6', question: question, answer_oci: questions[question] })
      }

    }
  };

  var likert_trial_oci_7 = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 7/7</p>',
    scale_width: 1000,
    questions: [
      { prompt: "I wash my hands more often and longer than necessary.", name: 'OCI-17', labels: likert_scale, required: true },
      { prompt: "Have there been times of a couple days or more when you were able to stop breathing entirely (without the aid of medical equipment)? ", name: 'OCI-Attention_check_3', labels: likert_scale, required: true },
      { prompt: "I frequently get nasty thoughts and have difficulty in getting rid of them.", name: 'OCI-18', labels: likert_scale, required: true },
      { prompt: "I sometimes go back and check that I didn't do something bad unintentionally. ", name: 'OCI-Absent', labels: likert_scale, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_oci_7', question: question, answer_oci: questions[question] })
      }

    }
  };

OCI_DASS_timeline.push(OCI_instructions)
OCI_DASS_timeline.push(likert_trial_oci_1)
OCI_DASS_timeline.push(likert_trial_oci_2)
OCI_DASS_timeline.push(likert_trial_oci_3)
OCI_DASS_timeline.push(likert_trial_oci_4)
OCI_DASS_timeline.push(likert_trial_oci_5)
OCI_DASS_timeline.push(likert_trial_oci_6)
OCI_DASS_timeline.push(likert_trial_oci_7)

var DASS_instructions = {
    type: 'instructions',
    pages: function () {
      return [
        '<p>Well done! you have finished the first questionnaire. Now you will complete the second questionnaire, comprised of 14 items Please read each statement and circle a number 0, 1, 2 or 3 which indicates how much the statement applied to you over the <b>PAST WEEK</b>. There are no right or wrong answers.  Do not spend too much time on any statement.</p>'
      ]
    },
    show_clickable_nav: true,
    key_forward: 'space'
  }


  var likert_scale_DASS = [
    "0-Did not apply to me at all",
    "1-Applied to me to some degree, or some of the time",
    "2-Applied to me to a considerable <br> degree, or a good part of time",
    "3-Applied to me very much, or most of the time",
  ];

  var likert_trial_1_DASS = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 1/5</p>',
    scale_width: 1200,
    questions: [
      { prompt: "I was aware of dryness of my mouth", name: 'DASS-2', labels: likert_scale_DASS, required: true },
      { prompt: "I couldn't seem to experience any positive feeling at all", name: 'DASS-3', labels: likert_scale_DASS, required: true },
      { prompt: "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion)", name: 'DASS-4', labels: likert_scale_DASS, required: true },
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_1_DASS', question: question, answer_dass: questions[question] })
      }

    }
  };


  var likert_trial_2_DASS = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 2/5</p>',
    scale_width: 1200,
    questions: [
      { prompt: "I found it difficult to work up the initiative to do things", name: 'DASS-5', labels: likert_scale_DASS, required: true },
      { prompt: "I experienced trembling (eg, in the hands)", name: 'DASS-7', labels: likert_scale_DASS, required: true },
      { prompt: "I was worried about situations in which I might panic and make a fool of myself", name: 'DASS-9', labels: likert_scale_DASS, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_2_DASS', question: question, answer_dass: questions[question] })
      }

    }
  };

  var likert_trial_3_DASS = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 3/5</p>',
    scale_width: 1200,
    questions: [
      { prompt: "I felt that I had nothing to look forward to", name: 'DASS-10', labels: likert_scale_DASS, required: true },
      { prompt: "I felt down-hearted and blue", name: 'DASS-13', labels: likert_scale_DASS, required: true },
      { prompt: "I felt I was close to panic", name: 'DASS-15', labels: likert_scale_DASS, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_3_DASS', question: question, answer_dass: questions[question] })
      }

    }
  };


  var likert_trial_4_DASS = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 4/5</p>',
    scale_width: 1200,
    questions: [
      { prompt: "I was unable to become enthusiastic about anything", name: 'DASS-16', labels: likert_scale_DASS, required: true },
      { prompt: "I felt I wasn't worth much as a person", name: 'DASS-17', labels: likert_scale_DASS, required: true },
      { prompt: "I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat)", name: 'DASS-19', labels: likert_scale_DASS, required: true }

    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_4_DASS', question: question, answer_dass: questions[question] })
      }

    }
  };

  var likert_trial_5_DASS = {
    type: 'survey-likert',
    preamble: '<p style=font-size:14px>Page 5/5</p>',
    scale_width: 1200,
    questions: [
      { prompt: "I felt scared without any good reason", name: 'DASS-20', labels: likert_scale_DASS, required: true },
      { prompt: "I felt that life was meaningless", name: 'DASS-21', labels: likert_scale_DASS, required: true }
    ],
    randomize_question_order: true,
    on_finish: function (data) {
      var questions = JSON.parse(data.responses);

      for (var question in questions) {
        jsPsych.data.get().push({ Identifier: 'likert_trial_5_DASS', question: question, answer_dass: questions[question] })
      }

    }
  };
  //DASS part

  OCI_DASS_timeline.push(DASS_instructions)
  OCI_DASS_timeline.push(likert_trial_1_DASS)
  OCI_DASS_timeline.push(likert_trial_2_DASS)
  OCI_DASS_timeline.push(likert_trial_3_DASS)
  OCI_DASS_timeline.push(likert_trial_4_DASS)
  OCI_DASS_timeline.push(likert_trial_5_DASS)


  export {OCI_DASS_timeline};