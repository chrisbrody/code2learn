var data = {
  "levels" : [
    {
      "id" : 1,
      "text" : "<!doctype html>"
    },
    {
      "id" : 2,
      "text" : '<html lang="en">'
    },
    {
      "id" : 3,
      "text" : "<head>"
    },
    {
      "id" : 4,
      "text" : '<meta charset="utf-8">'
    },
    {
      "id" : 5,
      "text" : "<title>Title</title>"
    },
    {
      "id" : 6,
      "text" : '<link rel="stylesheet" href="css/main.css">'
    },
    {
      "id" : 7,
      "text" : "</head>"
    },
    {
      "id" : 8,
      "text" : "<body>"
    },
    {
      "id" : 9,
      "text" : "<h1>Heading</h1>"
    },
    {
      "id" : 10,
      "text" : "<p>Paragraph</p>"
    },
    {
      "id" : 11,
      "text" : "</body>"
    },
    {
      "id" : 12,
      "text" : "</html>"
    }
  ]
};

(function () {
  //  Selecting DOM objs fro HTML - user input / results / level text / cta - next button / level coutner
  var $input = $(".user-input"),            // textarea for user to type into
      $results = $(".results"),             // area to display the users results 
      $copyText = $(".copy-text"),          // characters the user needs to type
      $resultsHeader = $(".results-header"),// display pass or fail
      $cta = $(".cta"),                     // button for the user to do more
      $levelCounter = $(".level-counter");  // display what level the user is on
  
  // static variables we will need to track
  var charCounter,
      copyText,
      fail,
      levelCounter = 1,
      levels = data.levels,
      level;
  
  // START THE GAME 
  loadLevel();
    
  // ON EACH KEYPRESS, DO ALL OF THIS
  $input.on("keypress", function (e) {
    
    // CHECK IF THE USER HAS FAILED, SO IF THEY HAVE WE DONT NEED TO RUN THE CODE, WE WAIT FOR THEM TO REST
    if ( !fail ) {
      // STORE THE CHARACTER PRESSED
      var charCode = e.charCode;
      // APPEND THIS CHAR TO THE USER STRING
      $results.append(String.fromCharCode(charCode));
      // STORE THE USER STRING
      var resultsText = $results.text();
     
      // IF THE CHARACTER ADDED IS CORRECT
      if ( resultsText === copyText.slice(0, resultsText.length)) {
        // ADD A CLASS TO .results
        $results.addClass("pending");
      } else { 
        fail = true;
        $resultsHeader.text("Fail.");
        $cta.html("Start again?").show();
        $results.removeClass("pending").addClass("fail");
        levelCounter = 1;
      }
      // CHECK IF THE LEVEL HAS BEEN COMPLETED
      if ( $results.text().length >= copyText.length ) {
        // ADD TEXT TO .results-header
        $resultsHeader.text("Congrats");
        // REMOVE CLASS .pending & ADD CLASS .done
        $results.removeClass("pending").addClass("done");
        
        // IF THE GAME IS COMPLETED, END THE GAME
        if ( levels.length <= levelCounter ) {
          // ADD COMPLETED GAME TEXT
          $(".sub-header, .user-input, .panel.callout, .main-header").hide()
          $resultsHeader.html("<div><h1>Congratulations!</h1><p>You've completed this challenges. You successfully coded the base code needed to build any website.</p><img height='500px' width='500px' src='code.png'></div>").show();
          // RESET THE LEVEL COUNTER TO 1
          levelCounter = 1;
        } else { // IF THE LEVEL WAS COMPLETED BUT THE GAME WAS NOT, GO TO NEXT LEVEL
          // ADD TEXT TO CTA BUTTON AND DISPLAY IT
          $cta.html("Next level.").show();
          // ADD 1 TO levelCounter
          levelCounter += 1;
        }
      }
    }
  });
  
  // ON BUTTON CLICK, START THE NEXT LEVEL
  $cta.on("click", loadLevel);
  
  // FUNCTION TO LOAD A LEVEL
  function loadLevel () {
    // UPDATE THE CURRENT LEVEL
    level = levels[levelCounter - 1];

    // CALL RESET FUNCTION
    reset();
  }
  
  // FUNCTION TO RESET THE GAME
  function reset () {
    // UPDATE ELEMENTS
    $cta.hide();
    // CLEAR ANY USER INPUT VALUES
    $input.val("").focus();
    // CLEAR ANY RESULTS TEXT AND REMOVE CLASSES
    $results.html("").removeClass("pending fail done");
    // CLEAR OUT ANY HEADER TEXT
    $resultsHeader.html("");
    // RESET LEVEL COUNTER
    $levelCounter.text("(Level " + level.id + ")");

    // RESET VARIABLES
    copyText = level.text;
    fail = false;
    // RESET TEST TEXT
    $copyText.text(copyText);
  }
}());