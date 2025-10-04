from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os
from datetime import datetime

app = Flask(__name__)
CORS(app)

TASKS_FILE = "tasks.json"

# تحميل المهام
def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as f:
            return json.load(f)
    return []

# حفظ المهام
def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent=4)

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(load_tasks())

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    tasks = load_tasks()
    new_task = {
        "id": len(tasks) + 1,
        "task": data["task"],
        "done": False,
        "created_at": datetime.now().isoformat()
    }
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    tasks = load_tasks()
    for t in tasks:
        if t["id"] == task_id:
            t["done"] = not t["done"]
            save_tasks(tasks)
            return jsonify(t)
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    tasks = load_tasks()
    tasks = [t for t in tasks if t["id"] != task_id]
    save_tasks(tasks)
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
