//For parsing data (links for videos to download) to python script 
const spawner = require('child_process').spawn;

const data_to_pass_in = 'Send this to python';

console.log('Data Sent to Python', data_to_pass_in);

const python_process = spawner('python3', ['./download.py', data_to_pass_in]);

python_process.stdout.on('data', (data) => {
    console.log('Data received from python script', data.toString());
});

