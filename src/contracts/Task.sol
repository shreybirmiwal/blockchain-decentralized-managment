// Task contract
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        uint256 taskId;
        string description;
        address assignedTo;
        bool completed;
    }

    Task[] public tasks;
    uint256 public taskIdCounter;

    event TaskCreated(uint256 taskId, string description);
    event TaskAssigned(uint256 taskId, address assignedTo);
    event TaskCompleted(uint256 taskId);

    function createTask(string memory _description) public {
        tasks.push(Task(taskIdCounter, _description, address(0), false));
        emit TaskCreated(taskIdCounter, _description);
        taskIdCounter++;
    }

    function assignTask(uint256 _taskId, address _assignedTo) public {
        require(_taskId < tasks.length, "Task does not exist");
        tasks[_taskId].assignedTo = _assignedTo;
        emit TaskAssigned(_taskId, _assignedTo);
    }

    function completeTask(uint256 _taskId) public {
        require(_taskId < tasks.length, "Task does not exist");
        require(tasks[_taskId].assignedTo == msg.sender, "You are not assigned to this task");
        tasks[_taskId].completed = true;
        emit TaskCompleted(_taskId);
    }

    function returnDetails(uint256 _taskId) public view returns (uint256, string memory, address, bool) {
        require(_taskId < tasks.length, "Task does not exist");

        Task storage task = tasks[_taskId];
        return (task.taskId, task.description, task.assignedTo, task.completed);
    }


}
