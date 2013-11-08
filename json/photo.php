<?php

error_reporting(0);

$dir = "../img/photo/";
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
		$time_a_week_ago = time() - (7*60*60);
		if (filectime($thumb) > $time_a_week_ago){
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

echo json_encode($files);

?>