<?php

require_once('../vendor/autoload.php');
session_start();

$provider = new \ChrisHemmings\OAuth2\Client\Provider\Drupal([
  'clientId'          => 'bachelor.dev.id.ramsalt.com',
  'clientSecret'      => 'sKHJGkb348bue3BKH3b3784',
  'redirectUri'       => 'http://bachelor.dev/api/login.php',
  'baseUrl'           => 'http://komrap.dev-id.ramsalt.com/',
]);

if (isset($_GET['state']) && isset($_GET['code']) && isset($_SESSION['oauth2state'])) {
    if (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
        unset($_SESSION['oauth2state']);
        echo json_encode(array("records" => "login_required"));
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

            if($body[0]["product"]["product_id"] == 6) {
            	$_SESSION["loggedIn"] = true;
            	setcookie("name", $body2["realname"], 0, "/"); 
            	header('Location: /search');
                //print_r("logged in");
            }
           	// Sample result $body:
            // { "uid": "5330", "name": "testuser_5330", "mail": "testuser@ramsalt.com", "theme": "", "signature": "", "signature_format": "full_html", "created": "1460358464", "access": "1460460439", "login": "1460459194", "status": "1", "timezone": "Europe\/Oslo", "language": "en", "picture": "0", "init": "testuser@ramsalt.com", "data": false, "roles": { "2": "authenticated user" }, "field_first_name": { "und": [ { "value": "George", "format": null, "safe_value": "George" } ] }, "field_last_name": { "und": [ { "value": "Ramsalt", "format": null, "safe_value": "Ramsalt" } ] }, "field_user_type": { "und": [ { "value": "annet" } ] }, "domain_user": { "1": "1", "5": "5" }, "realname": "George Ramsalt" }

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

