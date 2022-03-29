//SPDX-License-Identifier: MIT
//CS6001 Smart Contract to Store Application Data
pragma solidity ^0.5.16;
contract Application {
 
struct Application {
  uint id;
  string Name;
  uint Category;
  string Description;
  string Location;
  uint Amount;
  uint Status;
}
 
mapping(uint => Application) public Applications;
 
uint public num;
 
  function addApplication(string calldata _Name, uint  _Category,
  string calldata _Description, string calldata _Location, uint _Amount , uint  _Status) external
  {
    num ++;
    Applications[num] = Application(num,_Name,_Category,_Description,_Location,_Amount,_Status);
  }
 
  function setStatus(uint _num, string calldata _Name, uint  _Category,
  string calldata _Description, string calldata _Location, uint _Amount , uint  _Status) external
  {
    Applications[_num] = Application(_num,_Name,_Category,_Description,_Location,_Amount,_Status);
  }
 
  function deleteElement(uint  _num) public
  {
    delete Applications[_num];
    num --;
  }
}
