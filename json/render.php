<?php

error_reporting(0);

include 'shared.php';

$dir = "../img/rendering/";
$file_output = 'render.json';

$images = get_image_list($dir);
save_json($file_output, $images);

?>