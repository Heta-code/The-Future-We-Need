from flask import Flask, render_template, request
import pandas as pd
import joblib
import numpy as np

#Loaded the saved model
model = joblib.load('Future_We_Need.joblib')


# Create a Flask application
app = Flask("__name__", template_folder="templates")

@app.route('/')
def home():
  return render_template('index.html')


# Define the API endpoint
@app.route('/predict', methods=['POST'])
def predict():
   input_features = [float(x) for x in request.form.values()]
   features_array = np.array([input_features])
   prediction = model.predict(features_array)
  # output = le.fit_transform(prediction)
   output = prediction[0]
   return render_template('index.html', prediction_text='The Expected Stock Growth: {}'.format(output))


# Start the Flask application
if __name__ == '__main__':
    app.run(host='191.165.172.141', port='3000', debug=True)
    
