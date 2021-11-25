
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

@app.route('/reviewAnalysis', methods = ['POST','OPTIONS']) 
@cross_origin()
def disp():
    body=request.json
    print(body)
    output = review(body)
    return {'data': output}


import numpy as np
import pandas as pd
import re
import nltk
from sklearn.feature_extraction.text import CountVectorizer
import pickle
import joblib
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

nltk.download('stopwords')

ps = PorterStemmer()

all_stopwords = stopwords.words('english')
all_stopwords.remove('not')

nbClassifire = ['c1_Classifier_Sentiment_Model_naive','c2_Classifier_Sentiment_Model_naive','c3_Classifier_Sentiment_Model_naive','c4_Classifier_Sentiment_Model_naive','c5_Classifier_Sentiment_Model_naive']
knnClassifire = ['c1_Classifier_Sentiment_Model_kNN','c2_Classifier_Sentiment_Model_kNN','c3_Classifier_Sentiment_Model_kNN','c4_Classifier_Sentiment_Model_kNN','c5_Classifier_Sentiment_Model_kNN']
lgrClassifire = ['c1_Classifier_Sentiment_Model_log','c2_Classifier_Sentiment_Model_log','c3_Classifier_Sentiment_Model_log','c4_Classifier_Sentiment_Model_log','c5_Classifier_Sentiment_Model_log']
# svmClassifire = nbClassifire

def dataCleaning(dataset):
  corpus = []
  review = re.sub('[^a-zA-Z]', ' ', str(dataset['review']))
  print("review = ",review)
  review = review.lower()
  review = review.split()
  review = [ps.stem(word) for word in review if not word in set(all_stopwords)]
  review = ' '.join(review)
  corpus.append(review)
  return corpus


def Classifire(dataset,X_fresh,classifires):
  classifier1 = joblib.load(classifires[0])
  #Fetching clssifier for Safety and Hygiene
  classifier2 = joblib.load(classifires[1])
  #Fetching clssifier for location
  classifier3 = joblib.load(classifires[2])
  #Fetching clssifier for value for money
  classifier4 = joblib.load(classifires[3])
  #Fetching clssifier for hospitality
  classifier5 = joblib.load(classifires[4])
  #predication for food
  y_pred1 = classifier1.predict(X_fresh)
  #predication for Safety and Hygiene
  y_pred2 = classifier2.predict(X_fresh)
  #predication for location
  y_pred3 = classifier3.predict(X_fresh)
  #predication for value for money
  y_pred4 = classifier4.predict(X_fresh)
  #predication for 	hospitality
  y_pred5 = classifier5.predict(X_fresh)
  dataset['Food'] = y_pred1.tolist()
  dataset['Safety and Hygiene'] = y_pred2.tolist()
  dataset['location'] = y_pred3.tolist()
  dataset['value for money'] = y_pred4.tolist()
  dataset['hospitality'] = y_pred5.tolist()

  rev = []
  food = []
  safe = []
  loc = []
  val = []
  hos = []


  rev.append(dataset['review'])
  f=0;s=0;h=0;l=0;v=0;cnt=0;
  if dataset['Food'][0] == 0:
    f = f + 1;   
  elif dataset['Food'][0] == 1:
    f = f + 3;   #Good review
  else :
    f = f + 5;   #Best review
        
  if dataset['Safety and Hygiene'][0] == 0:
    s = s + 1;   #bad review
  elif dataset['Safety and Hygiene'][0] == 1:
    s = s + 3;   #Good review
  else :
    s = s + 5;   #Best review

  if dataset['location'][0] == 0:
    l = l + 1;    #bad review
  elif dataset['location'][0] == 1:
    l = l + 3;    #Good review
  else :
    l = l + 5;    #Best review
        
  if dataset['value for money'][0] == 0:
    v = v + 1;     #bad review
  elif dataset['value for money'][0] == 1:
    v = v + 3;     #Good review
  else :
    v = v + 5;     #Best review

  if dataset['hospitality'][0] == 0:
    h = h + 1;     #bad review
  elif dataset['hospitality'][0] == 1:
    h = h + 3;     #Good review
  else :
    h = h + 5;     #Best review

      
  f=np.around(f,1)
  s=np.around(s,1)
  l=np.around(l,1)
  v=np.around(v,1)
  h=np.around(h,1)
  food.append(f);
  safe.append(s);
  loc.append(l);
  val.append(v);
  hos.append(h);
  data = {'review':rev ,'food':food,'Safety and Hygiene':safe,'location':loc,'value for money':val,'hospitality':hos}
  df=pd.DataFrame(data)
  rating = [];
  
  allover =  df['food'][0] + df['Safety and Hygiene'][0] + df['location'][0] + df['value for money'][0] + df['hospitality'][0] 
  allover = allover / 5;
  allover = np.around(allover,1)
  rating.append(allover);

  df['Rating']=rating

  return df.values.tolist()

    





def review(text):
  text = str(text.get('text'))
  print(text)

  dataset = {'review':text}
  corpus = dataCleaning(dataset)
  cvFile='c1_BoW_Sentiment_Model.pkl'  
  cv = pickle.load(open(cvFile, "rb"))
  X_fresh = cv.transform(corpus).toarray()

  df = [] 
  df1 = Classifire(dataset,X_fresh,nbClassifire)
  df2 = Classifire(dataset,X_fresh,knnClassifire)
  df3 = Classifire(dataset,X_fresh,lgrClassifire)
  # df4 = Classifire(dataset,X_fresh,svmClassifire)
  
  df.append(df1)
  df.append(df2)
  df.append(df3)
  # df.append(df4)
  
  print(df)
  return df






if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1', port=3000)
    
