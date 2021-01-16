function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('My Add-Ons')
    .addItem('Find Text', 'findText')
    .addItem('Replace Word', 'replacement' )
    .addToUi();
}

// Creating list of words:
const blacklist = createWord('blacklist', 'Denylist', 'color reference');
const whitelist = createWord('whitelist', 'Allowlist', 'color reference');
const master = createWord('master','Primary', 'color reference');     // created word object linke 18 definition
const slave = createWord('slave','Secondary', 'color reference');     // created word object linke 18 definition
const multiMaster = createWord('multiMaster','Active', 'color reference');     // created word object linke 18 definition
const singleMaster = createWord('singleMaster','Single', 'color reference');     // created word object linke 18 definition
const masterBrand = createWord('masterBrand','Main', 'color reference');     // created word object linke 18 definition
const redliner = createWord('redliner','Dyno', 'color reference');     // created word object linke 18 definition
const hangman = createWord('hangman','Remove This Interview Question', 'color reference');     // created word object linke 18 definition
const ghetto = createWord('ghetto','Subpar', 'color reference');     // created word object linke 18 definition
const grandfathering = createWord('grandfathering','Legacy', 'color reference');     // created word object linke 18 definition
const words = [blacklist, whitelist,master, slave, multiMaster, singleMaster, masterBrand, redliner, hangman, ghetto, grandfathering];

// Create object from values
function createWord(problemTerm, wordReplacement, wordReason) {
  const createdWord = {
    term : problemTerm,
    replacement : wordReplacement,
    reason : wordReason
  }
  return createdWord
}


function findText() {
  var body = DocumentApp.getActiveDocument().getBody();
  //while(foundElement != null) {
  for(x in words){
      var foundElement = body.findText(words[x].term);
      console.log(foundElement)
      if(foundElement != null){
      // Get the text object from the element
      var foundText = foundElement.getElement().asText();
      // Where in the element is the found text?
      var start = foundElement.getStartOffset();
      var end = foundElement.getEndOffsetInclusive();
      // Set Bold
      foundText.setBold(true);
      }
  }
   DocumentApp.getUi().alert('These are non-inclusive words');
}


function replacement(){
  const doc = DocumentApp.getActiveDocument();
  const body = doc.setText(doc.getText().toLowerCase());
  //Logger.log(body.findText("Blacklist[^a-zA-Z]").getElement().asText().getText())
  body.replaceText("blacklist", "denylist");
  body.replaceText("whitelist", "allowlist");
  body.replaceText("master", "primary");
  body.replaceText("slave", "secondary");
  body.replaceText("ghetto", "low-quality");
  body.replaceText("multi master", "active");
  body.replaceText("master branch", "main");
  body.replaceText("redliner", "dyno");
  body.replaceText("hangman", "remove this interview question");
  body.replaceText("grandfathering", "legacy");
  //body.setBold(false);
}