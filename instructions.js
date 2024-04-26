//Params
var countToFB = 1;

// Import subNum from your main script
import { subNum} from "./helpful_functions.js";

export var SharedSum = {
    sum: 0
};


export function updateSum(fundAddition) {
    SharedSum.sum += fundAddition;
    if(SharedSum.sum < 0){
        SharedSum.sum = 0;
    }
    return SharedSum.sum;
}


// Function to get the correct instructions image based on subNum
function getTestPhaseImage() {
    // if (subNum % 2 === 0) { //old version where the participant sees an example that matches the place where the 'new' sign will appear in the testv
    //     return 'images/yes_no_choice_test_new_left_example.png';
    // } else {
    //     return 'images/yes_no_choice_test_new_right_example.png';
    // }
    return 'images/yes_no_choice_test_example.png';
}

function getKeyboardExampleText() {
    if (subNum % 2 === 0) { //new is on the left
        return`<span dir="rtl" lang="he"><p> אנא בצעו את החלטתכם באמצעות החצים: <br>
        לחצו <bdi>&nbsp;A</bdi>אם זו מילה חדשה 
        ולחצו <bdi>&nbsp;D</bdi>אם זו מילה ישנה
        </p></span>`;
    } else { //new is on the right
        return`<span dir="rtl" lang="he"><p> אנא בצע את החלטתך באמצעות החצים: <br>
        לחצו <bdi>&nbsp;A</bdi>אם זו מילה ישנה 
        ולחצו <bdi>&nbsp;D</bdi>אם זו מילה חדשה
        </p></span>`;
    }
}

function getKeyboardExampleImage() {
    if (subNum % 2 === 0) { //new is on the left
        return`<span dir="rtl" lang="he"><img src='images/Keyboard_choice_new_left.png' width=785 height=374></img></span>`;
    } else { //new is on the right
        return`<span dir="rtl" lang="he"><img src='images/Keyboard_choice_new_right.png' width=785 height=374></img></span>`;
    }
}
/* Creating the instructions */
export var instructions_yes_no = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> ברוכים הבאים לניסוי! לחצו על <bdi>&nbsp;next</bdi>או על מקש הרווח כדי להתקדם למסך הבא </p></span>',
        
        '<span dir="rtl" lang="he"><p> הניסוי מורכב משני חלקים: מטלת זיכרון וסדרת שאלות כלליות על חוויות יומיומיות. ביצוע הניסוי לוקח כ-20 דקות. </p></span>',

        '<span dir="rtl" lang="he"><p> החלק העיקרי של הניסוי יהיה מטלת הזיכרון שמחולקת לשני שלבים, שכל אחד מהם מכיל שני בלוקים. </p></span>',

        '<span dir="rtl" lang="he"><p> בתחילת כל בלוק של מטלת הזיכרון, אתם תלמדו רשימת מילים בעברית. נקרא לשלב זה <b>שלב הלמידה</b>. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' + 
        '<span dir="rtl" lang="he"><p>במהלך שלב הלמידה, תוצג רשימת לכם רשימת מילים. בכל פעם תוצג מילה אחת למשך שניה. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> המטרה שלכם היא לשנן את המילים האלו. הזיכרון שלכם ייבחן לאחר מכן <b>בשלב המבחן</b>. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> רוב המילים שיוצגו לכם הן מילים אמיתיות בעברית כמו <b>נמר</b> ו-<b>כיסא</b>. אך מדי פעם יוצגו לכם מילים לא אמיתיות כמו <b>חיגם</b> או <b>קלז</b> </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> מילים אלו אולי יראו כמו מילים אמיתיות אבל הן אינן חלק מהשפה העברית. כשמילה לא אמיתית מופיעה עליכם <u>ללחוץ על מקש הרווח</u>.</p></span>' +

        '<span dir="rtl" lang="he"><p><br> <b>אינכם צריכים לשנן מילים לא אמיתיות.</b></p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> כדי לוודא שהמטלה ברורה, נבצע תרגול קצר של שלב הלמידה.</p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> <u>שימו לב:</u> <br></p></span>'+
        '<span dir="rtl" lang="he"><p> יש לשנן את כל המילים בעברית, ועבורן אין צורך ללחוץ על אף מקש במקלדת. <br> </p></span>'+
        '<span dir="rtl" lang="he"><p> אל תנסו לשנן מילים לא אמיתיות. כשאתם רואים מילה לא אמיתית, לחצו על מקש הרווח.<br></p</span>'+
        '<span dir="rtl" lang="he"><p> לחצו על <bdi>&nbsp;next</bdi>או על מקש הרווח כדי להתחיל את התרגול.</p></span>',

    ],
    show_clickable_nav: true,
    key_forward: 'space'
};

export var choice_test_phase_instructions_yes_no = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> מעולה! כעת השלמת את התרגול של שלב הלמידה. </p></span>' +
        '<span dir="rtl" lang="he"><p> עכשיו תתחילו את <b>שלב המבחן</b> בו תיבחנו על המילים שלמדתם. </p></span>',
        //Now you will start the <b>test phase</b> in which you will be tested on the words you have learned.
        '<span dir="rtl" lang="he"><h2> שלב המבחן </h2></span>' +  
        '<span dir="rtl" lang="he"><p> בכל מקטע בשלב המבחן, תוצג לכם מילה אחת. </p></span>'+
        //In each trial of the test phase, you will see one word.
        '<span dir="rtl" lang="he"><p>עבור כל מילה, עליכם להחליט האם היא הופיעה בשלב הלמידה הקודם (כלומר, המילה ׳ישנה׳) או שהיא לא הופיעה בשלב הלמידה הקודם (כלומר, המילה ׳חדשה׳). </p></span>',
//For each word, we ask you to decide whether the word had appeared in the preceding study phase (the word is ’old’) or had not appeared in the preceding list (the word is ’new’).
        `<span dir="rtl" lang="he"><p> כך נראה מקטע בשלב המבחן: </p></span>` +
        `<img src='${getTestPhaseImage()}' width=720 height=308></img>`,
        
        getKeyboardExampleImage()+
        getKeyboardExampleText()+
        `<span dir="rtl" lang="he"><p> כעת נתרגל את שלב המבחן. </p></span>`,
    ],
    show_clickable_nav: true,
    key_forward: 'space'
}

export var confidence_test_phase_instructions = {
    type : 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> יפה מאוד! תרגלתם את שלב המבחן. </p></span>' +
        '<span dir="rtl" lang="he"><p> אחרי שהחלטתם איזו מילה הופיעה בשלב הלמידה, אתם תישאלו על רמת הביטחון שלכם בהחלטה שלכם. </p></span>',
//Following your decision about which of the words was presented before, you will be asked to rate the level of confidence in your decision.
        '<span dir="rtl" lang="he"><h2> דירוג רמת הביטחון <br><br><br><br></h2></span>' +
        "<br><br><br><img src='images/scale_example.png' width=456 height=552></img>"+
        "<span dir='rtl' lang=he'><p> דירוג רמת הביטחון נע בין ׳50% - ניחוש׳ לבין ׳100% - ביטחון מלא׳. עליכם לדרג את רמת הביטחון שלכם בהחלטה באמצעות העכבר. </p></span>" +
        //The confidence scale ranges from ‘50% - Guess’ to ‘100% - Certain’. You should rate your confidence in the slider using your mouse.
        "<span dir='rtl' lang=he'><p> עכשיו בואו נתאמן על שלב המבחן יחד עם דירוג רמת הביטחון. </p></span>",
        
    ],
    show_clickable_nav: true,
    key_forward: 'space'
}

export var fund_test_phase_instructions = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> מצוין! תרגלתם את שלב המבחן יחד עם דירוג רמת הביטחון. </p></span>' +
        //Great! Now you have practiced the test phase with the confidence ratings.
        '<span dir="rtl" lang="he"><p> כעת נסתכל על ההחלטה האחרונה בכל מקטע במטלת הזיכרון. </p></span>',

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> כדי לשמור על המוטיבציה שלכם אנחנו מציעים לכם בונוס של עד 6 שקלים שיחושב על בסיס קופת הפרס שלכם. </p></span>" +
        //To keep you motivated we offer a bonus of up to 1.5 pounds that will be calculated based on your prize fund.
        "<span dir='rtl' lang=he'><p> בכל מקטע בשלב המבחן, אחרי דירוג רמת הביטחון, אתם תתבקשו להחליט האם אתם רוצים להמיר את החלטתכם במקטע זה לנקודות ולהוסיף אותם לקופת הפרס או שאתם רוצים לדלג על המרת ההחלטה לנקודות. </p></span>",
       //On each trial of the test phase, following your confidence rating, you will make a decision of whether you want to convert your memory decision from this trial into points or if you prefer to skip.
        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p>בתחילת הניסוי יהיו לכם 0 נקודות בקופת הפרס. </p></span>" +
        "<span dir='rtl' lang=he'><p> אם אתם מחליטים להמיר את ההחלטה שלכם לנקודות ולהוסיף אותם לקופת הפרס וצדקתם בהחלטתכם בשלב המבחן <b>אתם תרוויחו נקודה אחת</b>. </p></span>" +
        //If you decide to convert your decision to points and add them to the prize fund and you made a correct decision <b>you will earn 1 point.</b>
        "<span dir='rtl' lang=he'><p> אם אתם מחליטים להמיר את ההחלטה שלכם לנקודות ולהוסיף אותם לקופת הפרס וטעיתם בהחלטתכם בשלב המבחן <b>אתם תאבדו ארבע נקודות</b>. </p></span>",
        //If you decide to convert your decision to points and add them to the fund and you made an incorrect decision <b>you will lose 4 points.</b>
        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> הסיבה לעונש הגבוה במקרה של המרת ההחלטה לנקודות כשטעיתם בשלב המבחן (מינוס ארבע נקודות) לעומת הפרס במקרה של המרת ההחלטה לנקודות כשצדקתם בשלב המבחן (פלוס נקודה אחת) היא בשל כך שיש 50% סיכוי לנחש תשובה נכונה. כמות הנקודות בקופת הפרס לא יכולה לרדת מתחת ל-0. </p></span>",
        //The higher penalty for an incorrect decision (-4 points) compared to reward for correct decision (+1 point) is due to the 50% chance of guessing a correct answer. Points cannot go below 0.

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p><b> בסוף הניסוי, תקבלו תגמול כספי בהתאם לסך הנקודות שבקופת הפרס שלכם. </b></p></span>" +
        //At the end of the experiment, you will receive a monetary reward proportional to the total of points in your prize fund.
        "<span dir='rtl' lang=he'><p> לכל 6 נקודות אתם תקבלו 20 אגורות. הפרס המקסימלי הוא 6 שקלים. </p></span>" +
        //For every 6 points you will get 5 pence. Maximum reward is 1.5 pounds.
        "<span dir='rtl' lang=he'><p> אתם יכולים גם לבחור לדלג על ההמרה של ההחלטה לנקודות. דילוג על ההמרה לא יוסיף או יגרע נקודות מקופת הפרס שלכם. </p></span>",
        //You can also choose to skip and not convert your decision to points. This will neither add to nor detract points from your fund.
        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> כדי לוודא הבנה, בואו נסתכל על הדוגמה הבאה. </p></span>",
        //To ensure a good comprehension of the prize fund, let’s take a look at the following example.

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> דני, משתתפת בניסוי, ראתה את המילה ׳ציפור׳ בשלב המבחן, והייתה מאוד בטוחה שהמילה ׳ציפור׳ הופיעה בשלב הלמידה הקודם. היא גם דירגה את רמת הביטחון שלה עם הדירוג הכי גבוה בדירוג רמת הביטחון. </p></span>" +
        //Dani, a participant in this experiment, saw the word ‘bird’ in the test phase, and was very  certain that the word ‘bird’ appeared in the preceding learning phase. She also rated her decision with the highest confidence in the scale.
        "<img src='images/Dani.png' width=185 height=201></img>",

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> בחלק של קופת הפרס, דני בחרה להמיר את ההחלטה שלה לנקודות ולהוסיף אותם לקופת הפרס.  </p></span>" +
        //In the following prize-fund decision, Dani decided to convert her decision into points and add it to the prize fund.
        "<img src='images/fund_add_to_fund_exaple.png' width=775 height=201></img>"+
        "<span dir='rtl' lang=he'><p><b> מאחר שהיא צדקה בהחלטתה בשלב המבחן, היא קיבלה נקודה אחת לקופת הפרס שלה. </b></p></span>",
        //Since her memory decision was correct, she got 1 point to her prize fund.

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> במקטע הבא, דני בחרה להמיר החלטה נוספת שלה לנקודות ולהוסיף אותן לקופת הפרס שלה, אבל הפעם היא טעתה בהחלטתה בשלב המבחן. </p></span>" +
        //On a subsequent trial, Dani decided to add another answer to her prize fund, but this time her decision in the memory test was wrong.
        "<img src='images/fund_add_to_fund_exaple.png' width=775 height=201></img>"+
        "<span dir='rtl' lang=he'><p><b> מאחר והיא טעתה בהחלטתה בשלב המבחן היא איבדה 4 נקודות מקופת הפרס שלה. </b></p></span>",
        //Since her memory decision was wrong, she lost 4 point from her prize fund.

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p> לבסוף, במקטע אחר, דני לא הייתה בטוחה בנוגע להחלטתה בשלב המבחן, אז היא בחרה לדלג על המרת ההחלטה לנקודות. </p></span>" +
        //Lastly, in a different trial, Dani wasn’t very certain in her answer, so she chose to skip this trial.
        "<img src='images/fund_skip_example.png' width=775 height=201></img>"+
        "<span dir='rtl' lang=he'><p><b> מאחר והיא בחרה לדלג על ההמרה, שום נקודה לא התווספה או נגרעה מקופת הפרס של דני. </b></p></span>",
        //Since her decision was to skip this trial, point were not added or retracted from Dani’s prize fund.
    ],
    show_clickable_nav: true,
    key_forward: 'space'
}
export var fund_test_phase_start_practice = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> מצוין! עכשיו נוכל להתאמן על שלב המבחן יחד עם דירוג רמת הביטחון והחלטת קופת הפרס. </p></span>',
        //Excellent! Now we can practice the entire test phase along with confidence rating and prize fund decision.
    ],
    show_clickable_nav: true,
    key_forward: 'space'
}
export var fund_test_phase_end_practice = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> יפה מאוד! סיימתם את האימון.</p></span>' +
        '<span dir="rtl" lang="he"><p> עכשיו כשאתם מבינים את מהלך הניסוי, נוכל להתחיל בניסוי. </p></span>' +
        '<span dir="rtl" lang="he"><p> זכרו: נסו לזכור את המילים האמיתיות באופן הטוב ביותר ולחצו על מקש הרווח כשמילה לא אמיתית מופיעה. </p></span>' +
        '<span dir="rtl" lang="he"><p> לחצו על מקש הרווח כדי להתחיל את הניסוי :) </p></span>',
    ],
    show_clickable_nav: true,
    key_forward: 'space'
}

export var second_task_instructions_yes_no = {
    type : 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> החלק הבא של מטלת הזיכרון דומה למה שראיתם עד כה, אבל עם הבדל אחד. בשלב המבחן, במקום לראות שתי מילים בכל פעם ולהחליט מי מהן הופיעה בעבר, אתם תראו מילה אחת בלבד, ואתם תידרשו להחליט האם המילה הופיעה בעבר או לא. </p></span>',
//The next part of the memory task is similar to what you have seen so far, with one exception. In the test phase, instead of seeing two words at a time and deciding which of the two was presented before, you will only see one word, and will be asked to decide whether it has been presented before or not.
        '<span dir="rtl" lang="he"><p> עבור כל מילה, עליכם להחליט האם המילה הופיעה בשלב הלמידה הקודם (המילה ׳ישנה׳) או לא הופיעה בשלב הלמידה הקודם (המילה ׳חדשה׳). </p></span>',
//For each word, we ask you to decide whether the word had appeared in the preceding study phase (the word is ’old’) or had not appeared in the preceding list (the word is ’new’).
        `<span dir="rtl" lang="he"><p> כך נראה מקטע בשלב המבחן: </p></span>` +
        `<img src='${getTestPhaseImage()}' width=720 height=308></img>`,
        
        getKeyboardExampleImage()+
        getKeyboardExampleText()+

        "<span dir='rtl' lang=he'><p> לפני שנתחיל, בואו נתאמן. </p></span>"+
        "<span dir='rtl' lang=he'><p> כמו קודם, אתם תתחילו בצפייה ברשימת המילים שתצטרכו לזכור בבלוק הקרוב. גם כאן, עליכם ללחוץ על מקש הרווח ברגע שמילה לא אמיתית מופיעה. </p></span>"+
        //As before, you would start by seeing a list of words you need to remember. Here too, you are asked to press the spacebar once a non-word appears.
        "<span dir='rtl' lang=he'><p> לחצו על מקש הרווח כדי להתחיל את שלב הלמידה. </p></span>",
    ],
    show_clickable_nav: true,
    key_forward: 'space'

};

export var second_task_choice_practice_instructions_yes_no = {
    type: "html-keyboard-response",
    stimulus: "<span dir='rtl' lang=he'><p> נהדר, סיימתם את שלב הלמידה. כעת בואו נתאמן על מקטעים משלב המבחן החדש. </p></span>" +
    //Great you have finished the learning phase. Now let’s practice a few trials of the new test phase. 
    "<br>" ,
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להתחיל. </p></span>",
    post_trial_gap: 1000,
    on_finish: function () {
        countToFB = 1;
    }
}
export var second_task_confidence_and_fund_practice_instructions_yes_no = {
    type: "html-keyboard-response",
    stimulus: "<span dir='rtl' lang=he'><p> יפה מאוד! אחרי שהתנסתם בשלב המבחן החדש בואו נתאמן על עוד כמה מקטעים. הפעם עם דירוג רמת הביטחון והחלטת קופת הפרס. </p></span>" +
    //Good job! After you have been familiarized with the new test phase let’s practice a few more trials. This time with confidence ratings and prize-fund decision. 
    "<br>" ,
    prompt: "",
    post_trial_gap: 1000,
    on_finish: function () {
        countToFB = 1;
    }
}

export var second_phase_end_practice = {
    type: "html-keyboard-response",
    stimulus: "<span dir='rtl' lang=he'><p> מעולה! סיימתם את שלב האימון! </p></span>" +
    "<span dir='rtl' lang=he'><p> עכשיו כשאתם מבינים את המטלה, נוכל להתחיל בניסוי. </p></span>" +
    "<span dir='rtl' lang=he'><p> זכרו: נסו לזכור את המילים האמיתיות באופן הטוב ביותר ולחצו על מקש הרווח כשמילה לא אמיתית מופיעה.</p></span>" +
    "<span dir='rtl' lang=he'><p> לחצו על כל מקש כדי להתחיל. </p></span>" +
    "<br>" ,
    prompt: "",
    post_trial_gap: 1000,
    on_finish: function () {
        countToFB = 1;
    }
}
export var instructions_2afc = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p>  ברוכים הבאים לניסוי! לחצו על <bdi>&nbsp;next</bdi>או על מקש הרווח כדי להתקדם למסך הבא  </p></span>',

        '<span dir="rtl" lang="he"><p> הניסוי מורכב משני חלקים: מטלת זיכרון וסדרת שאלות כלליות על חוויות יומיומיות. ביצוע הניסוי לוקח כ-20 דקות. </p></span>',

        '<span dir="rtl" lang="he"><p> החלק העיקרי של הניסוי יכלול מטלת זיכרון שמחולקת לשני חלקים, שכל אחד מהם מחולק לשני בלוקים. </p></span>',

        '<span dir="rtl" lang="he"><p> בתחילת כל בלוק, אתם תלמדו רשימה של מילים בעברית. נקרא לשלב זה <b>שלב הלמידה</b>. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' + 
        '<span dir="rtl" lang="he"><p>  במהלך שלב הלמידה, תוצג רשימת לכם רשימת מילים. בכל פעם תוצג מילה אחת למשך שניה. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> המטרה שלכם היא לשנן את המילים האלו. הזיכרון שלכם ייבחן לאחר מכן <b>בשלב המבחן</b>. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> רוב המילים שיוצגו לכם הן מילים אמיתיות בעברית כמו <b>נמר</b> ו-<b>כיסא</b>. אך מדי פעם יוצגו לכם מילים לא אמיתיות כמו <b>חיגם</b> או <b>קלז</b>. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> מילים אלו אולי יראו כמו מילים אמיתיות אבל הן אינן חלק מהשפה העברית. כשמילה לא אמיתית מופיעה עליכם <u>ללחוץ על מקש הרווח</u>.</p></span>' +

        '<span dir="rtl" lang="he"><p><br> <b>אינכם צריכים לשנן מילים לא אמיתיות.</b></p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> כדי לוודא שהמטלה ברורה, נבצע תרגול קצר של שלב הלמידה.</p></span>',

        '<span dir="rtl" lang="he"><h2> שלב הלמידה </h2></span>' +  
        '<span dir="rtl" lang="he"><p> <u>שימו לב:</u> <br></p></span>'+
        '<span dir="rtl" lang="he"><p> יש לשנן את כל המילים בעברית, ועבורן אין צורך ללחוץ על אף מקש במקלדת. <br> </p></span>'+
        '<span dir="rtl" lang="he"><p> אל תנסו לשנן מילים לא אמיתיות. כשאתם רואים מילה לא אמיתית, לחצו על מקש הרווח.<br></p</span>'+
        '<span dir="rtl" lang="he"><p> לחצו על <bdi>&nbsp;next</bdi>או על מקש הרווח כדי להתחיל את התרגול.</p></span>',
    ],
    show_clickable_nav: true,
    key_forward: 'space'
};


export var choice_test_phase_instructions_2afc = {
    type: 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><p> מעולה! כעת השלמת את התרגול של שלב הלמידה. </p></span>' +
        '<span dir="rtl" lang="he"><p> עכשיו תתחילו את <b>שלב המבחן</b> בו תיבחנו על המילים שלמדתם. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב המבחן </h2></span>' +  
        '<span dir="rtl" lang="he"><p> בכל מקטע בשלב המבחן, תראו שתי מילים. אחת מהמילים הוצגה בשלב הלמידה הוקדם והשניה לא. המטרה שלכם היא להחליט מי המילים הופיעה בשלב הלמידה הקודם. </p></span>'+
        '<span dir="rtl" lang="he"><p> יכולה להיות רק תשובה נכונה אחת. </p></span>',

        `<span dir="rtl" lang="he"><p> כך נראה מקטע בשלב המבחן: </p></span>` +
        `<img src='images/2afc_choice_test_example.png' width=720 height=308></img>`,
        
        `<img src='images/Keyboad_2afc_example.png' width=930 height=374></img>`+
        `<span dir="rtl" lang="he"><p> אנא בצעו את החלטתכם באמצעות החצים: <br>
        לחצו <bdi>&nbsp;A</bdi>כדי לבחור במילה בצד שמאל 
        ולחצו <bdi>&nbsp;D</bdi>כדי לבחור במילה בד ימין
        </p></span>` +
        '<span dir="rtl" lang="he"><p> בואו נתרגל את שלב המבחן. </p></span>',
    ],
    show_clickable_nav: true,
    key_forward: 'space'
}

export var second_task_instructions_2afc = {
    type : 'instructions',
    pages: [
        '<span dir="rtl" lang="he"><h2> הוראות </h2></span>' + 
        '<span dir="rtl" lang="he"><p> אתם עומדים להתחיל את החלק הבא בניסוי. כמו קודם, כל מטלת זיכרון תכלול שלב למידה ושלב מבחן. </p></span>',

        '<span dir="rtl" lang="he"><h2> שלב המבחן </h2></span>' +  
        "<span dir='rtl' lang=he'><p> הפעם, יוצגו לכם <b>שתי</b> מילים בכל פעם. עבור כל זוג מילים עליכם להחליט מי מהן הופיעה בשלב הלמידה הקודם (המילה היא ׳ישנה׳). </p></span>"+
        "<span dir='rtl' lang=he'><p> עבור כל זוג, מילה אחת הופיעה בשלב הלמידה הקודם והשניה לא, אז יכולה להיות רק תשובה נכונה אחת. </p></span>" +
        "<img src='images/2afc_choice_test_example.png' width=720 height=308></img>",
        
        '<span dir="rtl" lang="he"><h2> שלב המבחן </h2></span>' +  
        "<img src='images/2afc_choice_test_example.png' width=720 height=308></img>"+
        '<span dir="rtl" lang="he"><p> אנא בצעו את החלטתכם באמצעות מקשי המקלדת, כפי שניתן לראות בתמונה. </p></span>',
        
        '<span dir="rtl" lang="he"><h2> דירוג רמת ביטחון<br><br><br><br> </h2></span>' +
        "<img src='images/scale_example.png' width=380 height=460></img>"+
        "<span dir='rtl' lang=he'><p> אחרי ההחלטה שלכם בנוגע לאיזו מילה הופיעה קודם, אתם תתבקשו לדרג את רמת הביטחון שלכם בהחלטה. </p></span>",
        
        '<span dir="rtl" lang="he"><h2> דירוג רמת הביטחון </h2></span>' +
        "<span dir='rtl' lang=he'><p>דירוג רמת הביטחון נע בין ׳50% - ניחוש׳ לבין ׳100% - ביטחון מלא׳. עליכם לדרג את רמת הביטחון שלכם בהחלטה באמצעות העכבר.</p></span>",  

        '<span dir="rtl" lang="he"><h2> קופת הפרס </h2></span>' +
        "<span dir='rtl' lang=he'><p>אתם יכולים לבחור להמיר את ההחלטה שלכם לנקודות ולהוסיף אותם לקופת הפרס.</p></span>" +
        "<span dir='rtl' lang=he'><p> אם אתם מחליטים להמיר את ההחלטה שלכם לנקודות ולהוסיף אותם לקופת הפרס וצדקתם בהחלטתכם בשלב המבחן <b>אתם תרוויחו נקודה אחת</b>. </p></span>" +
        "<span dir='rtl' lang=he'><p> אם אתם מחליטים להמיר את ההחלטה שלכם לנקודות ולהוסיף אותם לקופת הפרס וטעיתם בהחלטתכם בשלב המבחן <b>אתם תאבדו ארבע נקודות</b>. </p></span>",
        "<span dir='rtl' lang=he'><p>הסיבה לעונש הגבוה במקרה של המרת ההחלטה לנקודות כשטעיתם בשלב המבחן (מינוס ארבע נקודות) לעומת הפרס במקרה של המרת ההחלטה לנקודות כשצדקתם בשלב המבחן (פלוס נקודה אחת) היא בשל כך שיש 50% סיכוי לנחש תשובה נכונה. (סך הנקודות בקופת הפרס לא יכול לרדת מתחת ל-0).</p></span>" +
        "<span dir='rtl' lang=he'><p> אתם יכולים גם לבחור לדלג על ההמרה של ההחלטה לנקודות. דילוג על ההמרה לא יוסיף או יגרע נקודות מקופת הפרס שלכם.</p></span>" +
        "<span dir='rtl' lang=he'><p><b> בסוף הניסוי, תקבלו תגמול כספי בהתאם לסך הנקודות שבקופת הפרס שלכם..</b></p></span>",

        '<span dir="rtl" lang="he"><h2> עוד קצת... </h2></span>' + 
        "<span dir='rtl' lang=he'><p> כדי לוודא הבנה, נעשה תרגול קצר של שלבי הלמידה והמבחן. זו הדגמה, <u>לא הניסוי עצמו</u>. </p></span>" +
        '<br>' +
        "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על <bdi>&nbsp;next</bdi>או על מקש הרווח כדי להתחיל את התרגול. </p></span>",
    ],
    show_clickable_nav: true,
    key_forward: 'space'
};


/* Creating the initial window of each block (before study phase) */
var init_study_practice_start = {
    type: "html-keyboard-response",
    stimulus: 
    "<span dir='rtl' lang=he'><p> לחצו על כל מקש כדי להתחיל את <b>האימון</b> של שלב הלמידה. </p></span>" +
    "<span dir='rtl' lang=he'><p> זכרו: נסו לזכור את המילים האמיתיות באופן הטוב ביותר ולחצו על מקש הרווח כשמילה לא אמיתית מופיעה. </p></span>" +
    "<br>" + "<br>",
    //prompt: "<p style=font-size:25px> Press any key to begin </p>",
    post_trial_gap: 1000,
};

var init_study_1 = {
    type: "html-keyboard-response",
    stimulus: "<span dir='rtl' lang=he'><h2> מטלת זיכרון חדשה </h2></span>" +
    "<span dir='rtl' lang=he'><p> אתם עומדים להתחיל מטלת זיכרון חדשה שכוללת שלבי למידה ומבחן חדשים. </p></span>" +
    "<span dir='rtl' lang=he'><p> זכרו: נסו לזכור את המילים האמיתיות באופן הטוב ביותר ולחצו על מקש הרווח כשמילה לא אמיתית מופיעה. </p></span>"+ 
    "<br>",
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להתחיל את הניסוי :) </p></span>",
    post_trial_gap: 1000,
    on_finish: function () {
        countToFB = 1;
    }
};


/* Creating the initial window of each test phase, also to inform the participant of the implied base rate */
var init_test_practice = {
    type: "html-keyboard-response",
    stimulus:"<span dir='rtl' lang=he'><p> מעולה! תרגלתם את שלב הלמידה. <br> עכשיו תתחילו את <b>שלב המבחן</b> בו אתם תיבחנו על המילים שלמדתם. <br>לחצו על מקש הרווח כדי להמשיך. </p></span>" +
    "<br>" + "<br>",
    prompt: "",
    post_trial_gap: 1000,
    show_clickable_nav: true
};
var init_test = {
    type: "html-keyboard-response",
    stimulus:"<span dir='rtl' lang=he'><p> סיימתם את שלב הלמידה! עכשיו, תתחילו את שלב המבחן. </p></span>",
    prompt: "<br>"+"<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להתחיל </p></span>",
    post_trial_gap: 1000
};


// Creating the final window of the first block, to separate between Block1 and Block2
var end_test = {
    type: "html-keyboard-response",
    stimulus: "<span dir='rtl' lang=he'><h2> מעולה! </h2></span>" +
    "<span dir='rtl' lang=he'><p> סיימתם את מטלת הזיכרון הראשונה. </p></span>" +
    "<span dir='rtl' lang=he'><p> אם אתם צריכים, אתם יכולים לעשות הפסקה קצרה (אך חשוב שתשאירו את חלון הניסוי פתוח). <p></span>" +
    "<br>",
    prompt: "<span dir='rtl' lang=he'><p style=font-size:25px> לחצו על כל מקש כדי להתקדם למטלת הזיכרון הבאה. </p></span>",
    post_trial_gap: 1000,
};

export {init_study_practice_start, init_study_1, init_test_practice, init_test, end_test};