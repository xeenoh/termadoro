# Termadoro

- A beautiful terminal-based Pomodoro tracker with tag support and real-time reports.


# ✅ Features

- Tag your pomodoro sessions.
- Control the pomodoro timer by pausing/resuming the timer.
- Cross-platform notifications after finishing the session.
- Get a report of your past pomodoro sessions and total durations.
- View a report of your top 6 tags (topics) you've worked on.
--- 
## Install
```bash
$ npm install --global termadoro
```

##  CLI

  ```
	Usage
	  $ terma
	Options
		--name  Your name
        --session Session Length
		--tags 
		--report  <logs , tags>

	Examples
	  $ terma --session 1h20m1s
	  $ terma --session 1h20m1s --tags "focus,deepwork"
	  $ terma --report logs    "Detailed Logs of past pomodoros"
	  $ terma --report tags    "Detailed Logs of past tags and its durations"
  
  NOTE: Any Pomodoro duration less than 10 minutes won't be saved in the log 
```

# 📷 Screenshots
<table>
  <tr>
    <td><img src="assets/screenshots/logs.png" alt="Pomodoro Logs" width="300"></td>
    <td><img src="assets/screenshots/tag-log.png" alt="Tags Logs" width="300"></td>
  </tr>
  <tr>
    <td><img src="assets/screenshots/timer.png" alt="Timer" width="300"></td>
    <td><img src="assets/screenshots/paused-timer.png" alt="Photo 4" width="300"></td>
  </tr>
</table>

---
# ⚙️ Technologies
1. Ink  + React
2. Nodejs
3. Typescript
3. Sqlite3 
4. Vitest for testing
---

# Dependency
- Sqlite DB

---
# 📝 DB Schema
```mermaid
erDiagram
    TAGS {
        INTEGER id PK
        TEXT name "Unique, NOCASE"
    }
    POMODOROS {
        INTEGER id PK
        TEXT start_datetime "Unique timestamp"
        TEXT end_datetime "Unique timestamp"
        INTEGER duration
    }
    POMODORO_TAGS {
        INTEGER id PK
        INTEGER tags_id FK
        INTEGER pomodoro_id FK
    }

    TAGS ||--o{ POMODORO_TAGS : has
    POMODOROS ||--o{ POMODORO_TAGS : has
```