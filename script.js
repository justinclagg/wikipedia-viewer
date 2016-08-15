
$(document).ready(function() {
	var maxResults = 10;  // Maximum number of results per page (Wiki limits to 10)
	var randomQuery = "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=" + maxResults + "&format=json&callback=?";
	var searchQuery = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";

	// Type can be either "search" or "random"
	function populateFields(query, type) {
		// Clear previous results
		$(".result-area").html("");
		// Get JSON information and generate blocks for each result
		$.getJSON(query, function(json) {
			var title, snippet;
			for (var i = 0; i < maxResults; i++) {
				title = json.query[type][i].title;
				// If snippet is not found set it to an empty string
				snippet = json.query[type][i].snippet ? json.query[type][i].snippet : "";
				// Create an element for each search result containing the title and snippet
				jQuery("<a>", {
					class: "result",
					href: "https://en.wikipedia.org/wiki/" + title,
					target: "_blank",
					html: "<div class='title'>" + title + "</div>" +
						"<div class='snippet'>" + snippet + "</div>"
				}).appendTo(".result-area");
			} 
		});
	}

	// Search form event, triggered by search button or enter
	$("#search-form").on("submit", function(event) {
		event.preventDefault();
		var queryStr = searchQuery + $(".search-bar").val() + "&format=json&callback=?";
		populateFields(queryStr, "search");
	});

	// Display random articles when the Random button is pressed
	$(".randomBtn").on("click", function() {
		populateFields(randomQuery, "random");
	});
  
});
