<?php

$name = $_GET["name"];
$search = "/api/search/songs?query=" . urlencode($name);
$data = file_get_contents("https://saavn.dev" . $search);
$response_data = json_decode($data, true);

$final_link = ''; 

if (!empty($response_data['data']['results'])) {
    foreach ($response_data['data']['results'] as $song) {
        foreach ($song['downloadUrl'] as $link) {
            if ($link['quality'] == '160kbps') {
                $final_link = $link['url'];
                break 2;
            }
        }
    }
}

if (!empty($final_link)) {
    header("Location: " . $final_link);
} else {
    echo "No link found for the specified quality.";
}
?>
