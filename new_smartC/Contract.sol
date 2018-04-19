pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;
contract MusicChain {
    
    Media md;
    mapping (address => uint) public users;//1 -> creator, 2 -> indi, 3 -> company
    int public num_media = 0;
    bytes32[] public media_list; //stores all medias in list 
    mapping (bytes32 => Media) public getMedia; //between hash of media and media
    mapping (bytes32 => mapping (address => bool)) public bought;
    mapping (bytes32 => uint) public getIndiPrice;
    mapping (bytes32 => uint) public getCompPrice;
    mapping (bytes32 => address[]) public mybought;
    mapping (bytes32 => int) public num_mybought;
    mapping (address => bytes32[]) public media_by_owner;
    mapping (address => int) public num_owned;
    mapping (address => mapping(bytes32 => string)) public links;  //Media Hash and the link uploaded by creator
    mapping (bytes32 => mapping(address => bool)) public link_sent;
    mapping (address => bytes32[]) public media_boughtby;
    mapping (address => int) public num_bought;
    mapping (address => string) public PublicKey;
    
    event AddedMedia(
        string title,
        uint price_indi,
        uint price_comp
    );
    
    struct Media{
        bytes32 id;
        address owner;
        string title;
        uint price_indi;
        uint price_comp;
        address[] stakeholders;
        uint[] stakes;
    }
    
    function MusicChain() public{
    }
    
    function setPublicKey(string b) public{
        PublicKey[msg.sender] = b;
    }
    
    function setRole(uint i) public {
        users[msg.sender] = i;
    }
    
    function addEntry(string title, uint indi_price,uint comp_price, address[] stakeholders, uint[] stakes) public returns (bytes32){
        if (users[msg.sender]!=1) revert();
        uint sum_stakes = 0;
        for (uint i = 0; i < stakes.length; i++){
            sum_stakes += stakes[i];
        }
        if (sum_stakes != 100) revert();
        md = Media(keccak256(msg.sender,title, indi_price,comp_price), msg.sender, title ,indi_price,comp_price, stakeholders, stakes);
        getMedia[md.id] = md;
        media_list.push(md.id);
        num_media +=1;
        getIndiPrice[md.id] = indi_price;
        getCompPrice[md.id] = comp_price;
        bytes32[] k = media_by_owner[msg.sender];
        k.push(md.id);
        media_by_owner[msg.sender] = k;
        num_owned[msg.sender]+=1;
        AddedMedia(title, indi_price, comp_price);
        return md.id;
    }

    function buy(bytes32 media_id) payable public {
        Media storage md1 = getMedia[media_id];
        if ((users[msg.sender])== 1) revert();
        if ((users[msg.sender] == 2) &&(msg.value!=md1.price_indi)) revert();
        if ((users[msg.sender] == 3) &&(msg.value!=md1.price_comp)) revert();

        if (bought[media_id][msg.sender]) revert();
        address[] k = mybought[media_id];
        k.push(msg.sender);
        mybought[media_id] = k;
        num_mybought[media_id] = num_mybought[media_id]+1;
        (bought[media_id])[msg.sender] = true;
        bytes32[] l = media_boughtby[msg.sender];
        l.push(media_id);
        media_boughtby[msg.sender] = l;
        num_bought[msg.sender] +=1;
    }
    
    function sendLink(address recipient,bytes32 media_id, string link) public{
        md = getMedia[media_id];
        if (msg.sender != md.owner) revert();
        links[recipient][media_id] = link;
        uint money;
        if ((users[recipient]) == 2){
            money = md.price_indi;
        }
        else if ((users[recipient])== 3){
            money = md.price_comp;
        }
        for (uint i = 0; i < md.stakeholders.length;i++){
            md.stakeholders[i].transfer(md.stakes[i]*money/100);
        }
        link_sent[media_id][recipient] = true;
    }
    
}