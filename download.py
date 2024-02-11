import sys 
from pytube import YouTube
import os


data_to_pass_back = "Python Received"

input = sys.argv[1]
output = data_to_pass_back

print(output)
print(input)

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


Download(input)