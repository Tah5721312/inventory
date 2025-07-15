@echo off
SETLOCAL EnableDelayedExpansion

:: ✅ مسار المشروع (عدله حسب مكان مجلدك)
set "PROJECT_DIR=C:\Users\Administrator\Desktop\WEB\inventory"

:: الانتقال للمشروع
cd /d "%PROJECT_DIR%"

:: ✅ التحقق من وجود node_modules
IF NOT EXIST node_modules (
  echo ❌ Error: مجلد node_modules غير موجود!
  echo ▶ يجب تشغيل: npm install أولاً على جهاز متصل بالإنترنت.
  pause
  exit /b
)

:: ✅ التحقق من وجود مجلد .next (أي تم بناء المشروع سابقًا)
IF NOT EXIST .next\BUILD_ID (
  echo 📦 المشروع غير مبني... جاري تنفيذ build...
  call npm run build
  IF NOT EXIST .next\BUILD_ID (
    echo ❌ فشل البناء! تأكد من أن المشروع يعمل بشكل صحيح.
    pause
    exit /b
  )
)

:: ✅ استخراج عنوان الـ IP المحلي تلقائيًا
FOR /F "tokens=2 delims=:" %%a IN ('ipconfig ^| findstr /C:"IPv4 Address"') DO (
  set "ip=%%a"
  set "ip=!ip:~1!"
)

:: ✅ عرض العنوان وتشغيل المتصفح
echo 🌐 التطبيق متاح الآن على: http://!ip!:3000
start "" http://!ip!:3000

:: ✅ تشغيل Next.js في وضع production على الشبكة
npm run start -- -H 0.0.0.0

ENDLOCAL
pause
