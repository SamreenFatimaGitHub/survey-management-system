CREATE VIEW RATING
AS
(
SELECT * FROM 
(
SELECT SID,'Q1' AS 'QNO',ROUND(AVG(R1),1) AS 'RATING' FROM
(
SELECT SID, CASE WHEN RESPONSE1='STRONGLY DISAGREE' THEN 1
            WHEN RESPONSE1='DISAGREE' THEN 2
            WHEN RESPONSE1='NEITHER AGREE NOR DISAGREE' THEN 3
            WHEN RESPONSE1='AGREE' THEN 4
            WHEN RESPONSE1='STRONGLY AGREE' THEN 5
            WHEN RESPONSE1='VERY DISSATISFIED' THEN 1
            WHEN RESPONSE1='DISSATISFIED' THEN 2
            WHEN RESPONSE1='NEITHER SATISFIED NOR DISSATISFIED' THEN 3
            WHEN RESPONSE1='SATISFIED' THEN 4
            WHEN RESPONSE1='VERY SATISFIED' THEN 5
            WHEN RESPONSE1='EXTREMELY UNLIKELY' THEN 1
            WHEN RESPONSE1='SOMEWHAT UNLIKELY' THEN 2
            WHEN RESPONSE1='NEUTRAL' THEN 3
            WHEN RESPONSE1='SOMEWHAT LIKELY' THEN 4
            WHEN RESPONSE1='EXTREMELY LIKELY' THEN 5
            ELSE RESPONSE1 END AS R1
            FROM USER_RESPONSES
) X GROUP BY 1,2
            
UNION

SELECT SID,'Q2' AS 'QNO', ROUND(AVG(R2),1) AS 'RATING' FROM
(
SELECT SID,CASE WHEN RESPONSE2='STRONGLY DISAGREE' THEN 1
            WHEN RESPONSE2='DISAGREE' THEN 2
            WHEN RESPONSE2='NEITHER AGREE NOR DISAGREE' THEN 3
            WHEN RESPONSE2='AGREE' THEN 4
            WHEN RESPONSE2='STRONGLY AGREE' THEN 5
            WHEN RESPONSE2='VERY DISSATISFIED' THEN 1
            WHEN RESPONSE2='DISSATISFIED' THEN 2
            WHEN RESPONSE2='NEITHER SATISFIED NOR DISSATISFIED' THEN 3
            WHEN RESPONSE2='SATISFIED' THEN 4
            WHEN RESPONSE2='VERY SATISFIED' THEN 5
            WHEN RESPONSE2='EXTREMELY UNLIKELY' THEN 1
            WHEN RESPONSE2='SOMEWHAT UNLIKELY' THEN 2
            WHEN RESPONSE2='NEUTRAL' THEN 3
            WHEN RESPONSE2='SOMEWHAT LIKELY' THEN 4
            WHEN RESPONSE2='EXTREMELY LIKELY' THEN 5
            ELSE RESPONSE2 END AS R2
            FROM USER_RESPONSES
) X GROUP BY 1,2

UNION

SELECT SID,'Q3' AS 'QNO', ROUND(AVG(R3),1) AS 'RATING' FROM
(
SELECT SID,CASE WHEN RESPONSE3='STRONGLY DISAGREE' THEN 1
            WHEN RESPONSE3='DISAGREE' THEN 2
            WHEN RESPONSE3='NEITHER AGREE NOR DISAGREE' THEN 3
            WHEN RESPONSE3='AGREE' THEN 4
            WHEN RESPONSE3='STRONGLY AGREE' THEN 5
            WHEN RESPONSE3='VERY DISSATISFIED' THEN 1
            WHEN RESPONSE3='DISSATISFIED' THEN 2
            WHEN RESPONSE3='NEITHER SATISFIED NOR DISSATISFIED' THEN 3
            WHEN RESPONSE3='SATISFIED' THEN 4
            WHEN RESPONSE3='VERY SATISFIED' THEN 5
            WHEN RESPONSE3='EXTREMELY UNLIKELY' THEN 1
            WHEN RESPONSE3='SOMEWHAT UNLIKELY' THEN 2
            WHEN RESPONSE3='NEUTRAL' THEN 3
            WHEN RESPONSE3='SOMEWHAT LIKELY' THEN 4
            WHEN RESPONSE3='EXTREMELY LIKELY' THEN 5
            ELSE RESPONSE3 END AS R3
            FROM USER_RESPONSES
) X GROUP BY 1,2

UNION

SELECT SID,'Q4' AS 'QNO', ROUND(AVG(R4),1) AS 'RATING' FROM
(
SELECT SID,CASE WHEN RESPONSE4='STRONGLY DISAGREE' THEN 1
            WHEN RESPONSE4='DISAGREE' THEN 2
            WHEN RESPONSE4='NEITHER AGREE NOR DISAGREE' THEN 3
            WHEN RESPONSE4='AGREE' THEN 4
            WHEN RESPONSE4='STRONGLY AGREE' THEN 5
            WHEN RESPONSE4='VERY DISSATISFIED' THEN 1
            WHEN RESPONSE4='DISSATISFIED' THEN 2
            WHEN RESPONSE4='NEITHER SATISFIED NOR DISSATISFIED' THEN 3
            WHEN RESPONSE4='SATISFIED' THEN 4
            WHEN RESPONSE4='VERY SATISFIED' THEN 5
            WHEN RESPONSE4='EXTREMELY UNLIKELY' THEN 1
            WHEN RESPONSE4='SOMEWHAT UNLIKELY' THEN 2
            WHEN RESPONSE4='NEUTRAL' THEN 3
            WHEN RESPONSE4='SOMEWHAT LIKELY' THEN 4
            WHEN RESPONSE4='EXTREMELY LIKELY' THEN 5
            ELSE RESPONSE4 END AS R4
            FROM USER_RESPONSES
) X GROUP BY 1,2

UNION

SELECT SID,'Q5' AS 'QNO', ROUND(AVG(R5),1) AS 'RATING' FROM
(
SELECT SID,CASE WHEN RESPONSE5='STRONGLY DISAGREE' THEN 1
            WHEN RESPONSE5='DISAGREE' THEN 2
            WHEN RESPONSE5='NEITHER AGREE NOR DISAGREE' THEN 3
            WHEN RESPONSE5='AGREE' THEN 4
            WHEN RESPONSE5='STRONGLY AGREE' THEN 5
            WHEN RESPONSE5='VERY DISSATISFIED' THEN 1
            WHEN RESPONSE5='DISSATISFIED' THEN 2
            WHEN RESPONSE5='NEITHER SATISFIED NOR DISSATISFIED' THEN 3
            WHEN RESPONSE5='SATISFIED' THEN 4
            WHEN RESPONSE5='VERY SATISFIED' THEN 5
            WHEN RESPONSE5='EXTREMELY UNLIKELY' THEN 1
            WHEN RESPONSE5='SOMEWHAT UNLIKELY' THEN 2
            WHEN RESPONSE5='NEUTRAL' THEN 3
            WHEN RESPONSE5='SOMEWHAT LIKELY' THEN 4
            WHEN RESPONSE5='EXTREMELY LIKELY' THEN 5
            ELSE RESPONSE5 END AS R5
            FROM USER_RESPONSES
) X GROUP BY 1,2 
) Y ORDER BY 1,2);