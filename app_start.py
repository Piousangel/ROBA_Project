from Backend import app
import json



if __name__ == "__main__":
    with open('.\setting.json', 'r', encoding='UTF-8') as f:
        json_data = json.load(f)
    
    ip = json_data['modbus']['ip']
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(host=ip, debug=True)
