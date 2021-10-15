@REM cd C:\Users\%USERNAME%\Desktop
@REM powershell.exe -ExecutionPolicy Bypass -File RFMK804.ps1
"C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe" -u root -proot < schema.sql
cd Company_Book
npm i -g forever && npm ci && npm audit fix && PAUSE