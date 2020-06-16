<?php
    require 'lightopenid.php';
    require_once('Connections/connDB.php');
    
    try {
        # Change 'localhost' to your domain name.
        $openid = new LightOpenID('116.14.246.142:80');
        if(!$openid->mode) {
            if (isset($_GET['nusnet'])) {
                $openid->identity = "https://openid.nus.edu.sg/".$_GET['nusnet'];
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
            $count = 0;
            foreach ($openid->getAttributes() as $key => $value) {
                // $location .= $key . "=" . $value;
                if ($count == 0) {
                    $name = $value;
                    // $location .= "&";
                } else {
                    $nusnet = $value;
                }
                $count++;
            }

            $queryInsertLogin = sprintf("INSERT INTO `user` (nusnet, name)"
			            . " VALUES ('%s', '%s')", $nusnet, $name);
            $rsInsertLogin = mysqli_query($conn, $queryInsertLogin);
            $rsID = mysqli_insert_id($conn);
            # redirect to frontend
            //header("Location: http://116.14.246.142:3000");
        }
    } catch(ErrorException $e) {
        echo $e->getMessage();
    }
?>
<form method=get name="login" action="http://116.14.246.142:3000">
    <input type="hidden" name="name" value=<?php echo $nusnet; ?>></input>
</form>
<script>document.forms['login'].submit();</script>
</body>
</html>
