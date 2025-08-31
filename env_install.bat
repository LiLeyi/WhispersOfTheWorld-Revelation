@echo off
chcp 65001 >nul

echo WhispersOfTheWorld-Revelation 项目设置脚本
echo ========================================

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
        echo   Node.js 未安装
        exit /b 1
    )
    echo   Node.js 已安装
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