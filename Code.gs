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


/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  return createSelectionCard(e);
}

function whenEdit(e){
  var range = e.range;
  var value = range.getValue();
  var valueLowerCase = value.toLowerCase();
  var problemWords = words.filter(words => words.term == valueLowerCase);

  if (problemWords.length !=0){
    var problemTerm = problemWords[0].term;
    var reason = problemWords[0].reason;
    var replacement = problemWords[0].replacement; 
    
    range.setNote('Hey! You have used a term  "' + problemTerm + '". Use "' + replacement + '" instead to prevent ' + reason);
  }else{
    range.clearNote();
  }
}

/**
 * Main function to generate the main card.
 * @return {CardService.Card} The card to show to the user.
 */
function createSelectionCard(e) {
  var hostApp = e['hostApp'];
  var builder = CardService.newCardBuilder();

  // "From" language selection & text input section
  var fromSection = CardService.newCardSection()

  if (hostApp === 'docs') {
    fromSection.addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Get Selection')
        .setOnClickAction(CardService.newAction().setFunctionName('getDocsSelection'))
        .setDisabled(false)))
  } 
   else if (hostApp === 'sheets') {
    ScriptApp.newTrigger('whenEdit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();

    fromSection.addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Get Selection')
        .setOnClickAction(CardService.newAction().setFunctionName('getSheetsSelection'))
        .setDisabled(false)))
  } 
  // else if (hostApp === 'slides') {
  //   fromSection.addWidget(CardService.newButtonSet()
  //     .addButton(CardService.newTextButton()
  //       .setText('Get Selection')
  //       .setOnClickAction(CardService.newAction().setFunctionName('getSlidesSelection'))
  //       .setDisabled(false)))
  // }


  builder.addSection(fromSection);

  return builder.build();

}

//ISSUE: DOESNT RECOGNIZE DIFFERENT CAPITLIZATION
/**
 * Helper function to get the text selected.
 * @return {CardService.Card} The selected text.
 */
function getDocsSelection(e) {
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

   return CardService
     .newCardBuilder()
     .addSection(
          CardService.newCardSection()
              .addWidget(CardService.newTextParagraph().setText(
                  'These are non-inclusive words'))
                .addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Replace Words')
        .setOnClickAction(CardService.newAction().setFunctionName('replacement'))
        .setDisabled(false))))
              .build();
}

/**
 * Helper function to get the text of the selected cells.
 * @return {CardService.Card} The selected text.
 */
function getSheetsSelection(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetRange = sheet.getDataRange();
  var sheetValues = sheetRange.getValues();

  var matches = "";

  for(let row = 0; row < sheetValues.length; row++){
    for(let col = 0; col < sheetValues[row].length; col++){
      for(x in words){
        console.log(words[x].term + "-----");
        if(sheetValues[row][col].toLowerCase().indexOf(words[x].term) != -1){
          matches += (sheetValues[row][col] 
          + ' is a problematic word' 
          + ' some alternatives are ' + words[x].replacement);

          matches += (' and the reason is '+ words[x].reason + '. \n');
        }

      }
    }
  }
  /*
    What if made function that created new widget within given section and it took in passed parameters of something like matches or the objects shock uses and it was called within a loop like the one above.
  */
    return CardService
     .newCardBuilder()
     .addSection(
          CardService.newCardSection()
              .addWidget(CardService.newTextParagraph().setText(
                  matches)))
              .build();
}

/**
 * Helper function to get the selected text of the active slide.
 * @return {CardService.Card} The selected text.
 */
function getSlidesSelection(e) {
  var text = '';
  var selection = SlidesApp.getActivePresentation().getSelection();
  var selectionType = selection.getSelectionType();
  if (selectionType === SlidesApp.SelectionType.TEXT) {
    var textRange = selection.getTextRange();
    if (textRange.asString() !== '') {
      text += textRange.asString() + '\n';
    }
  }
  if (text !== '') {
    var originLanguage = e.formInput.origin;
    var destinationLanguage = e.formInput.destination;
    var translation = LanguageApp.translate(text, e.formInput.origin, e.formInput.destination);
    return createSelectionCard(e, originLanguage, destinationLanguage, text, translation);
  }
}

//Helper Functions::


// Create object from values
function createWord(problemTerm, wordReplacement, wordReason) {
  const createdWord = {
    term : problemTerm,
    replacement : wordReplacement,
    reason : wordReason
  }
  return createdWord
}

//ISSUE: BOLDENS THE WHOLE SELECTION OF WHERE THE PROBLEMATIC WORD IS FOUND UNTIL THERE IS A NEWLINE BREAK FOUND
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