# ROBA_Project

사용하실때 내부의 ROBA_START.bat 파일과 setting.json파일을 빼서 바탕화면에 두시면 됩니다.
ROBA_Project_main 폴더를 바탕화면에 두신 뒤, setting.json파일을 필요한 대로 수정하고 ROBA_start.bat을 실행시키면 동작합니다.

plc와 연결하지 않고 테스트를 하기 위해서는 ROBA_Project_main 폴더의 sync_server.py를 실행해 주시면 됩니다.
cmd에서 "python sync_server.py"로 실행됩니다.

필요한 파이썬 라이브러리는 pymodbus와 flask로 pip install pymodbus, pip install flask로 설치 가능합니다.

Designed by Cross_designlab
