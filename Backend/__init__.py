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
blender = ["0", "0", "100"]
option = ['none']

@app.route("/")
@app.route("/Main", methods=["GET", "POST"])
def main():
    rs_return = run_sync_client_CanCheck()
    if rs_return == True:
        if request.method == 'POST':
            return redirect(url_for('menu_select_blending'))
        else:
            blender[0] = "0"
            blender[1] = "0"
            blender[2] = "100"
            option[0] = 'none'
            return render_template('Main.html')
    else:
        return redirect(url_for('cant_order'))


@app.route("/Order_Timeout", methods=["GET", "POST"])
def order_timeout():
    return render_template("Order_Timeout.html")


@app.route("/Can't_Order")
def cant_order():
    return render_template("Can't_Order.html")


@app.route("/Menu_Select_Blending", methods=["GET", "POST"])
def menu_select_blending():
    if request.method == 'POST':
        print("H!")
        blender[0] = request.form['Blender_1']
        blender[1] = request.form['Blender_2']
        blender[2] = request.form['Blender_3']
        print(blender[0] + " " + blender[1] + " " + blender[2])
        return redirect(url_for('menu_select_option'))
    else:
        print(blender)
        render_params= {}
        render_params['blender_1'] = blender[0]
        render_params['blender_2'] = blender[1]
        render_params['blender_3'] = blender[2]
        return render_template('Menu_Select_Blending.html', **render_params)


@app.route("/Menu_Select_Option", methods=["GET", "POST"])
def menu_select_option():
    if request.method == 'POST':
        option[0] = request.form['Option_Select']
        print(option[0])
        return redirect(url_for('confirm_order'))
    else:
        render_params= {}
        render_params['option'] = option[0]
        return render_template('Menu_Select_Option.html', **render_params)


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
        if option[0] == "1":
            render_params['option'] = "Hot"
        else: 
            render_params['option'] = "Ice"
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
    rq = client.write_registers(200, [int(blender[0]), int(blender[1]), int(blender[2])], unit=0x00)
    log.debug("***************Read Blending****************")
    rr = client.read_holding_registers(200, 3, unit=0x00)
    print("Bl_1 : " + str(rr.registers[0]) + " Bl_2 : " + str(rr.registers[1]) + " Bl_3 : " + str(rr.registers[2]))

    hot_selector = [1,0]
    if option == '1':
        hot_selector = [1,0]
    else:
        hot_selector = [0,1]

    log.debug("******************Send HOT*******************")
    rq = client.write_coils(1005, hot_selector, unit=0x00)
    log.debug("******************Read HOT*******************")
    rr = client.read_coils(1005, 2, unit=0x00)
    print("Hot:" + str(rr.bits[0]) + " Ice: " + str(rr.bits[1]))
    log.debug("******************Send Start*******************")
    rq = client.write_coils(1007, True, unit=0x00)
    log.debug("******************Read Start*******************")
    rr = client.read_coils(1007, 1, unit=0x00)
    if rr.bits[0] :
        print("Start Bit Send!")
    client.close()


def run_sync_client_CanCheck():
    client = ModbusClient('127.0.0.1', port=2004)
    client.connect()
    rr = client.read_coils(1007, 1, unit=0x00) #임의의 코일(캔의 유무)
    print(rr.bits[0])
    CanChecker = rr.bits[0]
    client.close()
    return CanChecker