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
          
          <h1 className='font-bold underline text-xl mb-5'> Abstract </h1>
          <p> In today's dynamic and collaborative work environments, efficient task management as well transparency and trust is crucial for productivity and success. However, existing task management systems lack transparency and face challenges related to data integrity and accountability. This whitepaper introduces a solution that leverages blockchain technology to create a transparent and immutable task management system. By combining the benefits of decentralized ledgers and smart contracts, this proof-of-concept solution addresses the shortcomings of traditional systems and establishes irrefutable trust systems and efficiency in task management.</p>
          
          <h1 className='font-bold underline text-xl mb-5 mt-5'> Problem Statement </h1>
          <p className='font-bold mt-2'>1.) Immutable and transparent records:</p>
          The current state of task management systems lacks a robust mechanism for verifying the authenticity of task completions. Without an accountable record-keeping mechanism, individuals can take undue credit for tasks they didn't complete. This issue is particularly prevalent in scenarios where individuals are hesitant to speak up and verify their contributions. For instance, if person X completes a task but is too shy to assert their accomplishment, person Y might falsely claim the task as their own. This results in a distorted perception of task completion and undermines the trust within teams or organizations.

          <p className='font-bold mt-2'>2.) Accountability and Disputes:</p>
          In traditional systems, accountability for task completion often relies on manual reports or unreliable communication channels. This lack of a verifiable source of truth can lead to disputes and misunderstandings. For example, if a team member disputes their assignment to a particular task, there is no irrefutable evidence to settle the disagreement. This can lead to friction within teams, wasted time on resolution, and a decrease in overall productivity.

          <p className='font-bold mt-2'>3.) Lack of Auditability:</p>
          Auditing the task management process in traditional systems is complex and error-prone. Without a secure and transparent record of task assignments and completions, audits can involve time-consuming investigations and may not yield accurate results. In the absence of an immutable record, tasks can be inadvertently omitted or misrepresented, making it difficult to establish compliance or track historical task progression.



          <h1 className='font-bold underline text-xl mb-5 mt-5'> Solution </h1>
          <p> Task Manager uses a decentralized approach to task management by leveraging blockchain technology, specifically the Ethereum blockchain. Smart contracts are utilized to represent individual tasks, each with a unique identifier, description, assigned personnel, and completion status. The use of blockchain ensures that all records are immutable, tamper-proof, and transparent, thus eliminating the possibility of false claims or data manipulation.</p>
          <p className='mt-2'>The process begins with the creation of tasks. Managers or administrators can create new tasks by submitting task descriptions to the smart contract. Once created, tasks are assigned to specific individuals by associating their Ethereum addresses with the tasks. This assignment is recorded on the blockchain, making it publicly accessible and verifiable by all parties involved.</p>
          <p className='mt-2'>As tasks are completed, the assigned individuals can mark their tasks as complete through the smart contract. This action triggers a change in the task's status within the blockchain, providing an auditable and tamper-proof record of the completion. The transparency of the blockchain ensures that task completion status can be easily verified by managers, team members, or any authorized parties.</p>
          <p className='mt-2'>Since the records are immutable, there's no room for false claims or misrepresentation of completed work. This promotes honesty and prevents individuals from taking credit for work they did not do. Their is no way for someone to change another record to point toward their own address (to take credit for that work). Faking completing a task would be visible to everyone (managers, peers, etc) and evicted from the blockchain as soon as a peer denies the new blockchain status. In case of disputes or misunderstandings, the system provides an objective and unalterable record of task assignments and completions, making conflict resolution easier.</p>

          <h1 className='font-bold underline text-xl mb-5 mt-5'> Summary </h1>
          <p>The blockchain-based approach of Task Manager brings several advantages. It ensures data integrity and prevents unauthorized modifications. It eliminates the need for intermediaries or centralized authorities to validate task completion, as the blockchain itself serves as the source of truth. Furthermore, the system promotes accountability and trust among team members, as every task assignment and completion is permanently recorded and publicly accessible.</p>
          <p>In summary, Task Manager presents a solution to the challenges of traditional task management systems. By harnessing the power of blockchain technology, it creates an environment of transparency, accountability, and efficiency that enhances collaboration and productivity in diverse work environments.</p>

          

        </div>

      </div>
    </div>
  );
  
}

export default App;
