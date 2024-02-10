import os
from flask import Flask, request, jsonify
import subprocess
from pytube import YouTube

def Download(link):
    youtubeObject = YouTube(link)
    youtubeObject = youtubeObject.streams.get_highest_resolution()
    try:
        download_path = os.path.expanduser('~/Downloads')
        youtubeObject.download(download_path)
    except:
        print("An error has occurred")
    print("Download is completed successfully")


#link = input("Enter the YouTube video URL: ")
#Download(link)

app = Flask(__name__)

@app.route('download.py', methods=['POST'])
def run_python_script():
    data_to_pass_in = request.json['data']

    # Run your Python script with the received data
    result = subprocess.check_output(['python3', './download.py', data_to_pass_in], text=True)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)



