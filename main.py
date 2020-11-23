from replit import db
from flask import Flask, jsonify, abort, request, make_response

app = Flask(__name__)

# Save sensor data
# Obs: limited to 5000 rows
def save_data(temperature, umidity, dateandtime, sensor):
  data_id = len(db)+1
  db[data_id] = {
    'temperature': temperature,
    'umidity': umidity,
    'dateandtime': dateandtime,
    'sensor': sensor
  }

# Dummy logic to turn on the AC
def engine_logic(sensor, umidity, temperature):
  indoor_condition = (sensor == 'I' and umidity > 0 and temperature > 22.0)
  outdoor_condition = (sensor == 'E' and umidity > 0 and temperature > 25.0)
  # True for turn on the AC
  if indoor_condition or outdoor_condition:
    return True
  # False for turn off the AC
  else:
    return False

@app.route('/controller-ac/api/v1.0/', methods=['POST'])
def run_engine():
  if not request.json or not 'temperature' in request.json or not 'sensor' in request.json:
    abort(400)
  temperature = float(request.json['temperature'])
  umidity = float(request.json.get('umidity', ""))
  # TODO: change data type
  dateandtime = str(request.json.get('dateandtime', ""))
  sensor = str(request.json['sensor'])
  save_data(temperature, umidity, dateandtime, sensor)
  response = engine_logic(sensor, umidity, temperature)
  return jsonify({'ac_response': response}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)