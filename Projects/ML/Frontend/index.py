
from flask import Flask, jsonify, request 
from flask_cors import CORS, cross_origin
import json
import pandas as pd
import requests
import re
from io import StringIO


# creating a Flask app 
app = Flask(__name__) 
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/show', methods = ['POST','OPTIONS']) 
@cross_origin()
def disp():
    body=request.json
    print(body)
    output = show(body)
    return {'data': output}


lgr = 'https://drive.google.com/file/d/1-3_EDnWzZuJQxXwd5IpjtIGRn57LMDU0/view?usp=sharing'
nb = 'https://drive.google.com/file/d/1LFHldcj-JrWXXHrOYzZW2mjY2WbEeqt9/view?usp=sharing'
knn = 'https://drive.google.com/file/d/1--FzLNcLB2ChHeUaU0hBLHBFP7s9Sk9_/view?usp=sharing'
# svm = 'https://drive.google.com/file/d/1--FzLNcLB2ChHeUaU0hBLHBFP7s9Sk9_/view?usp=sharing'


def show(data):

  modelName =str(data.get('modelName'))
  print(type(modelName))
  orig_url = ''

  if modelName=='nb':
      orig_url=nb
  # elif modelName=='svm':
  #   orig_url = svm  
  elif modelName=='knn':
    orig_url = knn 
  else: 
    orig_url = lgr
    



  file_id = orig_url.split('/')[-2]
  dwn_url='https://drive.google.com/uc?export=download&id=' + file_id
  url = requests.get(dwn_url).text
  csv_raw = StringIO(url)
  dfs = pd.read_csv(csv_raw, sep='delimiter', header=None,error_bad_lines=False)
  data = dfs.values.tolist()
  print(dfs)

  return data 





if __name__ == '__main__':
    app.run(debug = True)



