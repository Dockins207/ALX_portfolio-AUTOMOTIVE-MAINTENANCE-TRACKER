from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST"]}})

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['automotive_maintenance']
records = db['maintenance_records']

# Routes
@app.route('/api/maintenance', methods=['GET'])
def get_maintenance_records():
    records_list = list(records.find({}))
    return jsonify(records_list)

@app.route('/api/maintenance', methods=['POST'])
def add_maintenance_record():
    data = request.json
    records.insert_one(data)
    return jsonify({"message": "Maintenance record added successfully"})

if __name__ == '__main__':
    app.run(debug=True)

