from flask import Flask, render_template, request, redirect, url_for
from pymodbus.client.sync import ModbusTcpClient as ModbusClient
import logging
import json

FORMAT = ('%(asctime)-15s %(threadName)-15s '
          '%(levelname)-8s %(module)-15s:%(lineno)-8s %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.DEBUG)

UNIT = 0x1

with open('.\setting.json', 'r', encoding='UTF-8') as f:
    json_data = json.load(f)

ip = json_data['modbus']['ip']
port = json_data['modbus']['port']
name_blend_0 = json_data['blend']['blender_0']
name_blend_1 = json_data['blend']['blender_1']
name_blend_2 = json_data['blend']['blender_2']
sum_blend_0 = json_data['blend']['description_0']
sum_blend_1 = json_data['blend']['description_1']
sum_blend_2 = json_data['blend']['description_2']




app = Flask(__name__)
check_mask = [True,True,True,True,True,True,True,True,True,True,True,True,True,True,True,True]
error_msg = ["현재 로바는 비상정지중입니다",
             "현재 로바의 메인 AIR 이상입니다",
             "현재 로바의 로봇이 이상있습니다",
             "현재 로바의 캔뚜껑 상/하 이상입니다",
             "현재 로바의 캔뚜껑 클램프 이상입니다",
             "현재 로바의 ICE 축카드 이상입니다",
             "현재 로바의 HOT 축카드 이상입니다",
             "현재 로바의 ICE 공급 스태핑모터 이상입니다",
             "현재 로바의 HOT 공급 스태핑모터 이상입니다",
             "현재 로바의 ICE 캔 소재 부족입니다",
             "현재 로바의 HOT 캔 소재 부족입니다",
             "현재 로바의 그라인더1 커피부족입니다",
             "현재 로바의 그라인더2 커피부족입니다",
             "현재 로바의 그라인더3 커피부족입니다",
             "현재 로바의 캔뚜껑 부족입니다",
             "커피가 취출중입니다. 잠시 기다려 주십시오"]
blender = ["0", "0", "0"]
option = ['none']

@app.route("/")
@app.route("/Main", methods=["GET", "POST"])
def main():
    global rs_return 
    rs_return = run_sync_client_Check()
    print(rs_return)
    if rs_return == check_mask:
        if request.method == 'POST':
            return redirect(url_for('menu_select_blending'))
        else:
            blender[0] = "0"
            blender[1] = "0"
            blender[2] = "0"
            option[0] = 'none'
            return render_template('Main.html')
    else:
        return redirect(url_for('cant_order'))
        

@app.route("/Order_Timeout", methods=["GET", "POST"])
def order_timeout():
    return render_template("Order_Timeout.html")


@app.route("/Can't_Order")
def cant_order():
    render_params= {}
    num = 0
    for mask in rs_return:
        if(mask == False):
            render_params['error_message'] = error_msg[num]
            print(num)
            print(rs_return)
        num = num + 1
     
    return render_template("Can't_Order.html", **render_params)


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
        render_params['name_blend_0'] = name_blend_0
        render_params['name_blend_1'] = name_blend_1
        render_params['name_blend_2'] = name_blend_2
        render_params['sum_blend_0'] = sum_blend_0
        render_params['sum_blend_1'] = sum_blend_1
        render_params['sum_blend_2'] = sum_blend_2
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
    client = ModbusClient(ip, port=port)
    client.connect()
    log.debug("***************Send Blending****************")
    rq = client.write_registers(int("0x0000", 0), [int(blender[0]), int(blender[1]), int(blender[2])], unit=0x00)

    hot_selector = [1,0]
    if option == '1':
        hot_selector = [1,0]
    else:
        hot_selector = [0,1]

    log.debug("******************Send HOT*******************")
    rq = client.write_coils(int("0x0000", 0), hot_selector, unit=0x00)
    log.debug("******************Send Start*******************")
    rq = client.write_coils(int("0x0002", 0), True, unit=0x00) 
    client.close()


def run_sync_client_Check():
    client = ModbusClient(ip, port=port)
    client.connect()
    rr = client.read_discrete_inputs(int("0x0000", 0), 16, unit=0x00)
    client.close()
    return rr.bits