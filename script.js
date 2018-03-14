document.getElementById("getResultBtn").addEventListener("click", function() {
  var query = document.getElementById("queryInput").value;
  query.replace(" ", "+");
  getResults(query, "top");
});

document.getElementById("findAnotherBtn").addEventListener("click", function() {
  var query = document.getElementById("queryInput").value;
  query.replace(" ", "+");
  getResults(query, "random");
})

function getResults(query, resultType) {
  fetch("https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=G2Bg3LdRijdG7FBkjMkd4HNj5yqM77Gg")
    .then(
      function(response) {
        if (response.status !== 200) { // If the request is not succesful
          console.log("There was an error: " + response.status);
          return;
        }
        response.json().then(function(data) {
          if (resultType == "top") {
            getTopGif(data.data);
          } else if (resultType == "random") {
              getRandomGif(data.data);
          }
        });
      }
    )
    .catch(function(err) {
      console.log("There was an error: ", err);
    });
}

function getTopGif(results) {
  var topMatchUrl = results[0].embed_url;
  document.getElementById("gifFrame").src = topMatchUrl;
  return;
}

function getRandomGif(results) {
  var random = Math.floor(Math.random() * 25) + 1; // Gets random number between 1 and 25 (never generates 0 as 0 is top result)
  var randomUrl = results[random].embed_url;
  document.getElementById("gifFrame").src = randomUrl;
}

// ("GET", "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=G2Bg3LdRijdG7FBkjMkd4HNj5yqM77Gg");
