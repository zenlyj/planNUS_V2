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
        if (isset($_GET['nusnet'])) {
            $querySearch = sprintf("Select * from `task` where nusnet = '%s'", $_GET['nusnet']);
            $result = $conn->query($querySearch);
            if ($result->num_rows > 0 ) {
                while ($row = $result->fetch_assoc()) {
                    echo json_encode($row);
                }
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
