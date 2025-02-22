// Exception Emails
const exceptionEmails = [
    "valerie.e.trent@gmail.com",
    "jroither@gmail.com",
    "kristin.pautlitz@gmail.com",
    "naumannoor@gmail.com",
    "snow.michaelwesley@gmail.com",
    "jstevensnow@gmail.com",
    "megtwright@gmail.com",
    "thomas.h.snow@gmail.com",
    "j.alex.trent91@gmail.com",
    "bfoxj42@gmail.com",
    "danail.momchilov@gmail.com"
];
  
function isProfessionalEmail(email) {
    return email.includes("@") && !email.match(/@(gmail\.com|yahoo\.com|aol\.com|apple\.com)$/i);
}