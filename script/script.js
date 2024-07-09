function fetchSuggestions() {
    var input = document.getElementById("songName").value.trim();
    if (input.length === 0) {
        document.getElementById("suggestions").style.display = "none";
        return;
    }
    var url = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(input)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            showSuggestions(data.data.results);
        })
        .catch(error => {
            console.error('Error fetching suggestions:', error);
        });
}

function showSuggestions(suggestions) {
    var suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = ""; 
    suggestionsDiv.style.display = "block";

    suggestions.forEach(song => {
        var suggestion = document.createElement("div");
        suggestion.textContent = song.name;
        suggestion.onclick = function () {
            document.getElementById("songName").value = song.name;
            suggestionsDiv.style.display = "none";
        };
        suggestionsDiv.appendChild(suggestion);
    });
}

function playAudio() {
    var name = document.getElementById("songName").value;
    //var source = "./php/play.php?name=" + encodeURIComponent(name);
    var source = "//manas.eu.org/song/play.php?name=" + encodeURIComponent(name);
    const audio = document.getElementById("myAudio");
    audio.src = source;
    audio.hidden = true;
    document.getElementById("stopButton").hidden = false;
    document.getElementById("playButton").hidden = false;
    audio.play();
}

function controlAudio(command) {
    const audio = document.getElementById("myAudio");
    if (command === 'play') {
        audio.play();
    } else if (command === 'pause') {
        audio.pause();
    }
}

function searchAndDownload() {
    var name = document.getElementById("songName").value;
    //window.location.href = "./php/download.php?name=" + encodeURIComponent(name);
    window.location.href = "//manas.eu.org/song/download.php?name=" + encodeURIComponent(name);
}
