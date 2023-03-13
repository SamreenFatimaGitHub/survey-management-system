CREATE TABLE SURVEY_QUESTIONS
(
    SID INT,
    QID INT AUTO_INCREMENT,
    QNO CHAR(2),
    QUESTION VARCHAR(300),
    PRIMARY KEY(QID),
    FOREIGN KEY(SID) REFERENCES SURVEY(SID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE VIEW Q1 AS (SELECT SID, QID, QUESTION AS QUESTION1 FROM SURVEY_QUESTIONS WHERE QNO='Q1');

CREATE VIEW Q2 AS (SELECT SID, QID, QUESTION AS QUESTION2 FROM SURVEY_QUESTIONS WHERE QNO='Q2');

CREATE VIEW Q3 AS (SELECT SID, QID, QUESTION AS QUESTION3 FROM SURVEY_QUESTIONS WHERE QNO='Q3');

CREATE VIEW Q4 AS (SELECT SID, QID, QUESTION AS QUESTION4 FROM SURVEY_QUESTIONS WHERE QNO='Q4');

CREATE VIEW Q5 AS (SELECT SID, QID, QUESTION AS QUESTION5 FROM SURVEY_QUESTIONS WHERE QNO='Q5');