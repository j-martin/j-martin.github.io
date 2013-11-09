<?php

function get_image_list($dir){
	$dh  = opendir($dir);
	$dir_http = ltrim ($dir, '..');
	
	while (false !== ($filename = readdir($dh))) {
	    
		preg_match("/.jpg$/iu", $filename, $skip);
	    
		if ($skip){
		    $files[] = $dir_http . $filename;
		}
	}

	asort($files);

	return $files;
}

function save_json($path, $data, $timeout = 25200){
	
	// Output JSON to Broswer and save a static copy.

	$data = json_encode($data);

	// Output JSON to Browser
	echo $data;
	
	$cache_timeout = time() - $timeout;

	if (file_exists($path)){

			// Check the file age.
			if (filectime($path) < $cache_timeout){

				// Deletes the files if it's old.
				unlink($path);
				file_put_contents($path, $data);
			}

		}else{
				file_put_contents($path, $data);
			}

	return 0;
}

function generate_thumbnails($dir, $image_list, $cache_path = '../cache/'){
	
	// Caching thumbnails.
	include '../lib/wideimage/WideImage.php';

	$dir_thumb = $cache_path . $dir;

	if (!is_dir($dir_thumb)){
		mkdir($dir_thumb);
	}

	foreach ($image_list as $image) {

		// echo $image;

		$thumb = '../cache/' . $image;
		
		if (file_exists($thumb)){

			// Deletes the files if it's old.
			unlink($thumb);
			}
		}

		$image_data = WideImage::load('..' . $image);
		$image_data->resize(800)->saveToFile($thumb,85);

	}
}

?>