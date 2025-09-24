from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

TASK_FILE = "tasks.json"

# تحميل المهام من الملف
def load_tasks():
    if not os.path.exists(TASK_FILE):
        return []
    with open(TASK_FILE, "r") as f:
        return json.load(f)

# حفظ المهام في الملف
def save_tasks(tasks):
    with open(TASK_FILE, "w") as f:
        json.dump(tasks, f)

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(load_tasks())

@app.route("/tasks", methods=["POST"])
def add_task():
    tasks = load_tasks()
    data = request.json
    tasks.append({"text": data["text"], "done": False})
    save_tasks(tasks)
    return jsonify({"message": "Task added"}), 201

@app.route("/tasks/<int:index>", methods=["PUT"])
def update_task(index):
    tasks = load_tasks()
    data = request.json
    tasks[index]["done"] = data["done"]
    save_tasks(tasks)
    return jsonify({"message": "Task updated"})

@app.route("/tasks/<int:index>", methods=["DELETE"])
def delete_task(index):
    tasks = load_tasks()
    tasks.pop(index)
    save_tasks(tasks)
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
