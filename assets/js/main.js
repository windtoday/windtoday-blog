$(function() {
  var search = $("#search")
  var suggestions = $('#search-suggestions')
  search.typed({
    stringsElement: suggestions,
    attr: "placeholder",
    typeSpeed: 50,
    backDelay: 1000,
    loop: true
  });
});
