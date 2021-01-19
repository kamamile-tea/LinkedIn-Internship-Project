function onOpen() {
  ui.createMenu('Search for Inclusive Words')
    .addItem('Search and Replace', 'checkWords')
    .addToUi();
}

var ui = SlidesApp.getUi();

function isWordOnAnySlide(wordToMatch, slides) {
   var wordFound;
   slides.forEach(function(slide){
    if (wordFound) {
      return;
    }
    shapes = slide.getShapes();
    shapes.forEach(function(shape){
      var rangeA = shape.getText();
      var value = rangeA.asString();
      var valueLowerCase = value.toLowerCase(); 
      if (valueLowerCase !== null && valueLowerCase.length != 1){
        var stringToMatch = new RegExp(wordToMatch, 'g');
        var matches = valueLowerCase.match(stringToMatch);
        Logger.log("matches if any found: " + matches);
        if (matches != null){
          Logger.log("Match found, returning true");
          wordFound = true;
        }
      }
    })
   })
   return wordFound;
}

function checkWords() {
  
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  var result = isWordOnAnySlide("blacklist", slides);
  Logger.log("Match found after call "+ result);
  if (result) {
    var response = ui.alert('Problematic Word Found','Click YES to replace "blacklist" with "denylist"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("blacklist", "denylist", false);
    }
}
  if(isWordOnAnySlide("whitelist", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "whitelist" with "acceptlist"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("whitelist", "acceptlist", false);
    }
  }
  if(isWordOnAnySlide("slave", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "slave" with "follower"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("slave", "follower", false);
    }
  }
  if(isWordOnAnySlide("multi master", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "multi master" with "active"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("multi master", "active", false);
    }
  }
  if(isWordOnAnySlide("single master", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "single master" with "active"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("single master", "single active", false);
    }
  }
  if(isWordOnAnySlide("master branch", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "master branch" with "main"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("master branch", "main", false);
    }
  }
  if(isWordOnAnySlide("master", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "master" with "primary"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("master", "primary", false);
    }
  }
  // var masterMatches = valueLowerCase.match(/master/g);
        // if(masterMatches != null && wordAfterMatch != "branch"){
        //   var response = ui.alert('Problematic Word Found','Click YES to replace "master" with "primary"', 
        //   ui.ButtonSet.  YES_NO);
        //   if (response == ui.Button.YES){
        //   presentation.replaceAllText("master", "primary", false);
        //   }
        // }
  if(isWordOnAnySlide("redliner", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "redliner" with "dyno"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("redliner", "dyno", false);
    }
  }
  if(isWordOnAnySlide("ghetto", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "ghetto" with "low-quality"', ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("ghetto", "low-quality", false);
    }
  }
  if(isWordOnAnySlide("grandfathering", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "grandfathering" with "legacy"', ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("grandfathering", "legacy", false);
    }
  }
}
