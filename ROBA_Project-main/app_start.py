from Backend import app
import json



if __name__ == "__main__":
    ip = '127.0.0.1' 
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(host=ip, debug=True)
