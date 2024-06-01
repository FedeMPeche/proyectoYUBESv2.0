$recaptcha_secret = "";
$response = $_POST['g-recaptcha-response'];

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => $recaptcha_secret,
    'response' => $response
);

$options = array(
    'http' => array (
        'method' => 'POST',
        'content' => http_build_query($data)
    )
);

$context  = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success = json_decode($verify);

if ($captcha_success->success == false) {
    echo "Error en la verificación, intente de nuevo.";
} else if ($captcha_success->success == true) {
    // Aquí va la lógica para procesar el formulario, por ejemplo:
    
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $mensaje = $_POST['mensaje'];
    
    // Aquí puedes procesar los datos del formulario como desees, por ejemplo, enviar un correo electrónico o guardarlos en una base de datos
    
    echo "Verificación completada con éxito!";
}
