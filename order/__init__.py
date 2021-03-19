from flask import Flask, render_template, request, redirect, url_for
from pymodbus.client.sync import ModbusTcpClient as ModbusClient
import logging
FORMAT = ('%(asctime)-15s %(threadName)-15s '
          '%(levelname)-8s %(module)-15s:%(lineno)-8s %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.DEBUG)

UNIT = 0x1


app = Flask(__name__)
blender = [0, 0, 0]
option = [0]

@app.route("/")
@app.route("/Main", methods=["GET", "POST"])
def main():
    if request.method == 'POST':
        return redirect(url_for('menu_select_blending'))
    else:
        return render_template('Main.html')


@app.route("/Menu_Select_Blending", methods=["GET", "POST"])
def menu_select_blending():
    if request.method == 'POST':
        blender[0] = request.form['Blender_1']
        blender[1] = request.form['Blender_2']
        blender[2] = request.form['Blender_3']
        print(blender[0] + " " + blender[1] + " " + blender[2])
        return redirect(url_for('menu_select_option'))
    else:
        return render_template('Menu_Select_Blending.html')


@app.route("/Menu_Select_Option", methods=["GET", "POST"])
def menu_select_option():
    if request.method == 'POST':
        option[0] = request.form['Option_Select']
        print(option[0])
        return redirect(url_for('confirm_order'))
    else:
        return render_template('Menu_Select_Option.html')


@app.route("/Confirm_Order", methods=["GET", "POST"])
def confirm_order():
    if request.method == 'POST':
        run_sync_client()
        return redirect(url_for('complete_order'))
    else:
        render_params = {}
        render_params['blender_1'] = blender[0]
        render_params['blender_2'] = blender[1]
        render_params['blender_3'] = blender[2]
        render_params['option'] = option[0]
        return render_template('Confirm_Order.html', **render_params)


@app.route("/Complete_Order", methods=["GET", "POST"])
def complete_order():
    if request.method == 'POST':
        return redirect(url_for('complete_order'))
    else:
        return render_template('Complete_Order.html')


def run_sync_client():
    client = ModbusClient('127.0.0.1', port=2004)
    client.connect()
    log.debug("***************Send Blending****************")
    rq = client.write_registers(200, [int(blender[0]), int(blender[1]), int(blender[2])])
    log.debug("***************Read Blending****************")
    rr = client.read_holding_registers(200, 3)
    log.debug(rr)

    hot_selector = [1,0]
    if option == '1':
        hot_selector = [1,0]
    else:
        hot_selector = [0,1]

    log.debug("******************Send HOT*******************")
    rq = client.write_coils(1005, hot_selector)
    log.debug("******************Read HOT*******************")
    rr = client.read_coils(1005, 2)
    log.debug(rr)
    log.debug("******************Send Start*******************")
    rq = client.write_coils(1007, 1)
    log.debug("******************Read Start*******************")
    rr = client.read_coils(1007, 1)
    log.debug(rr)

    client.close()