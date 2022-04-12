//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
contract Application {
 
struct Application {
  uint id;
  string Name;
  uint Category;
  string Description;
  string Location;
  uint AmountGathered;
  uint Amount;
  uint Status;
  string Account;
  uint Upvote;
  uint Downvote;
}
 
mapping(uint => Application) public Applications;
 
uint public num;
 
  function addApplication(string calldata _Name, uint  _Category,
  string calldata _Description, string calldata _Location, uint _AmountGathered, uint _Amount , uint _Status, string memory _Account) external
  {
    num ++;
    Applications[num] = Application(num,_Name,_Category,_Description, _Location, _AmountGathered ,_Amount,_Status,_Account,0,0);
  }
 
  function setStatus(uint _num, uint  _Status) external
  {
    Applications[_num].Status = _Status;
  }

  function setAmount(uint _num, uint  _Amount) external
  {
    Applications[_num].AmountGathered += _Amount ;
  }

  function setUpvote(uint _num) external
  {
    Applications[_num].Upvote += 1 ;
  }

  function setDownvote(uint _num) external
  {
    Applications[_num].Downvote += 1 ;
  }
 
  function deleteElement(uint  _num) public
  {
    delete Applications[_num];
    num --;
  }

 function getAllTransactions() public view returns (Application[] memory){
    Application[] memory ret = new Application[](num);
    for (uint i = 0; i < num; i++) {
        ret[i] = Applications[i+1];
    }
    return ret;
}
}
