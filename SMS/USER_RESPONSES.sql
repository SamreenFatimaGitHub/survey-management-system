CREATE TABLE USER_RESPONSES
(
    SID INT NOT NULL,
    NAME VARCHAR(50) NOT NULL,
    RESPONSE1 VARCHAR(100) NOT NULL,
    RESPONSE2 VARCHAR(100) NOT NULL,
    RESPONSE3 VARCHAR(100) NOT NULL,
    RESPONSE4 VARCHAR(100) NOT NULL,
    RESPONSE5 VARCHAR(100) NOT NULL,
    PRIMARY KEY(SID, NAME),
    FOREIGN KEY(SID) REFERENCES SURVEY(SID) ON UPDATE CASCADE ON DELETE CASCADE
);