from replit import db
from flask import Flask, jsonify, abort, request
from datetime import datetime

app = Flask(__name__, static_url_path='')


# Save sensor data
# Obs: limited to 5000 rows
def save_data(temperature, humidity, dateandtime, sensor):
    data_id = len(db)
    db[data_id] = {
        'temperature': temperature,
        'humidity': humidity,
        'dateandtime': dateandtime.timestamp(),
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
    if not request.args or not 'temperature' in request.args or not 'humidity' in request.args or not 'sensor' in request.args:
        abort(400)
    temperature = float(request.args['temperature'])
    humidity = float(request.args['humidity'])
    # TODO: change data type
    date = datetime.now()
    sensor = str(request.args['sensor'])
    save_data(temperature, humidity, date, sensor)
    response = engine_logic(sensor, humidity, temperature)
    return jsonify({'ac_response': response}), 201


@app.route('/controller-ac/api/v1.0/', methods=['GET'])
def get_data():
    result = []
    for i in range(len(db)):
        result.append(db[i])
    return jsonify({'data': result}), 200


@app.route('/')
def root():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
