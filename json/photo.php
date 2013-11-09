<?php

// error_reporting(0);

$dir = "../img/photo/";
$file_output = 'photo.json';
$file_cache_timeout = time() - (7*60*60);

$dh  = opendir($dir);
$dir_http = ltrim ($dir, '..');
while (false !== ($filename = readdir($dh))) {
    
	preg_match("/.jpg$/iu", $filename, $skip);
    
	if ($skip){
	    $files[] = $dir_http . $filename;
	}
}


// Caching thumbnails.
include '../lib/wideimage/WideImage.php';

$dir_thumb = '../cache/' . $dir;

if (!is_dir($dir_thumb)){
	mkdir($dir_thumb);
}

foreach ($files as $image) {

	// echo $image;

	$thumb = '../cache/' . $image;
	
	if (file_exists($thumb)){

		continue;
		// Remove the continue above to 
		// Check the file age.
		if (filectime($thumb) > $file_cache_timeout){
			continue;
		}else{
			// Deletes the files if it's old.
			unlink($thumb);
		}
	}

	$image_data = WideImage::load('..' . $image);
	$image_data->resize(800)->saveToFile($thumb,85);

}

asort($files);

$json_output = json_encode($files);

echo $json_output;

if (file_exists($file_output)){

		// Check the file age.
		if (filectime($file_output) > $file_cache_timeout){
			continue;
		}else{
			// Deletes the files if it's old.
			unlink($file_output);
			file_put_contents($file_output, $json_output);
		}
	}else{
			file_put_contents($file_output, $json_output);
		}


?>