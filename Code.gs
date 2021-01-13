function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createMenu('Search for Inclusive Words')
    .addItem('Search and Replace', 'replaceIfFound')
    .addToUi();
}


function replaceIfFound(){
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