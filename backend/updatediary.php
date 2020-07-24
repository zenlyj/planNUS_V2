<?php
    require_once('Connections/connDB.php');
    header("Access-Control-Allow-Origin: *");
    header('Content-type:application/json;charset=utf-8');
    # params
    # nusnet:str, id: str (MON1, MON2, THURS4, etc.), taskPresent: true, taskName: str, module: str, timeFrom: str (24hr format), timeTo: str(24hr format), description: str
    # usage http://localhost/updatediary.php?nusnet=e0407306&date=14-08-2020&note=HEEEEEEEEEEEEEEEEEHAHAHAHA
    try {
        $message = new \stdClass();
        $message->success = false;
        if (isset($_GET['nusnet']) && isset($_GET['date'])) {
            $queryUpdateTask = sprintf("UPDATE `diary` SET `note` = '%s'", isset($_GET['note']) ? $_GET['note'] : "");
            $date = $_GET['date'];
            $date = explode("-", $date);
            $date = $date[2] . '-' . $date[1] . '-' . $date[0];
            $queryUpdateTask = $queryUpdateTask . sprintf(" WHERE `nusnet`='%s' and `date`='%s'", $_GET['nusnet'], $date);
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