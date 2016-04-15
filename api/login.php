<?php

require_once('../vendor/autoload.php');
session_start();

$provider = new \ChrisHemmings\OAuth2\Client\Provider\Drupal([
  'clientId'          => 'bachelor.dev.id.ramsalt.com',
  'clientSecret'      => 'sKHJGkb348bue3BKH3b3784',
  'redirectUri'       => 'http://' . $_SERVER["HTTP_HOST"] . '/api/login.php',
  'baseUrl'           => 'http://komrap.dev-id.ramsalt.com/',
]);

if (isset($_GET['state']) && isset($_GET['code']) && isset($_SESSION['oauth2state'])) {
    if (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
        unset($_COOKIE['name']);
        setcookie('name', null, -1, '/');
        unset($_SESSION['loggedIn']);
        unset($_SESSION['oauth2state']);
        header('Location: /');
    } else {
        // Try to get an access token (using the authorization code grant)
        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);
        // Token string
        $access_token = $token->getToken();


        try {
            $client = new \GuzzleHttp\Client();
            $res = $client->request('GET', 'http://komrap.dev-id.ramsalt.com/api/license', [
                'format' => "json",
                'query' => array('type'=>'subscription'),
                'headers' => array(
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
              ),
            ]);

            $client2 = new \GuzzleHttp\Client();
            $res2 = $client2->request('POST', 'http://komrap.dev-id.ramsalt.com/api/user/profile', [
                'format' => "json",
                'query' => array(),
                'headers' => array(
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
              ),
            ]);

            $headers = $res->getHeaders();
            $body = json_decode($res->getBody()->getContents(), true);
            $body2 = json_decode($res2->getBody()->getContents(), true);

            //if ($body[0]["product"]["product_id"] == 7) {
            try {
            	$_SESSION["loggedIn"] = true;
                $_SESSION["subscription_id"] = $body[0]["product"]["product_id"];
            	setcookie("name", $body2["realname"], 0, "/"); 
            	header('Location: /search');
            } catch (Exception $e) {
                $_SESSION["loggedIn"] = true;
                $_SESSION["subscription_id"] = -1;
                setcookie("name", $body2["realname"], 0, "/"); 
                header('Location: /search');
            }
            /*} else {
                unset($_COOKIE['name']);
                setcookie('name', null, -1, '/');
                unset($_SESSION['loggedIn']);
                unset($_SESSION['oauth2state']);
                header('Location: /unregistered/wrong_subscription');
            }*/
        } catch (Exception $e) {
            exit('ERROR: ' . $e->getMessage());
        }
    }
} else {

	$options = [
  		'scope' => ['user_profile']
	];

	$authorizationUrl = $provider->getAuthorizationUrl($options);

	// Get the state generated for you and store it to the session.
	$_SESSION['oauth2state'] = $provider->getState();

	// Redirect the user to the authorization URL.
	header('Location: ' . $authorizationUrl);
	exit;
}

