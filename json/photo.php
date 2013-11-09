<?php

error_reporting(0);

include 'shared.php';

$dir = "../img/photo/";
$file_output = 'photo.json';

$images = get_image_list($dir);
// generate_thumbnails($dir, $images);
save_json($file_output, $images);
?>