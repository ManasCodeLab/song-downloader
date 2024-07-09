<?php

$name = $_GET["name"];
$search = "/api/search/songs?query=" . urlencode($name);
$data = @file_get_contents("https://saavn.dev" . $search);

if ($data === FALSE) {
    echo "Error fetching data.";
    exit;
}

$response_data = json_decode($data, true);

$final_link = ''; 

if (!empty($response_data['data']['results'])) {
    foreach ($response_data['data']['results'] as $song) {
        if (isset($song['downloadUrl']) && is_array($song['downloadUrl'])) {
            foreach ($song['downloadUrl'] as $link) {
                if ($link['quality'] == '160kbps') {
                    $final_link = $link['url'];
                    break 2;
                }
            }
        }
    }
}

if (!empty($final_link)) {
    $file_name = $name . "@Manas.mp3";
    header('Content-Type: audio/mpeg');
    header('Content-Disposition: attachment; filename="' . $file_name . '"');

    $remote_file = fopen($final_link, 'rb');

    if ($remote_file === FALSE) {
        echo "Error fetching the song.";
        exit;
    }

    fpassthru($remote_file);
    fclose($remote_file);
} else {
    echo "No song found for the specified quality.";
}
?>
