/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 50,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

    plugin.trial = function(display_element, trial) {
  
      var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px auto; text-align: center;">';
      html += '<div id="jspsych-html-slider-response-stimulus" style="margin-bottom: 20px;">' + trial.stimulus + '</div>';
      html += '<div class="jspsych-html-slider-response-container" style="position:relative; display: inline-block; height: 300px; width: 50px;">';
      html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="height: 100%; width: 100%; -webkit-appearance: slider-vertical; writing-mode: bt-lr; transform: rotate(0deg);" id="jspsych-html-slider-response-response"></input>';
      html += '<div style="position: absolute; left: 50%; top: -110px; transform: translateX(-50%);">';
      html += '<div style="text-align: center; white-space: nowrap;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[0]+'</span>';
      html += '</div>';
      html += '</div>';
      html += '<div style="position: absolute; left: 50%; bottom: -110px; transform: translateX(-50%);">';
      html += '<div style="text-align: center; white-space: nowrap;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[1]+'</span>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
  
      if (trial.prompt !== null){
        html += trial.prompt;
      }
  
      // add submit button
      html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';
  
      display_element.innerHTML = html;
  
      var response = {
        rt: null,
        response: null
      };
  
      if (trial.require_movement) {
        display_element.querySelector('#jspsych-html-slider-response-response').addEventListener('input', function(){
          display_element.querySelector('#jspsych-html-slider-response-next').disabled = false;
        });
      }
  
      display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
        // measure response time
        var endTime = performance.now();
        response.rt = endTime - startTime;
        response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
  
        end_trial();
      });
  
      function end_trial(){
  
        // save data
        var trialdata = {
          "rt": response.rt,
          "response": response.response,
          "stimulus": trial.stimulus
        };
  
        display_element.innerHTML = '';
  
        // next trial
        jsPsych.finishTrial(trialdata);
      }
  
      var startTime = performance.now();
    };
  
    return plugin;
  })();
  