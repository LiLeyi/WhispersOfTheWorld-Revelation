@echo off
chcp 65001 >nul

echo WhispersOfTheWorld-Revelation 项目设置脚本
echo ========================================

set "DEFAULT_NODE_VERSION=20.17.0"
set "NODE_VERSION=%DEFAULT_NODE_VERSION%"

if "%1" NEQ "" (
    set "NODE_VERSION=%1"
)

echo 指定Node.js版本: %NODE_VERSION%

echo 检查环境...
call :check_environment
if %ERRORLEVEL% neq 0 (
    echo 环境检查失败
    goto end
)

echo 安装依赖...
call :install_dependencies
if %ERRORLEVEL% neq 0 (
    echo 依赖安装失败
    goto end
)

echo 启动开发服务器...
call :start_dev_server
if %ERRORLEVEL% neq 0 (
    echo 启动失败
    goto end
)

:end
echo.
echo 按任意键结束...
pause >nul
exit /b 0

:check_environment
    echo   检查 Node.js...
    node --version >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        echo   Node.js 未安装，正在尝试自动安装...
        call :install_nodejs
        if %ERRORLEVEL% neq 0 (
            echo   Node.js 安装失败
            exit /b 1
        )
        echo   Node.js 安装完成
    )
    echo   Node.js 已安装
    exit /b 0

:install_nodejs
    echo   检查 winget 是否可用...
    winget --version >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        echo   winget 不可用，正在尝试使用 PowerShell 安装...
        powershell -Command "Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe" >nul 2>&1
        winget --version >nul 2>&1
        if %ERRORLEVEL% neq 0 (
            echo   winget 安装失败，请手动安装 Node.js
            exit /b 1
        )
    )
    
    echo   使用 winget 安装 Node.js v%NODE_VERSION%...
    winget install OpenJS.NodeJS --version %NODE_VERSION% --silent --accept-package-agreements --accept-source-agreements
    if %ERRORLEVEL% neq 0 (
        echo   尝试安装最新版本的 Node.js...
        winget install OpenJS.NodeJS --silent --accept-package-agreements --accept-source-agreements
        if %ERRORLEVEL% neq 0 (
            echo   安装失败，尝试再次运行该程序
            start %0
            exit /b 1
        )
    )

    echo   验证安装...
    timeout /t 3 /nobreak >nul
    node --version >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        echo   安装验证失败，请手动重启命令行窗口后重试
        exit /b 1
    )
    
    exit /b 0

:install_dependencies
    echo   安装项目依赖...
    if exist pnpm-lock.yaml (
        echo   使用 pnpm 安装依赖
        pnpm install >nul 2>&1
    ) else (
        echo   使用 npm 安装依赖
        npm install >nul 2>&1
    )
    exit /b %ERRORLEVEL%

:start_dev_server
    echo   启动开发服务器...
    if exist pnpm-lock.yaml (
        pnpm run dev
    ) else (
        npm run dev
    )
    exit /b %ERRORLEVEL%