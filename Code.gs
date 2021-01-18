function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createMenu('Search for Inclusive Words')
    .addItem('Search and Replace', 'checkWords')
    .addToUi();
}

var ui = SlidesApp.getUi();


// function replaceBlacklist(){
//   var presentation = SlidesApp.getActivePresentation();
//   var slides = presentation.getSlides()
//   presentation.replaceAllText("blacklist", "denylist", false);
// }

function replaceWhitelist(){
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides()
  presentation.replaceAllText("whitelist", "acceptlist", false);
}

function checkWords(){
  
  var problematicWordsExist = false;
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  slides.forEach(function(slide){
    shapes = slide.getShapes();
    shapes.forEach(function(shape){
      var rangeA = shape.getText();
      var value = rangeA.asString();
      var valueLowerCase = value.toLowerCase(); 
      Logger.log("Text: " + valueLowerCase);
      Logger.log(valueLowerCase.length);
      Logger.log(typeof valueLowerCase);
      if (value !== null && value.length != 1){
        
        var blacklistMatches = valueLowerCase.match(/blacklist/g);
        var whitelistMatches = valueLowerCase.match(/whitelist/g);
        var masterMatches = valueLowerCase.match(/master/g);
        var slaveMatches = valueLowerCase.match(/slave/g);
        var multiMasterMatches = valueLowerCase.match(/multi master/g);
        var singleMasterMatches = valueLowerCase.match(/single master/g);
        var masterBranchMatches = valueLowerCase.match(/master branch/g);
        var redlinerMatches = valueLowerCase.match(/redliner/g);
        var hangmanMatches = valueLowerCase.match(/hangman/g);
        var ghettoMatches = valueLowerCase.match(/ghetto/g);
        var grandfatheringMatches = valueLowerCase.match(/grandfathering/g);

        // Logger.log("Whitelist: " + whitelistMatches.length);
        // Logger.log("Blacklist: " + blacklistMatches.length);
        if (blacklistMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "blacklist" with "denylist"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES) {
          presentation.replaceAllText("blacklist", "denylist", false);
          }
        }
        if(whitelistMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "whitelsit" with "acceptlist"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("whitelist", "acceptlist", false);
          }
        }
        if(slaveMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "slave" with "follower"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("slave", "follower", false);
          }
        }
        if(multiMasterMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "multi master" with "active"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("multi master", "active", false);
          }
        }
        if(singleMasterMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "single master" with "active"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("single master", "active", false);
            }
        }
        if(masterBranchMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "master branch" with "main"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("master branch", "main", false);
          }
        }
        if(masterMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "master" with "primary"', 
          ui.ButtonSet.  YES_NO);
          if (response == ui.Button.YES){
          presentation.replaceAllText("master", "primary", false);
          }
        }
        if(redlinerMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "redliner" with "dyno"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("redliner", "dyno", false);
          }
        }
        if(hangmanMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to delete "hangman"', ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
          //delete function
          presentation.replaceAllText("hangman", "snowman", false);
          }
        }
        if(ghettoMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "ghetto" with "low-quality"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("ghetto", "low-quality", false);
          }
        }
        if(grandfatheringMatches != null){
          var response = ui.alert('Problematic Word Found','Click YES to replace "grandfathering" with "legacy"', 
          ui.ButtonSet.YES_NO);
          if (response == ui.Button.YES){
            presentation.replaceAllText("grandfathering", "legacy", false);
          }
        }
      else{
        Logger.log("skipped");
      }
    }
    })
  })
}

      // if (Object.keys(whitelistMatches).length != 0){

    
      
      
      // findMatches();


      // function findMatches(){
        // //if (blacklistMatches != 0){
        //  // problematicWordsExist = true;
        //   Logger.log(blacklistMatches.length);
        //   Logger.log(problematicWordsExist);
      //  }
      // }
      
      //Switch function partly working
      // if (problematicWordsExist = true){

      //   switch (blacklistMatches){
      //     case (blacklistMatches.length !=0):
      //       presentation.replaceAllText("blacklist", "denylist", false);
      //     break;
      //   }
      // }
      // if (blacklistMatches.length != 0){
      //   var problematicWordsExist = true;
      //   var problemWord = "blacklist";
      //   var replacement = "denylist";
      //   startReplacement(problemWord, replacement);
      // }else if (whitelistMatches.length !=0)