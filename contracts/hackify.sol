// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Edufy {
    
    
    address private owner; 
    uint256 public userCount; 
    uint256 public tableCount;
   

    enum STATUS {CONTINUES,FINISHED}
    enum DIFFICULT {EASY,NORMAL,HARD} 

  
    struct User {
        uint256 id; 
        string username; 
        address walletAddress; 
        uint256 registerDate; 
        bool isVerified; 
        uint256[] partipicatedTables; //katildigi masalar
        uint256[] allTables; //tüm katıldığı masalar
        uint256 succesfulGames; //başarılı oyunları
        uint256 balances;
    }

    
    struct Table {
        uint256 id;
        address hostUser;
        string tableContent;
        string correctAnswerHash; // Doğru cevabın hash değeri
        uint256 initReward;
        uint256 rewardPool;
        address[] tableParticipants;
        uint256 tableDate;
        uint256 tableEndDate;
        STATUS tableStatus;
        address winner;
    }

    struct Submission {
        address participant;
        bytes answerHash;
        uint256 timestamp;
    }



    mapping(address => User) public users; 
    mapping(uint256 => Table) public tables; 

    mapping(uint256 => mapping(uint256 => Submission)) public tableSubmissions;
    mapping(uint256 => uint256) public submissionCount;


   

    // Fonksiyonların durum bilgileri event ile başkalarına yayın yapıyoruz
    event NewUser(uint256 id, string username, address walletAddress);
    event NewTable(uint256 id,string tableContent,uint256 initReward,uint256 tableEndDate,address tableAuthor);
    event TableParticipation(uint256 tableId,address participant,uint256 amount);
    event TableFinish(uint256 tableId,address winner,uint256 reward);
    event UserDetailsUpdated(address indexed userAddress, string newFullName, bool isVerified);
    event SubmissionSent(uint256 tableId, address indexed participant, bytes participantAnswerHash, uint256 timestamp);
    
    /* ////////////////////////////////// */
    /* /////////// CONSTRUCTOR ////////// */
    /* ////////////////////////////////// */

    // Başlangıçta ilklenmesi için constructor fonksiyonu oluşturuyoruz, kullanıcı ve post sayılarını sıfıra ayarlıyoruz.
    constructor() {
        owner = msg.sender;
        userCount=1;

        users[owner] = User({
            id: userCount,
            username: "admin",
            walletAddress: owner,
            registerDate: block.timestamp,
            isVerified: true,
            partipicatedTables: new uint256[](0), //diger katildigi tahminlerin/postların indexi
            allTables: new uint256[](0), //oluşturduğu postların/tahminlerin indexi
            succesfulGames: 0, //Kullanıcının basarili tahmin sayısını tutuyoruz
            balances : 0
        });

    }

    /* ////////////////////////////////// */
    /* /////////// MODIFIERLAR ////////// */
    /* ////////////////////////////////// */

    // Sadece adminin kullanabileceği fonksiyonları belirlemek için bir modifier oluşturuyoruz.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin can change!");
        _;
    }

    
    /* ////////////////////////////////// */
    /* /////// EXECUTE FONKSIYONLAR ///// */
    /* ////////////////////////////////// */
    
    // Contract sahipliğini başka kullanıcıya vermek için
    function setOwner(address _newOwner) external onlyOwner {  
        owner = _newOwner;
    }

    // Kullanıcı oluşturma fonksiyonu
    function registerUser(string memory _username) public {
        require(bytes(_username).length > 0, "Username is required");
        require(!isUser(msg.sender) , "This user already exist!"); //Kullanıcı yoksa devam et
        userCount+=1;
        users[msg.sender] = User({
            id: userCount,
            username: _username,
            walletAddress: msg.sender,
            registerDate: block.timestamp,
            isVerified: false, //dogrulanmis mi
            partipicatedTables: new uint256[](0), //diger katildigi masalar
            allTables: new uint256[](0), //oluşturduğu ve katıldığı masalar
            succesfulGames: 0, //Kullanıcının basarili tahmin sayısını tutuyoruz
            balances : 0
        });
        
        emit NewUser(userCount, _username, msg.sender);
    }

    // Masa oluşturma fonksiyonu
    function createTable(string memory _tableContent,string memory _answer, uint256 _initReward, uint256 _tableEndDate) public {
        require(isUser(msg.sender) , "Post olusturmak icin kullanici olmalisiniz!"); //Kullanıcı yoksa devam et
        require(bytes(_tableContent).length > 0, "Post content is required");
        require(_initReward > 0, "Bet amount must be greater than 0");
        require(_tableEndDate > block.timestamp, "End date must be in the future");

        

        tableCount+=1;

        //Post yaratıldığında ilk katılımcı olarak post sahibini ekliyoruz.
        address[] memory initialParticipants = new address[](1);
        initialParticipants[0] = msg.sender;

       
        
        tables[tableCount] = Table({
            id: tableCount, 
            hostUser : msg.sender,
            tableContent: _tableContent, 
            correctAnswerHash : _answer,
            initReward: _initReward,
            rewardPool: _initReward, //Postun toplam havuzu. Ilk yaratildiginda kahin betini post havuzuna ekledik
            tableParticipants: initialParticipants, // İlk katılımcı olarak sadece göndereni ekle
            tableDate: block.timestamp,
            tableEndDate: _tableEndDate,
            tableStatus: STATUS.CONTINUES,
            winner : address(0)
      
        });

        
        //Kullanicinin toplam tahmin sayisini guncelliyoruz
        users[msg.sender].allTables.push(tableCount);

        emit NewTable(tableCount, _tableContent, _initReward, _tableEndDate, msg.sender);
    }

    // Diğer kullanıcıların bir posta katılım fonksiyonu
    function participateInTable(uint256 _tableId, uint256 _amount ) public {
        require(_tableId <= tableCount && _tableId > 0, "Invalid table ID");
        require(tables[_tableId].tableEndDate > block.timestamp, "Post has ended.");
        require(_amount > 0, "Amount must be greater than 0");
        //Masa sahibi kendi masasına bahis yapamaz
        require(tables[_tableId].tableParticipants[0] != msg.sender,
            "Kendi masana katilim yapamazsin!");

        
        tables[_tableId].rewardPool += _amount; //Masanın havuzunu güncelliyoruz.
   
        tables[_tableId].tableParticipants.push(msg.sender); // Katılan kullanıcının cüzdan adresini katilimcilar dizisine ekledik

        users[msg.sender].partipicatedTables.push(_tableId); //Kullanıcının "diğer katıldığı masaları" güncelliyoruz.

        emit TableParticipation(_tableId, msg.sender, _amount);
        
    }

 
    function submitAnswer(uint256 _tableId, string memory _userAnswer) public {
        require(tables[_tableId].tableStatus == STATUS.CONTINUES, "Table has already finished.");
        require(block.timestamp <= tables[_tableId].tableEndDate, "Submission period has ended.");
       
        require(isParticipant(_tableId, msg.sender), "This user has not participated in this table.");
        require(tables[_tableId].tableParticipants[0] != msg.sender,
            "Kendi masana submit yapamazsin!");

         bytes memory userAnswerBytes = abi.encodePacked(_userAnswer);
         
        uint256 currentSubmissionCount = submissionCount[_tableId];
    tableSubmissions[_tableId][currentSubmissionCount] = Submission({
        participant: msg.sender,
        answerHash: userAnswerBytes,
        timestamp: block.timestamp
    });
        
        submissionCount[_tableId]++;
    emit SubmissionSent(_tableId, msg.sender, userAnswerBytes, block.timestamp); 

    }

    function determineWinner(uint256 _tableId) external onlyOwner {
        require(tables[_tableId].tableStatus == STATUS.CONTINUES, "Table has already been concluded.");
       // require(block.timestamp > tables[_tableId].tableEndDate, "Table is still active.");

        address winner;
        uint256 earliestTimestamp = type(uint256).max;
        uint256 correctSubmissions = 0;

        bytes memory correctAnswerBytes = abi.encodePacked(tables[_tableId].correctAnswerHash);


        // Submissionları kontrol et
    for (uint256 i = 0; i < submissionCount[_tableId]; i++) {
        if (keccak256(tableSubmissions[_tableId][i].answerHash) == keccak256(correctAnswerBytes)) {
            correctSubmissions++;
            if (tableSubmissions[_tableId][i].timestamp < earliestTimestamp) {
                earliestTimestamp = tableSubmissions[_tableId][i].timestamp;
                winner = tableSubmissions[_tableId][i].participant;
            }
        }
    }

        require(correctSubmissions > 0, "No correct submissions found.");

        // Kazananı belirle ve ödülü ver
    tables[_tableId].winner = winner;
    tables[_tableId].tableStatus = STATUS.FINISHED;
    users[winner].balances += tables[_tableId].rewardPool;

    // Kazanan tahmin sayısını artır
    users[winner].succesfulGames += 1;

    emit TableFinish(_tableId, winner, tables[_tableId].rewardPool);
    }


   




   



    /* //////////////////////////////////// */
    /* //////// QUERY FONKSIYONLAR //////// */
    /* //////////////////////////////////// */

    //Kullanıcı var olup olmadığını kontrol ediyoruz. True yada False dönmesini bekliyoruz.
    function isUser(address _walletAddress) public view returns (bool) {
        return users[_walletAddress].walletAddress != address(0); // Adress verdiğimiz kullanıcının adresi 0'a eşit değilse true döndürüyoruz.
    }

    function isParticipant(uint256 _tableId, address _user) internal view returns (bool) {
    for (uint256 i = 0; i < tables[_tableId].tableParticipants.length; i++) {
        if (tables[_tableId].tableParticipants[i] == _user) {
            return true;
        }
    }
    return false;
}
   
    // Kullanıcının ad ve soyadını çeken fonksiyon
    function getUserFullName(address _userAddress) public view returns (string memory) {
        return string(abi.encodePacked(users[_userAddress].username)); 
    }

    //Post bilgilerini çekme fonksiyonu
    function getTableDetails(uint256 _id) external view returns ( 
        uint256,
        address, 
        string memory, 
        string memory,
        uint256, 
        uint256, 
        address[] memory, 
        uint256, 
        uint256, 
        STATUS,
        address
        ) {
        require(tables[_id].id != 0, "Masa bulunamadi!"); // Masa varsa devam et

        Table memory table = tables[_id];

        return (
            table.id,
            table.hostUser,
            table.tableContent,
            table.correctAnswerHash,
            table.initReward,
            table.rewardPool,
            table.tableParticipants,
            table.tableDate,
            table.tableEndDate,
            table.tableStatus,
            table.winner
        );     
    }

    // Postları aktif/pasif durumuna göre listeleme fonksiyonu (Parametre 0/1 alır)
    function getAllTables() external view returns (Table[] memory) {
        Table[] memory allTables = new Table[](tableCount);

        for (uint256 i = 1; i <= tableCount; i++) {
            allTables[i - 1] = tables[i];
        }

        return allTables;
    }

    // Postları aktif/pasif durumuna göre listeleme fonksiyonu (Parametre 0/1 alır)
    function getTableByStatus(STATUS _status) external view returns (Table[] memory) {
        uint256 count = 0;

       
        for (uint256 i = 1; i <= tableCount; i++) {
            if (tables[i].tableStatus == _status) {
                count++;
            }
        }

        
        Table[] memory tablesWithStatus = new Table[](count);
        
        
        uint256 index = 0;
        for (uint256 i = 1; i <= tableCount; i++) {
            if (tables[i].tableStatus == _status) {
                tablesWithStatus[index] = tables[i];
                index++;
            }
        }

        return tablesWithStatus;
    }

    function getOwner() external view returns(address) {
         return owner;
    }

    //get User Information
    function getUser(address _walletAddress) external view returns (User memory) {
        require(isUser(_walletAddress), "Kullanici bulunamadi!");
        return users[_walletAddress];
    }

    //Get Post Information
    function getTable(uint _id) external view returns(Table memory) {
        require(tables[_id].id != 0, "Table does not exist!");
        return tables[_id];
    }

    function getUserCount() external view returns (uint) {
        return userCount;
    }

    function getTableCount() external view returns (uint) {
        return tableCount;
    }

    function getinitReward(uint256 _tableId) external view returns (uint256) {
        return tables[_tableId].initReward;
    }

    function getRewardPool(uint256 _tableId) external view returns (uint256) {
        return tables[_tableId].rewardPool;
    }

    function getTableParticipants(uint256 _tableId) external view returns (address[] memory) {
        return tables[_tableId].tableParticipants;
    }

    function getTableParticipantsCount(uint256 _tableId) external view returns (uint256) {
        return tables[_tableId].tableParticipants.length;
    }

}