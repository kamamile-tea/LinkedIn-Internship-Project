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


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('My Add-Ons')
    .addItem('Check for exclusive words', 'createSidebar')
    .addToUi();
}

// Filter edited cells
function onEdit(e){
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

// Create object from values
function createWord(problemTerm, wordReplacement, wordReason) {
  const createdWord = {
    term : problemTerm,
    replacement : wordReplacement,
    reason : wordReason
  }
  return createdWord
}

function createSidebar(){

  //Creat Sidebar
  var html = HtmlService.createHtmlOutputFromFile('index');
  SpreadsheetApp.getUi().showSidebar(html);


}

function doTheThing(){
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

  return matches;

}






