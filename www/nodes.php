<?php
$addrs = file_get_contents("/var/altmine/pool/data/p2pool/litecoin/addrs");
$nodes = json_decode($addrs, true);
?>

<table>

<?php
foreach ($nodes as $node){

    	$host = $node[0][0];
	$port = $node[0][1];

	$ch = curl_init('http://'.$host.':'.$port.'/local_stats');
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 200); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT_MS, 200);

	curl_exec($ch);

	// Vérification si une erreur est survenue
	if(!curl_errno($ch))
	{
 		$info = curl_getinfo($ch);

	 	echo "<tr>";
                echo "<td>".$host."</td>";
                echo "<td>".$port."</td>";
		echo "<td>".$info['total_time']."</td>";
                echo "</tr>";
	}

	curl_close($ch);
}
?>
</table>


