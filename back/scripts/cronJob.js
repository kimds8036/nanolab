const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule task to run fetchAnnouncements.js every hour
cron.schedule('0 * * * *', () => {
  console.log('Running fetchAnnouncements.js');
  exec('node scripts/fetchAnnouncements.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing fetchAnnouncements.js: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
});

console.log('Cron job scheduled to run every hour.');
