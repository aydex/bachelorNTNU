<?php
	require_once('../vendor/autoload.php');
	session_start();

	$provider = new \ChrisHemmings\OAuth2\Client\Provider\Drupal([
	  'clientId'          => 'bachelor.dev.id.ramsalt.com',
	  'clientSecret'      => 'sKHJGkb348bue3BKH3b3784',
	  'redirectUri'       => 'http://' . $_SERVER["HTTP_HOST"] . '/api/logout.php',
	  'baseUrl'           => 'http://komrap.dev-id.ramsalt.com/',
	]);


	$url = "http://komrap.dev-id.ramsalt.com/api/user/logout";

if (isset($_GET['state']) && isset($_GET['code'])) {

	// Try to get an access token (using the authorization code grant)
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);
    // Token string
    $access_token = $token->getToken();

	$client = new \GuzzleHttp\Client();
    $res = $client->request('POST', 'http://komrap.dev-id.ramsalt.com/api/user/logout', [
        'format' => "json",
        'headers' => array(
          	'Authorization' => 'Bearer ' . $access_token,
          	'Content-Type' => 'application/json',
          	'Accept' => 'application/json',
        ),
    ]);

    $headers = $res->getHeaders();
    $body = $res->getBody();
    $json = json_decode($body->getContents());

    print_r($json);
    unset($_COOKIE['name']);
	setcookie('name', null, -1, '/');
	unset($_SESSION['loggedIn']);
	unset($_SESSION['oauth2state']);
	header('Location: /');
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
	/*
	session_start();
	unset($_COOKIE['name']);
    setcookie('name', null, -1, '/');
	unset($_SESSION['loggedIn']);
	unset($_SESSION['oauth2state']);
	header('Location: /');*/
?>