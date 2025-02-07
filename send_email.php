<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "patrykroszkowski2020@gmail.com";
    $subject = "Nowe zapytanie z formularza Hero";
    $message = "Imię: " . $_POST["name"] . "\nEmail: " . $_POST["email"] . "\n\nWiadomość:\n" . $_POST["message"];

    $boundary = md5(time());
    $headers = "From: " . $_POST["email"] . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $emailBody = "--$boundary\r\n";
    $emailBody .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $emailBody .= $message . "\r\n";

    if (!empty($_FILES["attachments"]["name"][0])) {
        for ($i = 0; $i < count($_FILES["attachments"]["name"]); $i++) {
            $fileName = $_FILES["attachments"]["name"][$i];
            $fileContent = chunk_split(base64_encode(file_get_contents($_FILES["attachments"]["tmp_name"][$i])));
            $emailBody .= "--$boundary\r\n";
            $emailBody .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
            $emailBody .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
            $emailBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $emailBody .= $fileContent . "\r\n";
        }
    }

    $emailBody .= "--$boundary--";

    echo mail($to, $subject, $emailBody, $headers) ? "Formularz wysłany!" : "Błąd wysyłki.";
}
?>
