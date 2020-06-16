<?php
    require_once('Connections/connDB.php');
    
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
    # usage http://116.14.246.142/addtask.php?nusnet=e0407306&moduleCode=cp2106&date=2020-05-05&startTime=1600&endTime=1700
    try {
        if (isset($_GET['nusnet']) && isset($_GET['title']) && isset($_GET['moduleCode']) && isset($_GET['date']) && isset($_GET['startTime'])
            && isset($_GET['endTime'])) {
            $queryInsertLogin = sprintf("INSERT INTO `task` (nusnet, title, moduleCode, date, startTime, endTime, description)"
                    . " VALUES ('%s', '%s', '%s', '%s' ,'%s', '%s', '%s')", $_GET['nusnet'], $_GET['title'], $_GET['moduleCode'], $_GET['date'], $_GET['startTime'],
                $_GET['endTime'], isset($_GET['description']) ? $_GET['description'] : "");
            $rsInsertLogin = mysqli_query($conn, $queryInsertLogin);
            $rsID = mysqli_insert_id($conn);
            if ($rsID > 0) {
                echo "success";
            } else {
                echo "failed";
            }
        } else {
            echo "failed";
        }
    } catch(ErrorException $e) {
        echo "failed";
        echo $e->getMessage();
    }
?>
</body>
</html>
