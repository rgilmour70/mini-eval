<?php
include('../../../includes/config.php');
include('../../../includes/functions.php');

$query = 'SELECT * FROM `quiz_eval_mini`';

$db = db_connect();

foreach ($db->query($query) as $row) {
	echo "$row[2], $row[3], $row[4], $row[5], $row[6], $row[7]";
}