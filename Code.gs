function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createMenu('Search for Inclusive Words')
    .addItem('Start', 'grabAllText')
    .addToUi();
}

function createSidebar(){

  //Creat Sidebar
  var html = HtmlService.createHtmlOutputFromFile('index');
  SlidesApp.getUi().showSidebar(html);


}

const blacklist = createWord('blacklist', 'Denylist', 'color reference');
const blacklists = createWord('blacklists', 'Denylists', 'color reference');

const whitelist = createWord('whitelist', 'Allowlist', 'color reference');
const whitelists = createWord('whitelists', 'Allowlists', 'color reference');

const master = createWord('master','Primary', 'color reference');
const masters = createWord('masters','Primaries', 'color reference');

const slave = createWord('slave','Secondary', 'color reference');
const slaves = createWord('slaves','Secondaries', 'color reference');

const multiMaster = createWord('multiMaster','Active', 'color reference');
const multiMasters = createWord('multiMasters','Actives', 'color reference');

const singleMaster = createWord('singleMaster','Single', 'color reference');
const singleMasters = createWord('singleMasters','Singles', 'color reference');

const masterBrand = createWord('masterBrand','Main', 'color reference');
const masterBrands = createWord('masterBrands','Mains', 'color reference');

const redliner = createWord('redliner','Dyno', 'color reference');
const redliners = createWord('redliners','Dynos', 'color reference');

const hangman = createWord('hangman','Remove This Interview Question', 'color reference');
const hangmans = createWord('hangmans','Remove This Interview Question', 'color reference');

const ghetto = createWord('ghetto','Subpar', 'color reference');
const ghettos = createWord('ghettos','Subpars', 'color reference');

const grandfathering = createWord('grandfathering','Legacy', 'color reference');
const grandfatherings = createWord('grandfatherings','Legacies', 'color reference');

const words = [blacklist, blacklists, whitelist, whitelists, master, masters, slave, slaves, multiMaster, multiMasters, singleMaster, singleMasters, masterBrand, masterBrands, redliner, redliners, hangman, hangmans, ghetto, ghettos, grandfathering, grandfatherings];

function createWord(problemTerm, wordReplacement, wordReason) {
  const createdWord = {
    term : problemTerm,
    replacement : wordReplacement,
    reason : wordReason
  }
  return createdWord
}


function grabAllText(){
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  slides.forEach(function(slide){
    shapes = slide.getShapes();
    shapes.forEach(function(shape){
      var rangeA = shape.getText();
      var value = rangeA.asString();
      var valueLowerCase = value.toLowerCase();
      var problemWords = words.filter(words => words.term == valueLowerCase); 

      if (problemWords.length !=0){
      var problemTerm = problemWords[0].term;
      var reason = problemWords[0].reason;
      var replacement = problemWords[0].replacement;
      Logger.log(reason);
      }
    })
  })
}


function replaceAllowed(){
  var currentPage = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  presentation.replaceAllText("whitelist", "Allowlist", false);
  presentation.replaceAllText("whitelists", "Allowlists", false);
  presentation.replaceAllText("blacklist", "Denylist", false);
  presentation.replaceAllText("blacklists", "Denylists", false);
  presentation.replaceAllText("master", "Primary", false);
  presentation.replaceAllText("masters", "Primaries", false);
  presentation.replaceAllText("slave", "Follower", false);
  presentation.replaceAllText("slaves", "Followers", false);
  presentation.replaceAllText("multiMaster", "Active", false);
  presentation.replaceAllText("multiMasters", "Actives", false);
  presentation.replaceAllText("singleMaster", "Single", false);
  presentation.replaceAllText("singleMasters", "Singles", false);
  presentation.replaceAllText("masterBrand", "Main", false);
  presentation.replaceAllText("masterBrands", "Mains", false);
  presentation.replaceAllText("redliner", "Dyno", false);
  presentation.replaceAllText("redliners", "Dynos", false);
  presentation.replaceAllText("hangman", "Hangman (Recommended to remove This Interview Question)", false);
  presentation.replaceAllText("hangmans", "Hangmans (Recommended to remove This Interview Question)", false);
  presentation.replaceAllText("ghetto", "Low-quality", false);
  presentation.replaceAllText("ghettos", "Low-quality", false);
  presentation.replaceAllText("grandfathering", "Legacy", false);
  presentation.replaceAllText("grandfatherings", "Legacies", false);
}
