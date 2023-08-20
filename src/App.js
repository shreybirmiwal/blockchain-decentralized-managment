import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TASK_ADDRESS, TASK_ABI } from "./contracts/Task_abi";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState('');
  const [taskId2, setTaskId2] = useState('');

  const [assignedAddress, setAssignedAddress] = useState('');


  const [taskContractWithSigner, settaskContractWithSigner] = useState(null)
  const [getTransaction, setTransactionGet] = useState('');
  const [returnedDetails, setReturnedDetails] = useState('')

  const loadData = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const taskContract = new ethers.Contract(TASK_ADDRESS, TASK_ABI, signer);
      settaskContractWithSigner(taskContract.connect(signer))

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setContract(taskContract);
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

  useEffect(() => {
    loadData();
  }, []);

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

  const test = async () => {
    setReturnedDetails (await taskContractWithSigner.returnDetails(getTransaction));
    console.log(returnedDetails)
  };


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

  const completeTask = async () => {
    if (contract && taskId2) {
      try {
        await contract.completeTask(taskId2);
        console.log('Task completed successfully.');
      } catch (error) {
        console.error('Error completing task:', error);
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

      <div>
        <input
          type="number"
          placeholder="Task ID"
          value={taskId2}
          onChange={(e) => setTaskId2(e.target.value)}
        />
        <button onClick={completeTask}>Complete Task</button>
      </div>

      <input value={getTransaction} onChange={(e) => setTransactionGet(e.target.value)} placeholder='Get transaction from id'/>
      <button onClick={test}>Get Transaction </button>
      <p>Task: {returnedDetails[1]}</p>
      <p>Assigned: {returnedDetails[2]}</p>
      <p>Completed: {'' + returnedDetails[3]}</p>

    </div>
  );
}

export default App;
