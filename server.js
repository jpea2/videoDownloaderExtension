// server.js
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors());



const port = 3000;

app.use(express.json());

app.post('/download-video', (req, res) => {
    const videoLink = req.body.videoLink;
    console.log (videoLink)

    const pythonProcess = spawn('python3', ['./download.py', videoLink]);

    pythonProcess.stdout.on('data', (data) => {
        console.log('Data received from python script', data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script process closed with code ${code}`);
        // Now send the response after the Python script has completed
        res.send('Request received and processing...');
    });
});


app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
}); 



