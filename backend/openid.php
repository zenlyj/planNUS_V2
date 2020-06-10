<?php
    require 'lightopenid.php';
    require_once('Connections/connDB.php');
    
    try {
        # Change 'localhost' to your domain name.
        $openid = new LightOpenID('116.14.246.142:80');
        if(!$openid->mode) {
            if (isset($_GET['nusnet_id'])) {
                $openid->identity = "https://openid.nus.edu.sg/".$_GET['nusnet_id'];
            }
            elseif (isset($_POST['openid_identifier'])) {
                $openid->identity = $_POST['openid_identifier'];
            }
            # The following two lines request email, full name, and a nickname
            # from the provider. Remove them if you don't need that data.
            $openid->optional = array('contact/email');
            $openid->optional = array('namePerson', 'namePerson/friendly');
            header('Location: ' . $openid->authUrl());
        }
        elseif($openid->mode == 'cancel') {
            echo 'User has canceled authentication!';
        }
        else {
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
            $isLoggedIn = $openid->validate();
            if ($isLoggedIn) {
                echo "<h1>You have been logged in. Please close the browser.</h1>\n";
            } else {
                echo "<h1>Login failed.</h1>\n";
            }

            echo "<p>User <b>" . ($isLoggedIn ? $openid->identity . "</b> has " : "has not ") . "logged in.<p>\n";
            $count = 0;
            foreach ($openid->getAttributes() as $key => $value) {
                echo "$key => $value<br/>";
                // $location .= $key . "=" . $value;
                if ($count == 0) {
                    $name = $value;
                    // $location .= "&";
                } else {
                    $nusnet = $value;
                }
                $count++;
            }

            $queryInsertLogin = sprintf("INSERT INTO `login` (nusnet, name)"
			            . " VALUES ('%s', '%s')", $nusnet, $name);
            $rsInsertLogin = mysqli_query($conn, $queryInsertLogin);
            $rsID = mysqli_insert_id($conn);
            # redirect to frontend
            header("Location: http://116.14.246.142:3000");
        }
    } catch(ErrorException $e) {
        echo $e->getMessage();
    }
?>
</body>
</html>
