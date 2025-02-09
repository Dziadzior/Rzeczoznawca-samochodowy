<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Błąd: Formularz musi być wysłany metodą POST.");
}

if (!isset($_POST["name"], $_POST["email"], $_POST["message"])) {
    die("Błąd: Brak wymaganych danych.");
}

$mail = new PHPMailer(true);

try {
    // Konfiguracja SMTP Gmail
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'patrykroszkowski2020@gmail.com';
    $mail->Password = 'vbuk isqt jwfx wdmz';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Dane nadawcy i odbiorcy
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('patrykroszkowski2020@gmail.com', 'Odbiorca');

    // Temat e-maila
    $mail->Subject = "Nowa wycena";

    // Stylizowana wiadomość e-mail
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .email-container { max-width: 600px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            h2 { color: #c00; }
            p { font-size: 16px; color: #333; }
            .email-footer { margin-top: 20px; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <h2>Nowa wycena</h2>
            <p><strong>Imię:</strong> {$_POST['name']}</p>
            <p><strong>Email:</strong> {$_POST['email']}</p>
            <p><strong>Wiadomość:</strong></p>
            <p>{$_POST['message']}</p>
            <hr>
        </div>
    </body>
    </html>";

    // Ustawienie wiadomości jako HTML
    $mail->isHTML(true);
    $mail->Body = $message;

    // Obsługa załączników
    if (!empty($_FILES["attachments"]["name"][0])) {
        for ($i = 0; $i < count($_FILES["attachments"]["name"]); $i++) {
            $mail->addAttachment($_FILES["attachments"]["tmp_name"][$i], $_FILES["attachments"]["name"][$i]);
        }
    }

    if ($mail->send()) {
        echo "Formularz wysłany pomyślnie!";
    } else {
        echo "Błąd wysyłania formularza: " . $mail->ErrorInfo;
    }
} catch (Exception $e) {
    echo "Błąd: " . $mail->ErrorInfo;
}
?>
