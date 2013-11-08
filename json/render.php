<?php

error_reporting(0);

$dir = "../img/rendering/";
$dh  = opendir($dir);

$dir_http = ltrim ($dir, '..');

while (false !== ($filename = readdir($dh))) {
    
	preg_match("/.jpg$/iu", $filename, $skip);
    
	if ($skip){
	    $files[] = $dir_http . $filename;
	}
}

asort($files);

echo json_encode($files);

?>