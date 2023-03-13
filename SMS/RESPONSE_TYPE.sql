CREATE TABLE RESPONSE_TYPE
(
    RESPONSE_TYPE CHAR(5),
    RESPONSE_NAME VARCHAR(50) NOT NULL UNIQUE,
    RESPONSE1 VARCHAR(100) NOT NULL,
    RESPONSE2 VARCHAR(100) NOT NULL,
    RESPONSE3 VARCHAR(100) NOT NULL,
    RESPONSE4 VARCHAR(100) NOT NULL,
    RESPONSE5 VARCHAR(100) NOT NULL,
    PRIMARY KEY(RESPONSE_TYPE)
);

INSERT INTO RESPONSE_TYPE
VALUES('TYPE1','AGREE/DISAGREE','STRONGLY DISAGREE','DISAGREE','NEITHER AGREE NOR DISAGREE','AGREE','STRONGLY AGREE');

INSERT INTO RESPONSE_TYPE
VALUES('TYPE2','SATISFIED/DISSATISFIED','VERY DISSATISFIED','DISSATISFIED','NEITHER SATISFIED NOR DISSATISFIED','SATISFIED','VERY SATISFIED');

INSERT INTO RESPONSE_TYPE
VALUES('TYPE3','RATING ON SCALE 1-5','1','2','3','4','5');

INSERT INTO RESPONSE_TYPE
VALUES('TYPE4','LIKELY/UNLIKELY','EXTREMELY UNLIKELY','SOMEWHAT UNLIKELY','NEUTRAL','SOMEWHAT LIKELY','EXTREMELY LIKELY');