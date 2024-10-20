from flask import Flask,jsonify,request
from config import Config
from pymongo import MongoClient
from bson import ObjectId
from models import Node
import utils
from flask_cors import CORS

app=Flask(__name__)
# app.config.from_object(Config)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for API routes
# app.config['CORS_HEADERS'] = 'Content-Type'


mongo=MongoClient(Config.MONGO_DATABASE_URI)
db=mongo['rule_engine']
rules=db['rules']

@app.route("/")
def get_home():
    return jsonify({"data":"HI"}),200

@app.route("/api/rules/create_rule",methods=['POST'])
def create_rule():
    rule_string=request.json.get("rule")
    if not rule_string:
        return jsonify({"error":"Rule String not found"}),400
    try:
        rule_ast=utils.create_rule(rule_string)
        rule_id=rules.insert_one({"rule_ast": rule_ast, "rule_string": rule_string})
        # rule_id=rules.insert_one(rule_ast)
        return jsonify({"message":"Rule created successfully","data":str(rule_id)}),200
    except Exception as e:
        return jsonify({"error",str(e)}),500

@app.route("/api/rules/evaluate_rule",methods=['POST'])
def evaluate_rule():
    rule_id=request.args.get("rule_id")
    data=request.json.get("data")
    if not rule_id or not data:
        return jsonify({"error": "rule_id and data are required"}), 400
    rule_ast=rules.find_one({"_id":ObjectId(rule_id)})
    # print(rule_ast)
    if not rule_ast:
        return jsonify({"error": "Rule not found"}), 404 

    try:
        rule_ast=Node.from_dict(rule_ast['rule_ast'])
        result = utils.evaluate_rule(rule_ast, data)
        return jsonify({"result": result}), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route("/api/rules/combine_rules",methods=['POST'])
def combine_rules():
    data=request.json.get("data")
    if not data:
        return jsonify({"error":"data is required"}),400
    try:
        print(data)
        combined_rule_string=utils.combine_rules(data)
        rule_id=rules.insert_one({"rule_ast":combined_rule_string,"rule_string":data})
        return jsonify({"message":"Combined the rules","data":str(combined_rule_string),"rule_id":str(rule_id)}),200
    except Exception as e:
        return jsonify({"error",str(e)}),500

@app.route("/api/rules", methods=['GET'])
def get_all_rules():
    try:
        rules_all = list(rules.find()) 
        # print(rules_all)
        rules_dict=[]
        for rule in rules_all:
            if "_id" in rule:
                rule["_id"] = str(rule["_id"]) 
            rules_dict.append(rule)
        return jsonify({"rules": rules_dict}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/rules/update_rule", methods=['PUT'])
def update_rule():
    # Parse the new rule string from request body
    rule_id=request.args.get('rule_id')
    new_rule_string = request.json.get("rule")
    if not new_rule_string:
        return jsonify({"error": "New rule string not found"}), 400

    try:
        new_rule_ast = utils.create_rule(new_rule_string)

        result = rules.update_one(
            {"_id": ObjectId(rule_id)},  
            {"$set": {"rule_ast": new_rule_ast, "rule_string": new_rule_string}}
        )
        print(result)
        if result.matched_count == 0:
            return jsonify({"error": "Rule not found with the provided rule_id"}), 404

        return jsonify({"message": "Rule updated successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__=='__main__':
    app.run(debug=True)

