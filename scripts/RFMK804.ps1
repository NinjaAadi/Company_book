write-host "`n  ## NODEJS INSTALLER ## `n"

### CONFIGURATION

# nodejs
$version = "4.4.7-x64"
$url = "https://nodejs.org/download/release/v16.0.0/node-v16.0.0-x64.msi"

# git
$git_version = "2.9.2"
$git_url = "https://github.com/git-for-windows/git/releases/download/v$git_version.windows.1/Git-$git_version-64-bit.exe"

# npm packages
$gulp_version = ">=1.2.2 <1.3.0"

# extras
$vsc_exe = "$PSScriptRoot\vsc.exe"
$vsc_url = "https://go.microsoft.com/fwlink/?LinkID=623230"


# activate / desactivate any install
$install_node = $TRUE
$install_git = $TRUE
$install_gulp = $TRUE
$install_jspm = $TRUE
$install_eslint = $TRUE

write-host "`n----------------------------"
write-host " system requirements checking  "
write-host "----------------------------`n"

### require administator rights

if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
   write-Warning "This setup needs admin permissions. Please run this file as admin."     
   break
}

### nodejs version check

if (Get-Command node -errorAction SilentlyContinue) {
    $current_version = (node -v)
}
 
if ($current_version) {
    write-host "[NODE] nodejs $current_version already installed"
    $confirmation = read-host "Are you sure you want to replace this version ? [y/N]"
    if ($confirmation -ne "y") {
        $install_node = $FALSE
    }
}

write-host "`n"

### git install

if ($install_git) {
    if (Get-Command git -errorAction SilentlyContinue) {
        $git_current_version = (git --version)
    }

    if ($git_current_version) {
        write-host "[GIT] $git_current_version detected. Proceeding ..."
    } else {
        $git_exe = "$PSScriptRoot\git-installer.exe"

        write-host "No git version dectected"

        $download_git = $TRUE
        
        if (Test-Path $git_exe) {
            $confirmation = read-host "Local git install file detected. Do you want to use it ? [Y/n]"
            if ($confirmation -eq "n") {
                $download_git = $FALSE
            }
        }

        if ($download_git) {
            write-host "downloading the git for windows installer"
        
            $start_time = Get-Date
            $wc = New-Object System.Net.WebClient
            $wc.DownloadFile($git_url, $git_exe)
            write-Output "git installer downloaded"
            write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
        }
        
        write-host "proceeding with git install ..."
        write-host "running $git_exe"
        start-Process $git_exe -Wait
        write-host "git installation done"
    }
}


if ($install_node) {
    
    ### download nodejs msi file
    # warning : if a node.msi file is already present in the current folder, this script will simply use it
        
    write-host "`n----------------------------"
    write-host "  nodejs msi file retrieving  "
    write-host "----------------------------`n"

    $filename = "node.msi"
    $node_msi = "$PSScriptRoot\$filename"
    
    $download_node = $TRUE

    if (Test-Path $node_msi) {
        $confirmation = read-host "Local $filename file detected. Do you want to use it ? [Y/n]"
        if ($confirmation -eq "n") {
            $download_node = $FALSE
        }
    }

    if ($download_node) {
        write-host "[NODE] downloading nodejs install"
        write-host "url : $url"
        $start_time = Get-Date
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url, $node_msi)
        write-Output "$filename downloaded"
        write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "using the existing node.msi file"
    }

    ### nodejs install

    write-host "`n----------------------------"
    write-host " nodejs installation  "
    write-host "----------------------------`n"

    write-host "[NODE] running $node_msi"
    Start-Process $node_msi -Wait
    
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
    
} else {
    write-host "Proceeding with the previously installed nodejs version ..."
}

### npm packages install

write-host "`n----------------------------"
write-host " npm packages installation  "
write-host "----------------------------`n"

if (Get-Command gulp -errorAction SilentlyContinue) {
    $gulp_prev_v = (gulp -v)
}

if ($gulp_prev_v) {
    write-host "[GULP] Gulp is already installed :"
    write-host $gulp_prev_v
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/N]"
    if ($confirmation -ne "y") {
        $install_gulp = $FALSE
    }
}

if ($install_gulp) {
    write-host "Installing gulp-cli"
    npm install --global gulp-cli@"$gulp_version"
}

if (Get-Command jspm -errorAction SilentlyContinue) {
    $jspm_prev_v = (jspm -v)
}

if ($jspm_prev_v) {
    write-host "[JSPM] jspm is already installed :"
    write-host $jspm_prev_v
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/N]"
    if ($confirmation -ne "y") {
        $install_jspm = $FALSE
    }
}

if ($install_jspm) {
    write-host "Installing jspm globally"
    npm install --global jspm
}


if (Get-Command eslint -errorAction SilentlyContinue) {
    $eslint_prev_v = (eslint -v)
}

if ($eslint_prev_v) {
    write-host "[ESLINT] eslint is already installed :"
    write-host $eslint_prev_v

    $confirmation = read-host "Are you sure you want to replace this version ? [y/N]"
    if ($confirmation -ne "y") {
        $install_eslint = $FALSE
    }
}

if ($install_eslint) {
    write-host "Installing eslint globally"
    npm install --global eslint
}

### extras

write-host "`n----------------------------"
write-host " extra tools "
write-host "----------------------------`n"

$confirmation = read-host "[VSC] Do you want to install VS Code ? [y/N]"
if ($confirmation -eq "y") {

    $download_vsc = $TRUE

    if (Test-Path $vsc_exe) {
        $confirmation = read-host "Local VS Code install file detected. Do you want to use it ? [Y/n]"
        if ($confirmation -eq "n") {
            $download_vsc = $FALSE
        }
    }

    if ($download_vsc) {
        $start_time = Get-Date
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($vsc_url, $vsc_exe)
        write-Output "Visual Studio Code installer downloaded"
        write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    }

    write-host "starting VSC install ..."
    Start-Process $vsc_exe -Wait
    write-host "VSC installed !"
}

### clean

write-host "`n----------------------------"
write-host " system cleaning "
write-host "----------------------------`n"

$confirmation = read-host "Delete install files ? [y/N]"
if ($confirmation -eq "y") {
    if ($node_msi -and (Test-Path $node_msi)) {
        rm $node_msi
    }
    if ($git_exe -and (Test-Path $git_exe)) {
        rm $git_exe
    }
    if ($vsc_exe -and (Test-Path $vsc_exe)) {
        rm $vsc_exe
    }
}


write-host "Done !"
$mySqlRoot = "$($env:ProgramFiles)\MySQL"
$mySqlPath = "$mySqlRoot\MySQL Server 5.7"
$mySqlIniPath = "$mySqlPath\my.ini"
$mySqlDataPath = "$mySqlPath\data"
$mySqlTemp = "$($env:temp)\mysql_temp"
$mySqlServiceName = "mysql"
$mySqlRootPassword = 'root'

Write-Host "Installing MySQL Server 5.7" -ForegroundColor Cyan

Write-Host "Downloading MySQL..."
$zipPath = "$($env:temp)\mysql-5.7.27-winx64.zip"
(New-Object Net.WebClient).DownloadFile('https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.27-winx64.zip', $zipPath)

Write-Host "Unpacking..."
New-Item $mySqlRoot -ItemType Directory -Force | Out-Null
Expand-Archive $zipPath -DestinationPath "$mySqlTemp"
[IO.Directory]::Move("$mySqlTemp\mysql-5.7.27-winx64", $mySqlPath)
Remove-Item $mySqlTemp -Recurse -Force
del $zipPath

Write-Host "Installing MySQL..."
New-Item $mySqlDataPath -ItemType Directory -Force | Out-Null

@"
[mysqld]
basedir=$($mySqlPath.Replace("\","\\"))
datadir=$($mySqlDataPath.Replace("\","\\"))
"@ | Out-File $mySqlIniPath -Force -Encoding ASCII

Write-Host "Initializing MySQL..."
cmd /c "`"$mySqlPath\bin\mysqld`" --defaults-file=`"$mySqlIniPath`" --initialize-insecure"

Write-Host "Installing MySQL as a service..."
cmd /c "`"$mySqlPath\bin\mysqld`" --install $mySqlServiceName"
Start-Service $mySqlServiceName
Set-Service -Name $mySqlServiceName -StartupType Automatic 

Write-Host "Setting root password..."
cmd /c "`"$mySqlPath\bin\mysql`" -u root --skip-password -e `"ALTER USER 'root'@'localhost' IDENTIFIED BY '$mySqlRootPassword';`""

Write-Host "Verifying connection..."
(cmd /c "`"$mySqlPath\bin\mysql`" -u root --password=`"$mySqlRootPassword`" -e `"SHOW DATABASES;`" 2>&1")

Write-Host "MySQL Server installed" -ForegroundColor Green

Set-ExecutionPolicy RemoteSigned

$mongoDbPath = "C:\MongoDB" 
$mongoDbConfigPath = "$mongoDbPath\mongod.cfg"
$url = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.5.zip" 
$zipFile = "$mongoDbPath\mongo.zip" 
$unzippedFolderContent ="$mongoDbPath\mongodb-win32-x86_64-windows-4.4.5"

if ((Test-Path -path $mongoDbPath) -eq $True) 
{ 
  write-host "Seems you already installed MongoDB"
	exit 
}

md $mongoDbPath 
$webClient = New-Object System.Net.WebClient 
$webClient.DownloadFile($url,$zipFile)

$shellApp = New-Object -com shell.application 
$destination = $shellApp.namespace($mongoDbPath) 
$destination.Copyhere($shellApp.namespace($zipFile).items())

Copy-Item "$unzippedFolderContent\*" $mongoDbPath -recurse

Remove-Item $unzippedFolderContent -recurse -force 
Remove-Item $zipFile -recurse -force

<#The default MongoDB Community Edition location #>
$mongoDirectory='C:\MongoDB\bin'
#set this to the directory of the version you want to install.
$MongoPort=27017 #TCP port 27017 is the default port used by MongoDB.
#set this to the port you wish to use. Hackers will scan port 27017
# routinely to find unauthenticated servers.
#
#have an admin just for maintaining users so it can be automated safely
$Mongohost='MongoServer'
$UserAdmin='UserAdmin'
$UserAdminPassword='UserAdmin'
#and create a god-like Admin who is a system administrator
$Admin='Admin'
$AdminPassword='Admin'
# now where all your mongo database and log files are
$MongoDataPath='c:\data' # the classic default path
 #first check that we've got log and data paths: if not then create them
@("$MongoDataPath\db", "$MongoDataPath\log") | foreach{
    if (!(Test-Path -Path $_))
    {
        New-Item -ItemType directory -Path $_
    }
}

Set-Alias mongod "$mongoDirectory\mongod.exe"
Set-Alias mongo "$mongoDirectory\mongo.exe"


$content=@"
# mongod.conf
# for documentation of all options, see:
# http://docs.mongodb.org/manual/reference/configuration-options/
systemLog:
  destination: file
  path: $MongoDataPath\log\mongod.log
  logAppend: true
# Where and how to store data.
storage:
  dbPath: $MongoDataPath\db
  journal:
    enabled: true
#processManagement:
#  fork: true
net:
  port: $MongoPort
# bind_ip: 127.0.0.1 #to turn off remote access
  bindIpAll: true
processManagement:
  windowsService:
    serviceName: "MongoDB"
    displayName: "MongoDB"
    description: "mongod service"
setParameter:
  enableLocalhostAuthBypass: true
"@
 [IO.File]::WriteAllLines("$mongoDirectory\mongod.cfg" , $content)

$InstalledInstance=Get-WMIObject win32_service -Filter "name = 'MongoDB'"
if ($InstalledInstance -eq $null) { 
    #it is not running at all
    <# run mongo as a service #>
  mongod --config "$mongoDirectory\mongod.cfg" --install
}

& net start MongoDb

