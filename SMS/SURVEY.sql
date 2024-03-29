CREATE TABLE SURVEY
(
    SID INT AUTO_INCREMENT,
    SURVEY_NAME VARCHAR(50) NOT NULL UNIQUE,
    RESPONSE_TYPE CHAR(5),
    PRIMARY KEY(SID),
    FOREIGN KEY(RESPONSE_TYPE) REFERENCES RESPONSE_TYPE(RESPONSE_TYPE) ON UPDATE CASCADE ON DELETE CASCADE
);