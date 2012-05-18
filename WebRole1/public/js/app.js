var context = $("form");

context.submit(function (event) {
  $.post("/api", { url: context.find("input[type=url]").val() }, function (data) {
   var actualUrl = window.location.href + data.url;
    context.find("span").html("<a target='_blank' href='" + actualUrl + "'>" + actualUrl + "</a>");
    $("div.output").fadeIn();
  });
});

//When a user lands on the page, set the focus to the url input
$("input[type=url]")[0].focus();