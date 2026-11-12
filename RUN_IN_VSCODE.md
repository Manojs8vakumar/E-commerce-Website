# 🚀 How to Run "Just Buy It" in VS Code (Standalone)

This project is 100% self-contained and can be run directly inside **Visual Studio Code** on your computer without any AI assistant or external dependencies.

---

## 📋 Prerequisites (One-Time Check)

Make sure you have these two installed on your computer:

1. **Java 21 LTS**  
   Check in terminal: `java -version`  
   *(If not installed, download [Eclipse Temurin 21](https://adoptium.net/) or Microsoft OpenJDK 21).*

2. **Node.js (v18 or higher)**  
   Check in terminal: `node -v`  
   *(If not installed, download from [nodejs.org](https://nodejs.org/)).*

---

## ⚡ Option 1: One-Click Run (Easiest & Recommended)

You can launch both the **Spring Boot backend** and the **React Vite frontend** with a single click:

1. Open the project folder in VS Code (`File > Open Folder... > d:\pr3`).
2. Open the built-in terminal (`Ctrl + ~`) and type:
   ```powershell
   .\run.bat
   ```
   *(Or simply double-click `run.bat` in File Explorer).*

3. Two dedicated terminal windows will open:
   - 🟢 **Just Buy It - Backend [Port 8082]**
   - 🔵 **Just Buy It - Frontend [Port 5173]**
4. Your default browser will automatically open [http://localhost:5173](http://localhost:5173)!

---

## 🛠️ Option 2: Run Using VS Code Tasks (`Ctrl + Shift + B`)

Preconfigured VS Code tasks are included in `.vscode/tasks.json`:

1. Press **`Ctrl + Shift + B`** (or go to **Terminal > Run Build Task...** from top menu).
2. Hit Enter to run:
   ```
   🚀 Run Full-Stack (Backend + Frontend)
   ```
3. VS Code will automatically start both the backend on port `8082` and frontend on port `5173` inside dedicated terminal tabs side-by-side in VS Code!

---

## 💻 Option 3: Run via VS Code Integrated Terminal (Manual)

If you prefer running the commands yourself in the VS Code terminal:

### Terminal 1 — Start Backend:
```powershell
cd backend
.\mvnw.cmd spring-boot:run -DskipTests
```
*(Wait until you see `Started JustbuyitApplication on port 8082`)*

### Terminal 2 — Start Frontend:
Click the **`+`** or **Split Terminal** icon in the terminal panel:
```powershell
cd frontend
npm.cmd run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!

> 💡 **Windows PowerShell Tip:** Always use `npm.cmd` instead of `npm` if PowerShell shows an execution policy warning (`npm.ps1 cannot be loaded`).

---

## 🐞 Option 4: Run & Debug in VS Code (`F5`)

If you have the **Extension Pack for Java** installed in VS Code:

1. Open the **Run and Debug** view (`Ctrl + Shift + D`).
2. Select **`☕ Debug Spring Boot (Backend)`** or **`🚀 Full Stack: Spring Boot + Chrome`**.
3. Press **`F5`**.
4. Set breakpoints in Java controllers/services and debug live!

---

## 🛑 How to Stop the Servers

- In terminal windows: press **`Ctrl + C`** and type `Y`.
- Or run the included port killer script to free both ports immediately:
  ```powershell
  .\stop-all.bat
  ```

---

## 🌐 Live Service URLs

| Service | URL | Details |
| :--- | :--- | :--- |
| **Storefront Web App** | [http://localhost:5173](http://localhost:5173) | React 19 + Tailwind CSS UI |
| **Spring Boot REST API** | [http://localhost:8082/api](http://localhost:8082/api) | Products, orders, and deals |
| **H2 Database Web Console**| [http://localhost:8082/h2-console](http://localhost:8082/h2-console) | **JDBC URL:** `jdbc:h2:mem:justbuyitdb`<br>**User:** `sa`<br>**Password:** *(leave blank)* |

---

## 🔧 Troubleshooting

- **Error: `Port 8082 is already in use` or `Port 5173 is in use`:**  
  Run `.\stop-all.bat` in the terminal to kill old orphaned processes.
- **Error: `npm : File ... npm.ps1 cannot be loaded`:**  
  Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in PowerShell, or run `npm.cmd run dev`.
- **First time missing `node_modules`:**  
  Run `cd frontend && npm.cmd install`.
