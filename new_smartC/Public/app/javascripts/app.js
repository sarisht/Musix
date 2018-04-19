var crypto = require("crypto");
var eccrypto = require("eccrypto");
 
function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}
function toByteArray(hexString) {
  var result = [];
  while (hexString.length >= 2) {
    result.push(parseInt(hexString.substring(0, 2), 16));
    hexString = hexString.substring(2, hexString.length);
  }
  return result;
}
function getPublic(){
  var privateKeyA = crypto.randomBytes(32);

  document.getElementById("private").innerHTML = privateKeyA.toString('hex');
  var publicKeyA = eccrypto.getPublic(privateKeyA);
  console.log(publicKeyA.toString('hex'));
 
// Encrypting the message for B. 
eccrypto.encrypt(publicKeyA, Buffer("msg to b")).then(function(encrypted) {
  // B decrypting the message. 
  eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
    console.log("Message to part B:", plaintext.toString());
  });
});
  web3.eth.defaultAccount = web3.eth.accounts[$("#address").val()];
  console.log(publicKeyA);
  contract_data.setPublicKey(publicKeyA.toString('hex'),{gas: 670000});
}

var Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


console.log(web3.eth.defaultAccount);
  var abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "price_indi",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "price_comp",
          "type": "uint256"
        }
      ],
      "name": "AddedMedia",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "indi_price",
          "type": "uint256"
        },
        {
          "name": "comp_price",
          "type": "uint256"
        },
        {
          "name": "stakeholders",
          "type": "address[]"
        },
        {
          "name": "stakes",
          "type": "uint256[]"
        }
      ],
      "name": "addEntry",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "media_id",
          "type": "bytes32"
        }
      ],
      "name": "buy",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "recipient",
          "type": "address"
        },
        {
          "name": "media_id",
          "type": "bytes32"
        },
        {
          "name": "link",
          "type": "bytes32"
        }
      ],
      "name": "sendLink",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "b",
          "type": "string"
        }
      ],
      "name": "setPublicKey",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "i",
          "type": "uint256"
        }
      ],
      "name": "setRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "bought",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "getCompPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "getIndiPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "getMedia",
      "outputs": [
        {
          "name": "id",
          "type": "bytes32"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "price_indi",
          "type": "uint256"
        },
        {
          "name": "price_comp",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "link_sent",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "links",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "media_boughtby",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "media_by_owner",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "media_list",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "mybought",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "num_bought",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "num_media",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "num_mybought",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "num_owned",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "PublicKey",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
  var add= "0x7d62535c478c15329c0bdad82ece93c37d22dfd5";
  var myContract = web3.eth.contract(abi);
  var contract_data = myContract.at(add);
  $("#button").click(function(){
    getPublic();
  })