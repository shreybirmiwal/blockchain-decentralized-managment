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
    <div className="grid grid-cols-2">

      <div className='m-5 mt-10 items-center'>
  
        <h1 className='font-bold text-4xl'>Task Manager</h1>

        <p className='mt-5 text-lg'>Your account: {account}</p>
  
        <div className="mt-5">
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='bg-gray-100 p-3'
          />
          <button onClick={createTask} className='ml-5 bg-gray-100 hover:bg-gray-300 p-3'>Create Task</button>
        </div>
  
        <div className="mt-5">
          <input
            type="number"
            placeholder="Task ID"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className='bg-gray-100 p-3'
          />
          <input
            type="text"
            placeholder="Assigned Address"
            value={assignedAddress}
            onChange={(e) => setAssignedAddress(e.target.value)}
            className='bg-gray-100 p-3 ml-5'
          />
          <button onClick={assignTask} className='ml-5 bg-gray-100 hover:bg-gray-300 p-3'>Assign Task</button>

        </div>
  
        <div className="mt-5">
          <input
            type="number"
            placeholder="Task ID"
            value={taskId2}
            onChange={(e) => setTaskId2(e.target.value)}
            className='bg-gray-100 p-3'
          />
          <button onClick={completeTask} className='ml-5 bg-gray-100 hover:bg-gray-300 p-3'>Complete Task</button>
        </div>

        <div className='mt-5'>
          <input
            value={getTransaction}
            onChange={(e) => setTransactionGet(e.target.value)}
            placeholder='Get task from id'
            className='bg-gray-100 p-3'
          />
          <button onClick={test} className='ml-5 bg-gray-100 hover:bg-gray-300 p-3'>Get Task</button>    
        </div>


        <div className="mt-10 bg-stone-50">
          <h1 className='font-bold text-2xl'>Task Info</h1>
          <p className='mt-5'>Task: {returnedDetails[1]}</p>
          <p className='mt-5'>Assigned: {returnedDetails[2]}</p>
          <p className='mt-5'>Completed: {'' + returnedDetails[3]}</p>
        </div>
  
      </div>
  
      <div className='flex flex-col items-center m-5'>

        <h1 className='font-bold text-4xl mt-5'> Decentralized Task Management: A Transparent and Immutable Solution </h1>
        <div className='overflow-scroll h-h-150 mt-5'>
          <p>
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          In today's dynamic and collaborative work environments, efficient task management is crucial for productivity and success. However, existing task management systems often lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a groundbreaking solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, our solution addresses the shortcomings of traditional systems and establishes a new era of trust and efficiency in task management.
          </p>
        </div>
  
      </div>
    </div>
  );
  
}

export default App;
