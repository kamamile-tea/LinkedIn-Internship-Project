// Creating list of words:
const blacklist = createWord('blacklist', 'denylist', 'color reference');
const whitelist = createWord('whitelist', 'allowlist', 'color reference');
const master = createWord('master','primary', 'color reference');     // created word object linke 18 definition
const slave = createWord('slave','secondary', 'color reference');     // created word object linke 18 definition
const multiMaster = createWord('multiMaster','active', 'color reference');     // created word object linke 18 definition
const singleMaster = createWord('singleMaster','single', 'color reference');     // created word object linke 18 definition
const masterBrand = createWord('masterBrand','main', 'color reference');     // created word object linke 18 definition
const redliner = createWord('redliner','dyno', 'color reference');     // created word object linke 18 definition
const hangman = createWord('hangman','remove This Interview Question', 'color reference');     // created word object linke 18 definition
const ghetto = createWord('ghetto','subpar', 'color reference');     // created word object linke 18 definition
const grandfathering = createWord('grandfathering','legacy', 'color reference');     // created word object linke 18 definition

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
        .setText('Identify')
        .setOnClickAction(CardService.newAction().setFunctionName('getDocsSelection'))
        .setDisabled(false)))
  } 
   else if (hostApp === 'sheets') {
    try{
    ScriptApp.newTrigger('whenEdit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
    }
    catch(err){
      fromSection.addWidget(CardService.newTextParagraph().setText(
                  "Succesfully running on Edit feature"))
    }
    fromSection.addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Get Selection')
        .setOnClickAction(CardService.newAction().setFunctionName('getSheetsSelection'))
        .setDisabled(false)))
  } 
  else if (hostApp === 'slides') {
    fromSection.addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Check Words')
        .setOnClickAction(CardService.newAction().setFunctionName('getSlidesSelection'))
        .setDisabled(false)))
  }


  builder.addSection(fromSection);

  return builder.build();

}


/**
 * Finds problematic words and boldens them & creates a button to replace those words.
 * @return {CardService.Card} The selected text.
 */
function getDocsSelection(e) {
  var doc = DocumentApp.getActiveDocument().getBody();
  const body = doc.setText(doc.getText().toLowerCase());
  var docCard = CardService.newCardBuilder();
  
  for(x in words){
      var foundElement = body.findText(words[x].term);
      
      while(foundElement != null){
        //Find the next match
        foundElement = body.findText(words[x].term, foundElement);

        console.log("jjjjjj"+words[x]);

        matches = ('Problematic word: ' 
          + words[x].term
          + '\nAlternative: ' + words[x].replacement
          + '\nReason: '+ words[x].reason + '. \n');

        docCard.addSection(
          CardService.newCardSection()
              .addWidget(CardService.newTextParagraph().setText(
                  matches))
              .addWidget(CardService.newButtonSet()
                .addButton(CardService.newTextButton()
                  .setText('Show me where')
                  .setOnClickAction(CardService.newAction().setFunctionName('highlight')
                  .setParameters({alternate: words[x].replacement, term:words[x].term }))
                  .setDisabled(false))
                .addButton(CardService.newTextButton()
                  .setText('Replace Word')
                  .setOnClickAction(CardService.newAction().setFunctionName('replacement')
                  .setParameters({alternate: words[x].replacement, term:words[x].term }))
                  .setDisabled(false)))
              .setCollapsible(true)
              .setHeader(words[x].term));
      }
  }

  docCard.addSection(
          CardService.newCardSection()
              .addWidget(CardService.newButtonSet()
                  .addButton(CardService.newTextButton()
                     .setText('Click Again to Scan')
                     .setOnClickAction(CardService.newAction().setFunctionName('getDocsSelection'))
                     .setDisabled(false))))
                     
   return docCard.build();
}

//!!!!!!!!!Needs function to show where the problematic word is!!!!!!!!!!!!!
//!!!!!!!!!!Needs function to replace given word upon command!!!!!!!!!!!!!
/**
 * Helper function to get the text of the selected cells.
 * @return {CardService.Card} The selected text.
 */
function getSheetsSelection(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetRange = sheet.getDataRange();
  var sheetValues = sheetRange.getValues();
  var sheetCard = CardService.newCardBuilder();

  var matches = "";

  for(let row = 0; row < sheetValues.length; row++){
    for(let col = 0; col < sheetValues[row].length; col++){
      for(x in words){
        console.log(words[x].term + "-----");
        if(sheetValues[row][col].toLowerCase().indexOf(words[x].term) != -1){
          matches = ('Problematic word: ' 
          + sheetValues[row][col]
          + '\nAlternative: ' + words[x].replacement
          + '\nReason: '+ words[x].reason + '. \n');

          sheetCard.addSection(
          CardService.newCardSection()
              .addWidget(CardService.newTextParagraph().setText(
                  matches))
              .addWidget(CardService.newButtonSet()
                .addButton(CardService.newTextButton()
                  .setText('Show me where')
                  .setOnClickAction(CardService.newAction().setFunctionName('functionNameHere'))
                  .setDisabled(false))
                .addButton(CardService.newTextButton()
                  .setText('Replace Word')
                  .setOnClickAction(CardService.newAction().setFunctionName('functionNameHere'))
                  .setDisabled(false)))
              .setCollapsible(true)
              .setHeader(sheetValues[row][col]));
        }

      }
    }
  }
  /*
    What if made function that created new widget within given section and it took in passed parameters of something like matches or the objects shock uses and it was called within a loop like the one above.
  */
    return sheetCard.build();
}

/**
 * Helper function to get the selected text of the active slide.
 * return {CardService.Card} The selected text.
 */
function getSlidesSelection(e) {
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
  if (isWordOnAnySlide("blacklist", slides)) {
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
  if(isWordOnAnySlide("master", slides)){
    var response = ui.alert('Problematic Word Found','Click YES to replace "master" with "primary"', 
    ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES){
      presentation.replaceAllText("master", "primary", false);
    }
  }
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

// replaces the first occurrence of the given term
function replacement(e) {    
  var body = DocumentApp.getActiveDocument().getBody();
  var found = body.findText(e.parameters.term);
  if (found) {
    var start = found.getStartOffset();
    var end = found.getEndOffsetInclusive();
    var text = found.getElement().asText();
    text.deleteText(start, end);
    text.insertText(start, e.parameters.alternate);
  }
}

// hihglights the given word
//!!!!!!!!!!!!bug if user chooses to highlight two of the same words consecutively!!!!!!!!!
function highlight(e){
  var body = DocumentApp.getActiveDocument().getBody();
  var found = body.findText(e.parameters.term);
  if (found && !found.getElement().asText().isBold()) {
    var start = found.getStartOffset();
    var end = found.getEndOffsetInclusive();
    var text = found.getElement().asText();
    // Set Bold
    text.setBold(start, end,true);
  }
}