copy forever.bat "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup" 
cd Company_Book
forever start server.js && forever start frontend.js