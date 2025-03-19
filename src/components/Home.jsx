import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaSignOutAlt } from "react-icons/fa";

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    progress: "To Do",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const priorities = ["High", "Medium", "Low"];
  const progressOptions = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        { ...newTask, id: Date.now(), completed: false }, // Use newTask.priority directly
      ]);
      setNewTask({ title: "", priority: "Medium", progress: "To Do" });
      setIsModalOpen(false);
    }
  };

  const shuffleTasks = () => {
    setIsShuffled(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
      {/* Hero Section */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-wide">Task Tracker</h1>
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition-all"
        >
          <FaSignOutAlt />
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {isLoggedIn ? (
          <>
            {/* Add Task and Shuffle Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg"
              >
                <FaPlus />
                Add Task
              </button>
              <button
                onClick={shuffleTasks}
                disabled={tasks.length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all shadow-lg ${
                  tasks.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                Shuffle Priorities
              </button>
            </div>

            {/* Task Display */}
            {!isShuffled ? (
              <div className="p-4 rounded-xl bg-opacity-20 bg-white backdrop-blur-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Added Tasks</h2>
                <div className="space-y-4">
                  {tasks.length === 0 ? (
                    <p className="text-center text-gray-300">
                      No tasks added yet.
                    </p>
                  ) : (
                    tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                          task.completed
                            ? "bg-green-200 text-gray-700 line-through"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="h-5 w-5 text-blue-600"
                          />
                          <span>
                            {task.title} (Priority: {task.priority})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={task.progress}
                            onChange={(e) =>
                              setTasks(
                                tasks.map((t) =>
                                  t.id === task.id
                                    ? { ...t, progress: e.target.value }
                                    : t
                                )
                              )
                            }
                            className="p-1 border rounded-lg text-sm text-white"
                          >
                            {progressOptions.map((option) => (
                              <option key={option} value={option} >
                                {option}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {priorities.map((priority) => (
                  <div
                    key={priority}
                    className="p-4 rounded-xl bg-opacity-20 bg-white backdrop-blur-lg shadow-lg"
                  >
                    <h2 className="text-2xl font-semibold mb-4">
                      {priority} Priority
                    </h2>
                    <div className="space-y-4">
                      {tasks
                        .filter((task) => task.priority === priority)
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                              task.completed
                                ? "bg-green-200 text-gray-700 line-through"
                                : "bg-white text-gray-800"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="h-5 w-5 text-blue-600"
                              />
                              <span>{task.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={task.progress}
                                onChange={(e) =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, progress: e.target.value }
                                        : t
                                    )
                                  )
                                }
                                className="p-1 border rounded-lg text-sm text-white"
                              >
                                {progressOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:text-red-700 transition-all"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Please log in to manage your tasks
            </h2>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </div>
        )}
      </main>

      {/* Modal for Adding Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Task title"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <select
              value={newTask.progress}
              onChange={(e) =>
                setNewTask({ ...newTask, progress: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              {progressOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={addTask}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
