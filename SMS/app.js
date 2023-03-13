var express = require('express');
 
var app = express();
 
app.get("/", function(req, res){
	res.send("Test response from Survey Management System");
});


app.listen(3000, function () {
	console.log('Survey Management System : Web Application listening on port 3000!');
});


var mysql = require('mysql'); 
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password : 'password',
	database: 'SMS',
	multipleStatements: true
});


con.connect(function(error){
	if(error) throw error;
	console.log("Connected to mysql!");
});


var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));


app.set("view engine","ejs");


app.get("/home", function(req, res){
	res.render("home");
});


app.post("/home", function(req, res){
	res.render("home");
});


app.post("/createSurvey", function(req,res){
	var q="SELECT RESPONSE_TYPE, RESPONSE_NAME FROM RESPONSE_TYPE";
	con.query(q,function(error,results){
		if(error) throw error;
		res.render("createSurvey",{data:results});
	});
});


app.post("/submitQuestions", function(req,res){
	var q="SELECT COUNT(SURVEY_NAME) AS COUNT FROM SURVEY WHERE SURVEY_NAME='"+req.body.survey_name+"'";
	con.query(q,function(error,results){
		if(results[0].COUNT > 0)
		{
			res.render("complete",{data:'Survey: '+req.body.survey_name+' already exists. Please provide unique Survey Name.'});
		}
		else
		{
			var survey = {survey_name:req.body.survey_name,response_type:req.body.responseType};
			var q="INSERT INTO SURVEY SET ?"
			con.query(q,survey,function(error,results){
				if(error) throw error;
				console.log('SURVEY insert completed!')
			});
			var q="SELECT SID FROM SURVEY WHERE SURVEY_NAME='"+req.body.survey_name+"'";
			con.query(q,survey,function(error,results){
				if(error) throw error;
				//console.log('SURVEY ID: '+results[0].SID);
				var p ="INSERT INTO SURVEY_QUESTIONS(SID,QNO,QUESTION) VALUES "
						+"("+results[0].SID+",'Q1','"+req.body.question1+"'),"
						+"("+results[0].SID+",'Q2','"+req.body.question2+"'),"
						+"("+results[0].SID+",'Q3','"+req.body.question3+"'),"
						+"("+results[0].SID+",'Q4','"+req.body.question4+"'),"
						+"("+results[0].SID+",'Q5','"+req.body.question5+"')";
				//console.log(p);
				con.query(p,function(error,results){
					if(error) throw error;
					console.log('Questions Insert Completed!');
					res.render("complete",{data: 'Survey: '+req.body.survey_name+' created successfully!'});
				});
			});
		}
	});
});


app.post("/selectSurvey", function(req,res){
	var survey_names ="SELECT SURVEY_NAME FROM SURVEY";
	con.query(survey_names,function(error,results){
		if(error) throw error;
		res.render("selectSurvey",{data:results});		
	});
});


app.post("/takeSurvey", function(req,res){
	//console.log(req.body.surveyName);
	var q ="SELECT S.SURVEY_NAME,S.SID, Q.QUESTION"
			+",R.RESPONSE1"
			+",R.RESPONSE2"
			+",R.RESPONSE3"
			+",R.RESPONSE4"
			+",R.RESPONSE5"
			+" FROM SURVEY_QUESTIONS Q"
			+" INNER JOIN SURVEY S"
			+" ON S.SID=Q.SID"
			+" INNER JOIN RESPONSE_TYPE R"
			+" ON R.RESPONSE_TYPE=S.RESPONSE_TYPE"
			+" WHERE S.SURVEY_NAME='"+req.body.surveyName+"'";
	con.query(q,function(error,results){
		if(error) throw error;
		res.render("takeSurvey",{data:results});		
	});
});


app.post("/submitResponse", function(req,res){
	var q="SELECT COUNT(*) AS COUNT FROM USER_RESPONSES WHERE SID="+req.body.sid+" AND NAME='"+req.body.name+"'";
	con.query(q,function(error,results){
		if(results[0].COUNT > 0)
		{
			res.render("complete",{data:req.body.name+' has already responded to the Survey!'});
		}
		else
		{
			var result=[];
			for(var i in req.body)
			{
				result.push([i,req.body[i]])
			}
			var q = "INSERT INTO USER_RESPONSES(SID,NAME,RESPONSE1,RESPONSE2,RESPONSE3,RESPONSE4,RESPONSE5) "
					+"VALUES("+req.body.sid+",'"+req.body.name
					+"','"+result[2][1]+"',"
					+"'"+result[3][1]+"',"
					+"'"+result[4][1]+"',"
					+"'"+result[5][1]+"',"
					+"'"+result[6][1]+"'"
					+")";
			con.query(q,function(error,results){
				if(error) throw error;
				console.log("Insert Response completed!");
			});
			res.render("complete",{data:'Response submitted successfully!'});
		}
	});
});


app.post("/deleteUserResponse", function(req,res){
	res.render("deleteResponseName");
});


app.post("/selectUserSurvey", function(req,res){
	var survey_names ="SELECT DISTINCT S.SURVEY_NAME FROM USER_RESPONSES R "
						+"INNER JOIN SURVEY S "
						+"ON R.SID=S.SID WHERE "
						+"R.NAME='"+req.body.name+"'";
	con.query(survey_names,function(error,results){
		if(error) throw error;
		//console.log(results.length);
		if(results.length==0)
		{
			res.redirect("home");
		}
		else
		{
			res.render("deleteSurveyRespose",{data:results});
		}
	});
});


app.post("/deleteSurveyRespose", function(req,res){
	if(req.body.surveyName == null)
	{
		res.render("deleteResponseName");
	}
	else
	{
		var q="";
		if(String(req.body.surveyName).includes(","))
		{
			var survey_names="'";
			for(i in req.body.surveyName)
			{
				survey_names=survey_names+req.body.surveyName[i]+"','"
			}
			survey_names = survey_names.substring(0, survey_names.length - 2);
			//console.log("survey_names:"+survey_names);
			q="DELETE FROM USER_RESPONSES "
					+"WHERE SID IN (SELECT DISTINCT SID FROM SURVEY S "
					+"WHERE SURVEY_NAME IN ("+survey_names+"))";	
		}
		else
		{
			q="DELETE FROM USER_RESPONSES "
				+"WHERE SID IN (SELECT DISTINCT SID FROM SURVEY S "
				+"WHERE SURVEY_NAME IN ('"+req.body.surveyName+"'))";
		}
		con.query(q,function(error,results){
			if(error) throw error;
			console.log("Delete Responses Completed!");
			res.render("complete",{data:'Response deleted successfully!'});
		});	
	}
});


app.post("/deleteSurvey", function(req,res){
	var survey_names ="SELECT SURVEY_NAME FROM SURVEY";
	con.query(survey_names,function(error,results){
		if(error) throw error;
		if(results.length==0)
		{
			res.redirect("home");
		}
		else
		{
			res.render("deleteSurvey",{data:results});
		}
				
	});
});


app.post("/deleteSurveyQuestions", function(req,res){
	if(req.body.surveyName == null)
	{
		res.render("home");
	}
	else
	{
		var q="";
		if(String(req.body.surveyName).includes(","))
		{
			var survey_names="'";
			for(i in req.body.surveyName)
			{
				survey_names=survey_names+req.body.surveyName[i]+"','"
			}
			survey_names = survey_names.substring(0, survey_names.length - 2);
			//console.log("survey_names:"+survey_names);
			q="DELETE FROM SURVEY "
				+"WHERE SURVEY_NAME IN ("+survey_names+")";	
		}
		else
		{
			q="DELETE FROM SURVEY "
				+"WHERE SURVEY_NAME IN ('"+req.body.surveyName+"')";
		}
		con.query(q,function(error,results){
			if(error) throw error;
			console.log("Delete Survey Completed!");
			res.render("complete",{data:'Survey deleted successfully!'});
		});	
	}
});


app.post("/updateSurvey", function(req,res){
	var q="SELECT SURVEY_NAME FROM SURVEY";
	con.query(q,function(error,results){
		if(error) throw error;
		res.render("updateSurvey",{data:results});
	});
});


app.post("/editSurveyQuestions", function(req,res){
	var q="SELECT CONCAT('question',@a:=@a+1) Q_NO, CONCAT('QID',@a) ID, A.QID, A.QNO, A.QUESTION, A.SURVEY_NAME, A.SID "
			+"FROM (SELECT S.SID, S.SURVEY_NAME, Q.QID, Q.QNO, Q.QUESTION FROM SURVEY_QUESTIONS Q "
			+"INNER JOIN SURVEY S "
			+"ON S.SID=Q.SID "
			+"WHERE S.SURVEY_NAME='"+req.body.surveyName+"') A,"
			+"(SELECT @a:= 0) AS a";
	con.query(q,function(error,results){
		if(error) throw error;
		res.render("editSurveyQuestions",{data:results});
	});
});


app.post("/updateQuestions", function(req,res){
	var q="UPDATE SURVEY_QUESTIONS "
			+"SET QUESTION='"+req.body.question1+"' "
			+"WHERE QID="+req.body.QID1;
		q=q+"; UPDATE SURVEY_QUESTIONS "
			+"SET QUESTION='"+req.body.question2+"' "
			+"WHERE QID="+req.body.QID2;
		q=q+"; UPDATE SURVEY_QUESTIONS "
			+"SET QUESTION='"+req.body.question3+"' "
			+"WHERE QID="+req.body.QID3;
		q=q+"; UPDATE SURVEY_QUESTIONS "
			+"SET QUESTION='"+req.body.question4+"' "
			+"WHERE QID="+req.body.QID4;
		q=q+"; UPDATE SURVEY_QUESTIONS "
			+"SET QUESTION='"+req.body.question5+"' "
			+"WHERE QID="+req.body.QID5;
		q=q+"; UPDATE SURVEY "
			+"SET SURVEY_NAME='"+req.body.survey_name+"' "
			+"WHERE SID="+req.body.sid;
	con.query(q,function(error,results){
		if(error) throw error;
		console.log("Survey Updated!");
		res.render("complete",{data:'Survey updated successfully!'});
	});
});


app.post("/showAllSurveys", function(req,res){
	var q="SELECT * FROM SHOW_ALL_SURVEYS";
	con.query(q,function(error, results){
		res.render("showAllSurveys",{data:results});
	});
});


app.post("/showAllResponses", function(req,res){
	var q="SELECT * FROM SHOW_ALL_RESPONSES";
	con.query(q,function(error,results){
		if(error) throw error;
		res.render("showAllResponses",{data:results});
	});
});


app.post("/searchSurveys", function(req,res){
		res.render("searchSurveys");
});


app.post("/searchSurveyResult", function(req,res){
	var q="SELECT * FROM SHOW_ALL_SURVEYS WHERE SURVEY_NAME='"+req.body.surveyName+"'";
	con.query(q,function(error, results){
		res.render("searchSurveyResult",{data:results});
	});
});


app.post("/searchResponses", function(req,res){
		res.render("searchResponses");
});


app.post("/searchResponseResult", function(req,res){
	var q="";
	if(req.body.surveyName.trim() == "")
	{
		q="SELECT * FROM SHOW_ALL_RESPONSES "
			+"WHERE NAME='"+req.body.userName+"'";
	}
	else if(req.body.userName.trim() == "")
	{
		q="SELECT * FROM SHOW_ALL_RESPONSES "
			+"WHERE SURVEY_NAME='"+req.body.surveyName+"'";
	}
	else
	{
		q="SELECT * FROM SHOW_ALL_RESPONSES "
			+"WHERE SURVEY_NAME='"+req.body.surveyName+"' AND "
			+"NAME='"+req.body.userName+"'";
	}
	con.query(q,function(error,results){
		if(error) throw error;
		res.render("searchResponseResult",{data:results});
	});
});

app.post("/viewReport", function(req,res){
	var survey_names ="SELECT DISTINCT S.SURVEY_NAME FROM SURVEY S "
						+"INNER JOIN USER_RESPONSES U "
						+"ON U.SID=S.SID";
	con.query(survey_names,function(error,results){
		if(error) throw error;
		res.render("selectSurveyReport",{data:results});		
	});
});

app.post("/viewSurveyReport", function(req,res){
	var q="SELECT S.SURVEY_NAME,Q.QUESTION,R.RATING "
			+"FROM SURVEY S "
			+"INNER JOIN RATING R ON S.SID=R.SID "
			+"INNER JOIN SURVEY_QUESTIONS Q ON Q.QNO=R.QNO AND Q.SID=S.SID "
			+"WHERE S.SURVEY_NAME='"+req.body.surveyName+"' ORDER BY R.QNO";
	con.query(q,function(error, results){
		res.render("viewSurveyReport",{data:results});
	});
});