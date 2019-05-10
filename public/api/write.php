<?php
header("Access-Control-Allow-Origin: *");

include('../../../includes/config.php');
include('../../../includes/functions.php');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if ($_POST) {
	http_response_code(200);

	$db = db_connect();
	$db_table = 'quiz_eval_mini';
	$answers = $_POST;
	$query = "INSERT INTO `" . $db_table . "` ";
	$query_bit_1 = "(";
	$query_bit_2 = "(";

	$i = 0;
	foreach ($answers as $k => $v) {
		$query_bit_1 .= "`" . $k . "`";
		if ($i < 5) {
			$query_bit_1 .= ', ';
		}
		$query_bit_2 .= "'" . $v . "'";
		if ($i < 5) {
			$query_bit_2 .= ', ';
		}
		$i++;
	}

	$query .= $query_bit_1 . ') VALUES ' . $query_bit_2 . ')';

	try {
        $db->exec($query);
    } catch(PDOException $e) {
        $error_message = $e->getMessage();
    }
    
	// purely for testing
	// $to = 'rgilmour70@gmail.com';
	// $subject = 'eval-mini';
	// $msg = $answers . '<br><br>';
	// $msg .= $query;
	// $headers = "MIME-Version: 1.0\r\n";
	// $headers.= "Content-type: text/html; charset=UTF-8\r\n";
	// $headers.= "From: 'Library No Reply' <libweb@ithaca.edu>\r\n";
	// mail($to, $subject, $msg, $headers);

} else {
	echo json_encode(["message" => "Something went wrong"]);
}

function sanitizeString($var) {
	$var = stripslashes($var);
	$var = htmlentities($var);
	$var = strip_tags($var);
	return $var;
}