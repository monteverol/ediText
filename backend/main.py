import os
import time
from datetime import datetime
from flask import Flask

app = Flask(__name__)

UPLOAD_FOLDER = './data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/getTextFiles')
def get_text_files_data():
    """Read contents of all .txt files in the upload folder."""
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    file_data = {}
    for file_name in files:
        if file_name.endswith('.txt'):
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
            with open(file_path, 'r') as file:
                file_data[file_name.replace('.txt', '')] = file.read()
    return file_data

@app.route('/time')
def get_current_time():
    # Get the current time as a Unix timestamp
    current_timestamp = time.time()
    # Convert the timestamp to a datetime object
    current_datetime = datetime.fromtimestamp(current_timestamp)
    # Format the datetime object as MM/DD/YYYY
    formatted_date = current_datetime.strftime('%m/%d/%Y')

    print(formatted_date)
    
    return {'time': formatted_date}