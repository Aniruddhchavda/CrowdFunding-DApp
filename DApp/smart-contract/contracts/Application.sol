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

struct Refund{
  uint id;
  uint Amount;
  string Account;
}

mapping(uint => Refund) public Refunds;

mapping(uint => Application) public Applications;

mapping(uint => mapping(address => uint)) public pledgedAmount;
 
uint public num;
uint public Rnum;
 
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

  function setAmount(uint _num, uint  _Amount, address _Account) external
  {
    Applications[_num].AmountGathered += _Amount ;
    pledgedAmount[_num][_Account] += _Amount;
  }

  function reduceAmount(uint _num, uint  _Amount, address _Account) external
  {
    Applications[_num].AmountGathered -= _Amount ;
    delete pledgedAmount[_num][_Account];
    Refunds[_num].Account = '1234';
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

function refund(uint _num, address _Account) public view returns(uint)
{
  uint amt = pledgedAmount[_num][_Account];
  return amt;
}

function requestRefund(uint _num, uint _Amount, string memory _Account) public
{
  Rnum++;
  Refunds[_num] = Refund(_num, _Amount, _Account);
}


 function getAllRefunds() public view returns (Refund[] memory){
    Refund[] memory ret = new Refund[](Rnum);
    for (uint i = 0; i < Rnum; i++) {
        ret[i] = Refunds[i+1];
    }
    return ret;
}

}
