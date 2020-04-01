CREATE TABLE IF NOT EXISTS targetID_to_userID (
    targetID varchar(50),
    userID int(10) unsigned,
    PRIMARY KEY(targetID),
    FOREIGN KEY(userID) REFERENCES user(userID)
);
