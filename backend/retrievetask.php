<?php
    require_once('Connections/connDB.php');
    
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
    # usage http://116.14.246.142/retrievetask.php?nusnet=e0407306
    try {
        if (isset($_GET['nusnet'])) {
            $querySearch = sprintf("Select * from `task` where nusnet = '%s'", $_GET['nusnet']);
            $result = $conn->query($querySearch);
            if ($result->num_rows > 0 ) {
                $resultArr = array();
                while ($row = $result->fetch_assoc()) {
                    $resultArr[] = $row;
                }
                echo json_encode($resultArr);
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
