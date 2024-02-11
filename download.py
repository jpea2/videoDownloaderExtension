import sys 
from pytube import YouTube
import os


input = sys.argv[1]

def Download(input):
    youtubeObject = YouTube(input)
    youtubeObject = youtubeObject.streams.get_highest_resolution()
    try:
        download_path = os.path.expanduser('~/Downloads')
        youtubeObject.download(download_path)
        print("should be working..")
    except:
        print("An error has occurred")
    print("Download is completed successfully")


data_to_pass_back = "Python Received"
output = data_to_pass_back
print(output)

Download(input)

