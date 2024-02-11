//For parsing data (links for videos to download) to python script 
import { spawn as spawner } from 'node:child_process';

function downloadVideo(videoLink) {
    console.log(videoLink)

    const data_to_pass_in = videoLink;

    console.log('Data Sent to Python', data_to_pass_in);
    /*const python_process = spawner('python3', ['download.py', data_to_pass_in]);

    python_process.stdout.on('data', (data) => {
        console.log('Data received from python script', data.toString());
    }); */
    console.log('Data Sent to Python', data_to_pass_in);

    const python_process = spawner('python3', ['download.py', data_to_pass_in]);

    python_process.stdout.on('data', (data) => {
        console.log('Data received from python script', data.toString());
    });
}



