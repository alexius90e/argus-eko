<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Pragma: public'); // required
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
header("Cache-Control: no-store, no-cache, must-revalidate");

require './PHPMailer/Exception.php';
require './PHPMailer/PHPMailer.php';
require './PHPMailer/SMTP.php';


if(isset($_POST['email'])) {
    $email = $_POST['email'];
}
if(isset($_POST['files'])) {
    $files = json_decode($_POST["files"], true);
}
if(isset($_POST['fileNames'])) {
    $fileNames = json_decode($_POST["fileNames"]);
}

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.yandex.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'argus@argus.group';                // SMTP username
    $mail->Password = 'ARkeyf31';                         // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->From='argus@argus.group';
    $mail->FromName='Группа компаний АРГУС';
    $mail->addAddress($email);     // Add a recipient

    //Attachments
    for ($i=0; $i < count($files); $i++) {
        $mail->addAttachment($files[$i], $fileNames[$i], 'base64');
    }
    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Список документов для регистрации работодателя';
    $mail->Body    = 'Как и обещали, вот список документов ;)';
    $mail->AltBody = '';
    $mail->send();
    $return = true;
    echo json_encode($return);
} catch (Exception $e) {
    $return = false;
    echo json_encode($return);
}
?>