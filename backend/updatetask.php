<?php
    require_once('Connections/connDB.php');
    header("Access-Control-Allow-Origin: *");
    header('Content-type:application/json;charset=utf-8');
    # params
    # nusnet:str, id: str (MON1, MON2, THURS4, etc.), taskPresent: true, taskName: str, module: str, timeFrom: str (24hr format), timeTo: str(24hr format), description: str
    # usage http://localhost/updatetask.php?nusnet=e0407306&id=MON1&week=1&fields=taskName|xyz,description|GGGFSGSG
    try {
        $message = new \stdClass();
        $message->success = false;
        if (isset($_GET['nusnet']) && isset($_GET['id'])) {
            $queryUpdateTask = "UPDATE task SET ";
            // $rsUpdateTask = mysqli_query($conn, $queryUpdateTask);
            $count = 0;
            $fields = explode(",", $_GET['fields']);
            foreach ($fields as $field) {
                $name = explode("|", $field)[0];
                $value = explode("|", $field)[1];
                if ($count == 0) {;
                } else {
                    $queryUpdateTask = $queryUpdateTask . ",";
                }
                $queryUpdateTask = $queryUpdateTask . sprintf("%s='%s'", $name, $value);
                $count++;
            }
            $queryUpdateTask = $queryUpdateTask . sprintf(" WHERE nusnet='%s' AND id='%s' AND week='%s'", $_GET['nusnet'], $_GET['id'], $_GET['week']);
            $rsUpdateTask = mysqli_query($conn, $queryUpdateTask);
            if ($rsUpdateTask == 1) {
                $message->success = true;
            } 
        } 
        echo json_encode($message);
    } catch(ErrorException $e) {
        echo $e->getMessage();
    }
?>
