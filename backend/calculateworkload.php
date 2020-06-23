<?php
    // require_once('Connections/connDB.php');
    header("Access-Control-Allow-Origin: *");
    header('Content-type:application/json;charset=utf-8');
    # usage http://116.14.246.142/calculateworkload.php?modules=CS1010,CS1231,etc..
    try {
        if (isset($_GET['modules'])) {
            $modules = explode(',', $_GET['modules']);
            $baseURL = "https://api.nusmods.com/v2/2019-2020/modules/";
            $totalWorkload = new \stdClass();
            $totalWorkload->hours = 0;
            foreach ($modules as $module) {
                // echo $module;
                $fetchURL = $baseURL . $module . ".json";
                $json = file_get_contents($fetchURL);
                $obj = json_decode($json);
                $totalWorkload->hours += $obj->moduleCredit * 2.5;
            }
            echo json_encode($totalWorkload);
        } else {
            echo "failed";
        }
    } catch(ErrorException $e) {
        echo "failed";
        echo $e->getMessage();
    }
?>
