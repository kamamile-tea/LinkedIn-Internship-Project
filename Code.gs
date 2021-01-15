function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createMenu('Search for Inclusive Words')
    .addItem('Search and Replace', 'checkWords')
    .addToUi();
}

var ui = SlidesApp.getUi();



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

      var blacklistMatches = valueLowerCase.match(/blacklist/g); //all matches in it
      var whitelistMatches = valueLowerCase.match(/whitelist/g);
      var masterMatches = valueLowerCase.match(/master/g);
      var slaveMatches = valueLowerCase.match(/slave/g);
      var multiMasterMatches = valueLowerCase.match(/multimaster/g);
      var singleMasterMatches = valueLowerCase.match(/singlemaster/g);
      var masterBrandMatches = valueLowerCase.match(/masterBrand/g);
      var redlinerMatches = valueLowerCase.match(/redliner/g);
      var hangmanMatches = valueLowerCase.match(/hangman/g);
      var ghettoMatches = valueLowerCase.match(/ghetto/g);
      var grandfatheringMatches = valueLowerCase.match(/grandfathering/g);

      findMatches();


      function findMatches(){
        if (blacklistMatches != 0 || whitelistMatches != 0 || masterMatches != 0 || slaveMatches != 0 || multiMasterMatches !=0 || singleMasterMatches != 0 || masterBrandMatches !=0 || redlinerMatches !=0 || hangmanMatches !=0 || ghettoMatches != 0 || grandfatheringMatches != 0){
          problematicWordsExist = true;
        }
      }
      

      switch (problematicWordsExist = true){
        case (blacklistMatches.length !=0):
          presentation.replaceAllText("blacklist", "denylist", false);
        case (whitelistMatches.length !=0):
        presentation.replaceAllText("whitelist", "acceptlist", false);
        case (masterMatches.length !=0):
          presentation.replaceAllText("master", "top", false);
        case (slaveMatches.length !=0):
          presentation.replaceAllText("slave", "secondary", false);
        case (multiMasterMatches !=0):
          presentation.replaceAllText("multimaster", "manymastenary", false);
      }

      // if (blacklistMatches.length != 0){
      //   var problematicWordsExist = true;
      //   var problemWord = "blacklist";
      //   var replacement = "denylist";
      //   startReplacement(problemWord, replacement);
      // }else if (whitelistMatches.length !=0)
    })
  })
}
