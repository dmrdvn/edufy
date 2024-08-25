export const wagmiAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tableContent",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_answer",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_initReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tableEndDate",
				"type": "uint256"
			}
		],
		"name": "createTable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			}
		],
		"name": "determineWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tableContent",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "initReward",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tableEndDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tableAuthor",
				"type": "address"
			}
		],
		"name": "NewTable",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "NewUser",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "participateInTable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tableId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "participantAnswerHash",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "SubmissionSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_userAnswer",
				"type": "string"
			}
		],
		"name": "submitAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tableId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "TableFinish",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tableId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TableParticipation",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_photo",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isVerified",
				"type": "bool"
			}
		],
		"name": "updateUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newFullName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			}
		],
		"name": "UserDetailsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "photo",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			}
		],
		"name": "UserUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllTables",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "hostUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tableContent",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "correctAnswerHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "initReward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewardPool",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "tableParticipants",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "tableDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tableEndDate",
						"type": "uint256"
					},
					{
						"internalType": "enum Edufy.STATUS",
						"name": "tableStatus",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					}
				],
				"internalType": "struct Edufy.Table[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			}
		],
		"name": "getinitReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			}
		],
		"name": "getRewardPool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTable",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "hostUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tableContent",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "correctAnswerHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "initReward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewardPool",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "tableParticipants",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "tableDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tableEndDate",
						"type": "uint256"
					},
					{
						"internalType": "enum Edufy.STATUS",
						"name": "tableStatus",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					}
				],
				"internalType": "struct Edufy.Table",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Edufy.STATUS",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "getTableByStatus",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "hostUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tableContent",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "correctAnswerHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "initReward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewardPool",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "tableParticipants",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "tableDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tableEndDate",
						"type": "uint256"
					},
					{
						"internalType": "enum Edufy.STATUS",
						"name": "tableStatus",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					}
				],
				"internalType": "struct Edufy.Table[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTableCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTableDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "enum Edufy.STATUS",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			}
		],
		"name": "getTableParticipants",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableId",
				"type": "uint256"
			}
		],
		"name": "getTableParticipantsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "registerDate",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isVerified",
						"type": "bool"
					},
					{
						"internalType": "uint256[]",
						"name": "partipicatedTables",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "allTables",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "succesfulGames",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "balances",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "photo",
						"type": "string"
					}
				],
				"internalType": "struct Edufy.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserFullName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "isUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "submissionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tableCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tables",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "hostUser",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tableContent",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "correctAnswerHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "initReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rewardPool",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tableDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tableEndDate",
				"type": "uint256"
			},
			{
				"internalType": "enum Edufy.STATUS",
				"name": "tableStatus",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tableSubmissions",
		"outputs": [
			{
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "answerHash",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "registerDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "succesfulGames",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balances",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "photo",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] as const;