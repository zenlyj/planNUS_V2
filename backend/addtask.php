<?php
    require_once('Connections/connDB.php');
    header("Access-Control-Allow-Origin: *");
    header('Content-type:application/json;charset=utf-8');
    # params
    # nusnet:str, id: str (MON1, MON2, THURS4, etc.), taskPresent: true, taskName: str, module: str, timeFrom: str (24hr format), timeTo: str(24hr format), description: str
    # usage http://116.14.246.142/addtask.php?nusnet=e0407306&id=MON1&taskPresent=true&taskName=ABC&module=cp2106&timeFrom=1600&timeTo=1700&description=xyz&week=1
    try {
        
        $message = new \stdClass();
        $message->success = false;
        if (isset($_GET['nusnet']) && isset($_GET['id'])) {
            $queryInsertTask = sprintf("INSERT INTO `task` (nusnet, id, taskPresent, taskName, module, timeFrom, timeTo, description, week)"
                    . " VALUES ('%s', '%s', '%s', '%s', '%s' ,'%s', '%s', '%s', '%s')", $_GET['nusnet'], $_GET['id'], $_GET['taskPresent'], $_GET['taskName'], $_GET['module'],
                $_GET['timeFrom'], $_GET['timeTo'], $_GET['description'], $_GET['week']);
            $rsInsertTask = mysqli_query($conn, $queryInsertTask);
            if ($rsInsertTask == 1) {
                $message->success = true;
            } 
        } 
        echo json_encode($message);
    } catch(ErrorException $e) {
        echo $e->getMessage();
    }
?>
