// Creating list of words:
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

