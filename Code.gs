const wordExchange = {
  nonInclusiveWords:  //will return index of found word and will use that index to access the correspooding set of alternatives
    ['blacklist','whitelist','master','slave','multi master','single master','master branch',
    'redliner','hangman','ghetto','grandfathering'],
  
  alternativeWords: {
    0: {
      0:'denylist',
      1:'rejectlist',
      2: 'blocklist',
      3: 'excludelist'
      },

    1: {
      0:'allowlist',
      1:'acceptlist',
      2: 'passlist',
      3: 'includelist'
      },
    2: {
      0:'primary',
      1:'default',
      2: 'leader',
      3: 'active'
      },
    3: {
      0:'secondary',
      1:'replica',
      2: 'follower',
      3: 'standby'
      },
    4: {
      0:'active active'
      },
    5: {
      0:'single active'
      },
    6: {
      0:'main'
      },
    7: {
      0:'dyno'
      },
    8: {
      0:'remove this interview question'
      },
    9: {
      0:'low-quality',
      1: 'subpar'
      },
    10: {
      0:'legacy',
      1: 'exception'
      },

  },

  reasons:
    ['Color reference','Color reference','The master-slave relationship was the cornerstone of the laws of slavery.','The master-slave relationship was the cornerstone of the laws of slavery.','Reference to Slavery','Reference to Slavery','Reference to Slavery','State and federal housing policies that mandated segregation','Legacy of racially-motivated violence','Residential segregation based on race','Statutes enacted in the South to suppress African American voting'],

}

/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  return createSelectionCard(e);
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
  //   .addWidget(generateLanguagesDropdown('origin', 'From: ', originLanguage))
  //   .addWidget(CardService.newTextInput()
  //     .setFieldName('input')
  //     .setValue(inputText)
  //     .setTitle('Enter text...')
  //     .setMultiline(true));

  // if (hostApp === 'docs') {
  //   fromSection.addWidget(CardService.newButtonSet()
  //     .addButton(CardService.newTextButton()
  //       .setText('Get Selection')
  //       .setOnClickAction(CardService.newAction().setFunctionName('getDocsSelection'))
  //       .setDisabled(false)))
  // } 
   if (hostApp === 'sheets') {
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

  // // "Translation" language selection & text input section
  // builder.addSection(CardService.newCardSection()
  //   .addWidget(generateLanguagesDropdown('destination', 'To: ', destinationLanguage))
  //   .addWidget(CardService.newTextInput()
  //     .setFieldName('output')
  //     .setValue(outputText)
  //     .setTitle('Translation...')
  //     .setMultiline(true)));

  // //Buttons section
  // builder.addSection(CardService.newCardSection()
  //   .addWidget(CardService.newButtonSet()
  //     .addButton(CardService.newTextButton()
  //       .setText('Translate')
  //       .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  //       .setOnClickAction(CardService.newAction().setFunctionName('translateText'))
  //       .setDisabled(false))
  //     .addButton(CardService.newTextButton()
  //       .setText('Clear')
  //       .setOnClickAction(CardService.newAction().setFunctionName('clearText'))
  //       .setDisabled(false))));

  return builder.build();

}


/**
 * Helper function to get the text selected.
 * @return {CardService.Card} The selected text.
 */
function getDocsSelection(e) {
  var text = '';
  var selection = DocumentApp.getActiveDocument().getSelection();
  Logger.log(selection)
  if (selection) {
    var elements = selection.getRangeElements();
    for (var i = 0; i < elements.length; i++) {
      Logger.log(elements[i]);
      var element = elements[i];
      // Only modify elements that can be edited as text; skip images and other non-text elements.
      if (element.getElement().asText() && element.getElement().asText().getText() !== '') {
        text += element.getElement().asText().getText() + '\n';
      }
    }
  }

  if (text !== '') {
    var originLanguage = e.formInput.origin;
    var destinationLanguage = e.formInput.destination;
    var translation = LanguageApp.translate(text, e.formInput.origin, e.formInput.destination);
    return createSelectionCard(e, originLanguage, destinationLanguage, text, translation);
  }
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
      for(let nonWord = 0; nonWord < wordExchange.nonInclusiveWords.length; nonWord++){

        if(sheetValues[row][col].toLowerCase() == wordExchange.nonInclusiveWords[nonWord]){
          matches += (sheetValues[row][col] 
          + ' is a problematic word' 
          + ' some alternatives are ');

          for(x in wordExchange.alternativeWords[nonWord]){
            matches +=(wordExchange.alternativeWords[nonWord][x] + ' ');
          }

          matches += (' and the reason is '+ wordExchange.reasons[nonWord] + '. \n');
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
                  matches))
              .addWidget(CardService.newImage().setImageUrl(
                  'https://www.example.com/images/mapsImage.png')))
     .addCardAction(CardService.newCardAction().setText('Gmail').setOpenLink(
         CardService.newOpenLink().setUrl('https://mail.google.com/mail')))
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