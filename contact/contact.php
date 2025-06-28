<?php
// Sanitize and validate input
function sanitize($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

$firstName = sanitize($_POST['firstName'] ?? '');
$lastName = sanitize($_POST['lastName'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$phone = sanitize($_POST['phone'] ?? '');
$subject = sanitize($_POST['subject'] ?? '');
$message = sanitize($_POST['message'] ?? '');

if ($firstName && $lastName && $email && $subject && $message) {
    $to = "220390116008@saffrony.ac.in"; // Replace with your own email
    $headers = "From: $email\r\nReply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $mailBody = "First Name: $firstName\n";
    $mailBody .= "Last Name: $lastName\n";
    $mailBody .= "Email: $email\n";
    $mailBody .= "Phone: $phone\n";
    $mailBody .= "Subject: $subject\n\n";
    $mailBody .= "Message:\n$message\n";

    $success = mail($to, "New Contact Form Submission - $subject", $mailBody, $headers);

    if ($success) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again.";
    }
} else {
    echo "Please fill in all required fields.";
}
?>
