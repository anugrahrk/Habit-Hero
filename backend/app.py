from flask import Flask,jsonify,request
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify(message='Hello'),200

if __name__=='__main__':
    app.run(port=5000, debug=True)