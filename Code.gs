//CUSTOM MENU

function onOpen() {
  // Get the Ui object.
  var ui = SpreadsheetApp.getUi();

  // Create and add a named menu and its items to the menu bar.
  ui.createMenu('Improve the Text')
    .addItem('Find Inclusive Words', 'onEdit')
    .addToUi();
}

//Create Sidebar
function createSidebar(){
  var ui = SpreadsheetApp.getUi();
  var tmp = HtmlService.createTemplateFromFile('index');
  var html = tmp.evaluate();
  html.setTitle('Sidebar');
  ui.showSidebar(html);
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


//Identify if cell has inclusive words
//FUNCTRION THAT WORKS BELOW
//             function findWords() {
// //           var spreadSheet = ``SpreadsheetApp.getActiveSpreadsheet();
////             var sheet = spreadSheet.getActiveSheet();
// //            var activeCell = sheet.getActiveCell().getValue();
//  var activeCell = input;
//                var problemWords = words.filter(words => words.term == activeCell); // if one of the objects in "words" is equal to what is in cell, then assign to problemWords
//
//              if (problemWords.length !=0){
//               var problemTerm = problemWords[0].term;
//               var reason = problemWords[0].reason;
//                 var replacement = problemWords[0].replacement;
//    
//    var reason = document.getElementById("reason").innerHTML = problemWords[0].reason;
 //document.getElementById("replacement").innerHTML = "Testing";
    
    //.             return replacement;
//    var Reason = problemWords[0].reason
//    var Replacement = problemWords[0].replacement
//    console.log(problemTerm, reason, replacement);
//     }else{
//     console.log("It's empty");
   //}  
//                      }



function onEdit(e){
 // var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  //var activeSheet = e.source.getActiveSheet();
  //var cell = e.value(); //grabs the cell (same as getActiveCell)
  var range = e.range;
  var value = range.getValue();
  var user = e.user.getEmail();
  var valueLowerCase = value.toLowerCase();
  //return cell;
  var problemWords = words.filter(words => words.term == valueLowerCase); // if one of the objects in "words" is equal to what is in cell, then assign to problemWords

  if (problemWords.length !=0){
    var problemTerm = problemWords[0].term;
    var reason = problemWords[0].reason;
    var replacement = problemWords[0].replacement; 
    
    range.setNote('Hey! You have used a term  "' + problemTerm + '". Use "' + replacement + '" instead to prevent ' + reason);
    //return [problemTerm, replacement, reason];
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







/*
function findWords() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadSheet.getActiveSheet();
  var activeCell = sheet.getCurrentCell().getValue();
  console.log(activeCell);

}


function findWords() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); //
  var sheet = spreadSheet.getSheetByName("Sheet1");
  var activeCell = sheet.getActiveCell().getValue(); //Gets the active cell
  //console.log(activeCell);
  var problemWords = words.filter(word => blacklist == activeCell); //
  console.log(problemWords);
  //if (problemWords.length !=0)
}
  // Drew Example:
   var activeCell = sheet.getActiveCell.getValue(); //Gets the active cell
  // var problemWords = wordsAsArray.filter(arrayObject => arrayObject.term == activeCell);  // => var problemWords = [whitelistObject] 
  // if (problemWords.length !=0) ... you have an array of size one with a word object in it (you could change the filter so it's not necessarily size 1)
  // replacementReason = problemWords[0].reason
 // replacement = problemWords[0].replacement


*/