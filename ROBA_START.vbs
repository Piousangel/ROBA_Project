Set WinScriptHost = CreateObject( "WScript.shell" )

WinScriptHost.Run Chr(34) & ".\ROBA_START_DEBUG.bat" & Chr(34), 0

Set WinScriptHost = Nothing