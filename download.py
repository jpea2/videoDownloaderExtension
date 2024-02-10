import os
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



