const mysql = require('mysql');
const nodemailer = require('nodemailer');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hestabit',
  password: 'Priyanka@123',
  database: 'application',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database.');
});
const transporter = nodemailer.createTransport({
  service: 'your_email_service_provider',
  auth: {
    user: 'priyankadwivedi039@gmail.com',
    pass: 'Password@123',
  },
});
connection.query("CREATE TRIGGER new_student_assignment_trigger AFTER INSERT ON students FOR EACH ROW BEGIN \
                    DECLARE teacher_email VARCHAR(255); \
                    SELECT email INTO teacher_email FROM teachers WHERE teacher_id = NEW.teacher_id; \
                    \
                    SET @subject = 'New Student Assignment'; \
                    SET @message = CONCAT('A new student has been assigned to you.\n\n', \
                                          'Student ID: ', NEW.student_id, '\n', \
                                          'First Name: ', NEW.first_name, '\n', \
                                          'Last Name: ', NEW.last_name, '\n', \
                                          'Date of Birth: ', NEW.date_of_birth); \
                    \
                    INSERT INTO email_notifications (teacher_id, subject, message) \
                    VALUES (NEW.teacher_id, @subject, @message); \
                    \
                    INSERT INTO email_queue (email, subject, message) \
                    VALUES (teacher_email, @subject, @message); \
                  END;", (err) => {
  if (err) {
    console.error('Error creating trigger: ', err);
    return;
  }
  console.log('Trigger created.');
});
function sendEmailNotifications() {
  connection.query('SELECT * FROM email_queue', (err, results) => {
    if (err) {
      console.error('Error retrieving email notifications from the queue: ', err);
      return;
    }

    results.forEach((row) => {
      const mailOptions = {
        from: 'your_email',
        to: row.email,
        subject: row.subject,
        text: row.message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
        } else {
          console.log('Email sent: ', info.response);
        }
      });
    });

    connection.query('DELETE FROM email_queue', (error) => {
      if (error) {
        console.error('Error deleting sent email notifications from the queue: ', error);
      }
    });
  });
}

