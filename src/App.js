import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TASK_ADDRESS, TASK_ABI } from "./contracts/Task_abi";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState('');
  const [assignedAddress, setAssignedAddress] = useState('');


  const [taskID, settaskID] = useState(null)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer)
      const taskContract = new ethers.Contract(TASK_ADDRESS, TASK_ABI, signer);

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setContract(taskContract);

        settaskID(taskContract.returnDetails(0))

      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }

    } else {
      console.log("MetaMask not installed; using read-only defaults");
      const provider = ethers.getDefaultProvider();
      setAccount('Read-Only Mode');
      setContract(new ethers.Contract(TASK_ADDRESS, TASK_ABI, provider));
    }
  };

  const createTask = async () => {
    if (contract && description) {
      try {        
        await contract.createTask(description);
        console.log('Task created successfully.');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const test = () => {
    console.log(taskID)
  }

  const assignTask = async () => {
    if (contract && taskId && assignedAddress) {
      try {
        await contract.assignTask(taskId, assignedAddress);
        console.log('Task assigned successfully.');
      } catch (error) {
        console.error('Error assigning task:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <p>Your account: {account}</p>

      <div>
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createTask}>Create Task</button>
        <button onClick={test}>Create Task</button>

      </div>

      <div>
        <input
          type="number"
          placeholder="Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned Address"
          value={assignedAddress}
          onChange={(e) => setAssignedAddress(e.target.value)}
        />
        <button onClick={assignTask}>Assign Task</button>
      </div>

    </div>
  );
}

export default App;
