<?php
header("Access-Control-Allow-Origin: *");

include('../../includes/config.php');
include('../../includes/functions.php');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if ($_POST) {
	http_response_code(200);
	
	$to = 'rgilmour70@gmail.com';
	$subject = 'eval-mini';
	$msg = 'Your request reached the API.';
	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: 'Library No Reply' <libweb@ithaca.edu>\r\n";

	mail($to, $subject, $msg, $headers);

} else {
	echo json_encode(["message" => "Something went wrong"]);
}